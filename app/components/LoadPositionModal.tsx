import { IoClose } from "react-icons/io5";
import Upload from "./Upload";
import { useState } from "react";
import { validateFen } from "chess.js";

type Props = {
  toggleModal: () => void;
  changePosition: (newPosition: string) => void;
};

const LoadPositionModal: React.FC<Props> = ({
  toggleModal,
  changePosition,
}) => {
  const [fen, setFen] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFen = event.target.value;
    setFen(newFen);

    if (validateFen(newFen).ok) {
      toggleModal();
      changePosition(newFen);
    }
  };

  return (
    <div className="fixed h-screen w-screen flex justify-center items-center backdrop-brightness-75">
      <div className="relative bg-gray-900 rounded p-16">
        <button onClick={toggleModal} className="absolute top-2 right-2">
          <IoClose className="text-3xl text-gray-300" />
        </button>
        <h1 className="absolute top-3 right-1/2 translate-x-1/2 text-white font-medium uppercase">
          Load Position
        </h1>
        <form className="flex flex-col gap-3 items-center">
          <label htmlFor="fen" className="text-white">
            Type FEN
          </label>
          <input
            value={fen}
            onChange={onChange}
            id="fen"
            className="bg-gray-900 p-2 border-2 border-gray-700 rounded outline-none text-white"
          />
          <p className="text-white uppercase">Or</p>
          <Upload toggleModal={toggleModal} changePosition={changePosition} />
        </form>
      </div>
    </div>
  );
};

export default LoadPositionModal;
