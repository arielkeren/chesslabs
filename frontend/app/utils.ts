import { Color, Square } from "chess.js";

const fenToBoard = (fen: string) => {
  const rows = fen.split("/");
  const board = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];

  for (let i = 0; i < rows.length; i++) {
    let insertIndex = 0;

    for (const char of rows[i]) {
      if (char === " ") break;

      if (!isNaN(parseInt(char))) insertIndex += Number(char);
      else board[i][insertIndex++] = char;
    }
  }

  return board;
};

export const boardToFen = (board: string[][], turn: Color) => {
  let fen = "";
  board.forEach(row => {
    let emptyCount = 0;

    row.forEach(square => {
      if (square == "") emptyCount++;
      else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += square;
      }
    });

    if (emptyCount > 0) fen += emptyCount;

    fen += "/";
  });

  return `${fen.substring(0, fen.length - 1)} ${turn} KQkq - 0 1`;
};

export const replaceSquare = (
  fen: string,
  square: Square,
  replacement: string
) => {
  const board = fenToBoard(fen);
  board[8 - Number(square[1])][square.charCodeAt(0) - "a".charCodeAt(0)] =
    replacement;
  const newFen = boardToFen(board, fen[fen.indexOf(" ") + 1] as Color);

  return newFen;
};

export const move = (fen: string, from: Square, to: Square) => {
  const board = fenToBoard(fen);
  const piece =
    board[8 - Number(from[1])][from.charCodeAt(0) - "a".charCodeAt(0)];

  const fenAfterMove = replaceSquare(fen, to, piece);
  const fenAfterRemove = replaceSquare(fenAfterMove, from, "");

  return fenAfterRemove;
};
