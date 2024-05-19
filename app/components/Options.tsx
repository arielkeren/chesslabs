import { State } from "../types";
import { GrRefresh } from "react-icons/gr";
import { HiSwitchVertical } from "react-icons/hi";
import { LiaUndoSolid } from "react-icons/lia";
import { BiSolidChess } from "react-icons/bi";
import { PiUploadSimpleBold, PiCpuFill } from "react-icons/pi";
import { FaPlay } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import useModal from "../hooks/useModal";
import LoadPositionModal from "./LoadPositionModal";

type Props = {
  state: State;
  isUndoDisabled: boolean;
  isPositionValid: boolean;
  changePosition: (newPosition: string) => void;
  reset: () => void;
  flip: () => void;
  undo: () => void;
  restoreUploadedPosition: () => void;
  switchToEngine: () => void;
  switchToPlay: () => void;
  switchToEdit: () => void;
};

const Options: React.FC<Props> = ({
  state,
  isUndoDisabled,
  isPositionValid,
  changePosition,
  reset,
  flip,
  undo,
  restoreUploadedPosition,
  switchToEngine,
  switchToPlay,
  switchToEdit,
}) => {
  const { isModalShown, toggleModal } = useModal();

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={reset}
          className="bg-gray-900 rounded p-2 transition-colors hover:bg-gray-800"
        >
          <GrRefresh className="text-gray-400 text-3xl" />
        </button>
        <button
          onClick={flip}
          className="bg-gray-900 rounded p-2 transition-colors hover:bg-gray-800"
        >
          <HiSwitchVertical className="text-gray-400 text-3xl" />
        </button>
        <button
          onClick={undo}
          disabled={isUndoDisabled}
          className={`bg-gray-900 rounded p-2 transition-colors ${
            isUndoDisabled ? "opacity-50" : "hover-bg-gray-800"
          }`}
        >
          <LiaUndoSolid className="text-gray-400 text-3xl" />
        </button>
        <button
          onClick={restoreUploadedPosition}
          className="bg-gray-900 rounded p-2 transition-colors hover:bg-gray-800"
        >
          <BiSolidChess className="text-gray-400 text-3xl" />
        </button>
        <button
          onClick={toggleModal}
          className="bg-gray-900 rounded p-2 transition-colors hover:bg-gray-800"
        >
          <PiUploadSimpleBold className="text-gray-400 text-3xl" />
        </button>
        <button
          onClick={switchToEngine}
          disabled={state === "engine" || !isPositionValid}
          className={`mt-auto rounded p-2 transition-colors ${
            state === "engine"
              ? "bg-purple-600"
              : !isPositionValid
              ? "bg-red-600"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          <PiCpuFill
            className={`text-3xl ${
              state === "engine" || !isPositionValid
                ? "text-white"
                : "text-gray-400"
            }`}
          />
        </button>
        <button
          onClick={switchToPlay}
          disabled={state === "play" || !isPositionValid}
          className={`rounded p-2 transition-colors ${
            state === "play"
              ? "bg-blue-600"
              : !isPositionValid
              ? "bg-red-600"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          <FaPlay
            className={`text-3xl ${
              state === "play" || !isPositionValid
                ? "text-white"
                : "text-gray-400"
            }`}
          />
        </button>
        <button
          onClick={switchToEdit}
          disabled={state === "edit"}
          className={`rounded p-2 transition-colors ${
            state === "edit" ? "bg-amber-600" : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          <MdEdit
            className={`text-3xl ${
              state === "edit" ? "text-white" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {isModalShown && (
        <LoadPositionModal
          toggleModal={toggleModal}
          changePosition={changePosition}
        />
      )}
    </>
  );
};

export default Options;
