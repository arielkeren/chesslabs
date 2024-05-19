import { useEffect, useState } from "react";
import { EngineResponse } from "../types";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Chess } from "chess.js";

type Props = {
  position: string;
  isFlipped: boolean;
};

const Evaluation: React.FC<Props> = ({ position, isFlipped }) => {
  const [evaluation, setEvaluation] = useState(0);
  const [mate, setMate] = useState(0);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (position == new Chess().fen()) {
        setEvaluation(0);
        setMate(0);
        return;
      }

      const response = await fetch(
        `https://stockfish.online/api/s/v2.php?fen=${position}&depth=15`
      );

      if (!response.ok) {
        return;
      }

      let data: EngineResponse | null = null;
      try {
        data = (await response.json()) as EngineResponse;
      } catch {
        return;
      }

      if ("evaluation" in data && typeof data.evaluation == "number")
        setEvaluation(data.evaluation);

      if ("mate" in data && (typeof data.mate == "number" || data.mate == null))
        setMate(data.mate ? data.mate : 0);
    };

    fetchEvaluation();
  }, [position]);

  const scaleAdvantage = () => {
    if (mate) {
      return Math.min(height, width) * 0.7;
    }

    return (
      ((Math.min(height, width) * 0.7) / 2) *
      Math.log10(Math.abs(evaluation) + 10)
    );
  };

  const scaleDisadvantage = () => {
    return Math.min(height, width) * 0.7 - scaleAdvantage();
  };

  const isBlackWinning = () => {
    return mate < 0 || (mate == 0 && evaluation < 0);
  };

  const isWhiteWinning = () => {
    return !isBlackWinning();
  };

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
          {mate == 0 ? evaluation.toFixed(2) : `M${Math.abs(mate)}`}
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
        {mate == 0 ? evaluation.toFixed(2) : `M${Math.abs(mate)}`}
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
