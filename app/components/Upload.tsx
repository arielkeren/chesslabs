import { boardToFen } from "../utils";

type Props = {
  toggleModal: () => void;
  changePosition: (newPosition: string) => void;
};

const Upload: React.FC<Props> = ({ toggleModal, changePosition }) => {
  const sendFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) return;

    const response = await fetch("http://127.0.0.1:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: event.target.files[0],
    });

    const data = await response.json();
    const fen = boardToFen(data.board, "w");

    toggleModal();
    changePosition(fen);
  };

  return (
    <>
      <label
        htmlFor="board-image"
        className="bg-blue-600 text-white p-2 rounded cursor-pointer transition-colors hover:bg-blue-700"
      >
        Select Image
      </label>
      <input
        id="board-image"
        type="file"
        onChange={sendFile}
        className="hidden"
      />
    </>
  );
};

export default Upload;
