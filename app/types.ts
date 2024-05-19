export type Move =
  | string
  | {
      from: string;
      to: string;
      promotion?: string | undefined;
    };

export type EngineResponse = {
  success: boolean;
  evaluation: number;
  mate: number;
  bestmove: string;
  continuation: string;
};

export type State = "edit" | "play" | "engine";
