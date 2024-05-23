import { EngineResponse } from "../types";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Chess } from "chess.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
  position: string;
  isFlipped: boolean;
};

const Evaluation: React.FC<Props> = ({ position, isFlipped }) => {
  const { height, width } = useWindowDimensions();

  const { data } = useQuery({
    queryKey: ["evaluation", position],
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (position === new Chess().fen()) return { evaluation: 0, mate: null };

      return fetch(
        `https://stockfish.online/api/s/v2.php?fen=${position}&depth=15`
      )
        .then(response => response.json())
        .then((data: EngineResponse) => ({
          evaluation: data.evaluation,
          mate: data.mate,
        }));
    },
  });

  const scaleAdvantage = () => {
    if (!data) return (Math.min(height, width) * 0.7) / 2;

    if (data.mate) return Math.min(height, width) * 0.7;

    return (
      ((Math.min(height, width) * 0.7) / 2) *
      Math.log10(Math.abs(data.evaluation) + 10)
    );
  };

  const scaleDisadvantage = () =>
    Math.min(height, width) * 0.7 - scaleAdvantage();

  const isBlackWinning = () =>
    !data || (data.mate && data.mate < 0) || data.evaluation < 0;

  const isWhiteWinning = () => !isBlackWinning();

  if (!data) return <></>;

  if (isFlipped)
    return (
      <div
        className="relative flex flex-col w-12"
        style={{ height: Math.min(height, width) * 0.7 }}
      >
        <p
          className={`absolute font-bold text-xs right-1/2 translate-x-1/2 ${
            isBlackWinning() ? "bottom-1 text-white" : "top-1 text-gray-800"
          }`}
        >
          {data.mate ? `M${Math.abs(data.mate)}` : data.evaluation.toFixed(2)}
        </p>
        <div
          className="bg-white rounded-t transition-all ease-out duration-1000"
          style={{
            height: isWhiteWinning() ? scaleAdvantage() : scaleDisadvantage(),
          }}
        ></div>
        <div
          className="bg-gray-800 rounded-b transition-all ease-out duration-1000"
          style={{
            height: isBlackWinning() ? scaleAdvantage() : scaleDisadvantage(),
          }}
        ></div>
      </div>
    );

  return (
    <div
      className="relative flex flex-col w-12"
      style={{ height: Math.min(height, width) * 0.7 }}
    >
      <p
        className={`absolute font-bold text-xs right-1/2 translate-x-1/2 ${
          isBlackWinning() ? "top-1 text-white" : "bottom-1 text-gray-800"
        }`}
      >
        {data.mate ? `M${Math.abs(data.mate)}` : data.evaluation.toFixed(2)}
      </p>
      <div
        className="bg-gray-800 rounded-t transition-all ease-out duration-1000"
        style={{
          height: isBlackWinning() ? scaleAdvantage() : scaleDisadvantage(),
        }}
      ></div>
      <div
        className="bg-white rounded-b transition-all ease-out duration-1000"
        style={{
          height: isWhiteWinning() ? scaleAdvantage() : scaleDisadvantage(),
        }}
      ></div>
    </div>
  );
};

export default Evaluation;
