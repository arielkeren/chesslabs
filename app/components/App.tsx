import { useState } from "react";
import { Chess, Square, validateFen } from "chess.js";
import { Chessboard } from "react-chessboard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { EngineResponse, Move, State } from "../types";
import Evaluation from "./Evaluation";
import Options from "./Options";
import { move, replaceSquare } from "../utils";
import Header from "./Header";

const App: React.FC = () => {
  const [position, setPosition] = useState(new Chess().fen());
  const [history, setHistory] = useState<string[]>([]);
  const [isPlayingWhite, setIsPlayingWhite] = useState(true);
  const [state, setState] = useState<State>("play");
  const [uploadedPosition, setUploadedPosition] = useState(new Chess().fen());
  const { height, width } = useWindowDimensions();

  const makeMove = (fen: string, move: Move) => {
    const game = new Chess(fen);

    try {
      game.move(move);
    } catch {
      return null;
    }

    setHistory([...history, fen]);
    setPosition(game.fen());
    return game.fen();
  };

  const makeEngineMove = async (fen: string) => {
    if (new Chess(fen).isGameOver()) return;

    try {
      const response = await fetch(
        `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=15`
      );

      if (!response.ok) return;

      const data = (await response.json()) as EngineResponse;
      const bestMove = data.bestmove.substring(9, 13);
      makeMove(fen, bestMove);
    } catch (error) {
      alert("Failed to fetch engine move. Please try again later.");
    }
  };

  const onPieceDropEdit = (sourceSquare: string, targetSquare: string) => {
    setPosition(move(position, sourceSquare as Square, targetSquare as Square));
    return true;
  };

  const onPieceDropPlay = (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) => {
    if (new Chess(position).isGameOver()) return null;

    const newPosition = makeMove(position, {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase(),
    });

    return newPosition;
  };

  const onPieceDropEngine = (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) => {
    if (
      (isPlayingWhite && piece[0] === "b") ||
      (!isPlayingWhite && piece[0] === "w")
    )
      return false;

    const newPosition = onPieceDropPlay(sourceSquare, targetSquare, piece);

    if (!newPosition) return false;

    makeEngineMove(newPosition);
    return true;
  };

  const onPieceDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) => {
    switch (state) {
      case "engine":
        return onPieceDropEngine(sourceSquare, targetSquare, piece);

      case "play":
        return !!onPieceDropPlay(sourceSquare, targetSquare, piece);

      default:
        return onPieceDropEdit(sourceSquare, targetSquare);
    }
  };

  const changePosition = (newPosition: string) => {
    setState("edit");
    setPosition(newPosition);
    setUploadedPosition(newPosition);
  };

  const onSquareRightClick = (square: Square) => {
    if (state !== "edit") return;

    setPosition(replaceSquare(position, square, ""));
  };

  const reset = () => {
    if (state === "engine") setState("play");
    setPosition(new Chess().fen());
  };

  const flip = () => {
    if (state === "engine") setState("play");
    setIsPlayingWhite(!isPlayingWhite);
  };

  const undo = () => {
    if (history.length === 0) return;
    if (state === "engine") setState("play");
    setPosition(history.pop()!);
    setHistory([...history]);
  };

  const restoreUploadedPosition = () => {
    if (state === "engine") setState("play");
    setPosition(uploadedPosition);
  };

  const switchToEngine = () => {
    if (!validateFen(position).ok) return;

    const game = new Chess(position);

    if (game.isGameOver()) return alert("The game is already over.");

    if (
      (isPlayingWhite && game.turn() === "b") ||
      (!isPlayingWhite && game.turn() === "w")
    )
      makeEngineMove(position);

    setState("engine");
  };

  const switchToPlay = () => setState("play");

  const switchToEdit = () => setState("edit");

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex gap-2">
        <Evaluation position={position} isFlipped={!isPlayingWhite} />
        <div style={{ width: Math.min(height, width) * 0.7 }}>
          <Chessboard
            position={position}
            onPieceDrop={onPieceDrop}
            boardOrientation={isPlayingWhite ? "white" : "black"}
            boardWidth={Math.min(height, width) * 0.7}
            customBoardStyle={{ borderRadius: "4px" }}
            promotionDialogVariant="vertical"
            onSquareRightClick={onSquareRightClick}
            animationDuration={state === "edit" ? 0 : 300}
          />
        </div>
        <Options
          state={state}
          isUndoDisabled={history.length === 0}
          isPositionValid={validateFen(position).ok}
          changePosition={changePosition}
          reset={reset}
          flip={flip}
          undo={undo}
          restoreUploadedPosition={restoreUploadedPosition}
          switchToEngine={switchToEngine}
          switchToPlay={switchToPlay}
          switchToEdit={switchToEdit}
        />
      </div>
    </div>
  );
};

export default App;
