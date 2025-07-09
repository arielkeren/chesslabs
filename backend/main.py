from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
from io import BytesIO
import joblib
from skimage.transform import resize
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def root(request: Request):
    body = await request.body()
    board = get_board(body)
    return {"board": board}

def get_board(data: bytes) -> list[list[str]]:
    arr = file_to_arr(data)
    arr = grayscale_arr(arr)
    arr = compress_arr(arr)
    arr = resize(arr, (40 * 8, 40 * 8))
    arr = arr.reshape(arr.shape[0] // 40, 40, -1, 40).swapaxes(1, 2).reshape(-1, 40, 40)
    
    occupied = occupied_squares(arr)

    class_names = ["k", "q", "r", "b", "n", "p"]

    model = joblib.load("D:/projects/Python/ChessboardAPI/piece.pkl")
    predictions = model(arr)
    predictions = np.argmax(predictions, 1)
    board: list[str] = [class_names[prediction] for prediction in predictions]

    model = joblib.load("D:/projects/Python/ChessboardAPI/color.pkl")
    predictions = model(arr)
    predictions = np.argmax(predictions, 1)
    for i in range(len(predictions)):
        if predictions[i] == 0:
            board[i] = board[i].upper()
    
    remove_empty(board, occupied)

    board = np.array(board)
    board = np.split(board, 8)
    board = np.array(board)
    board = board.tolist()
    return board

def file_to_arr(data: bytes) -> np.ndarray:
    return np.array(Image.open(BytesIO(data)))

def grayscale_arr(arr: np.ndarray) -> np.ndarray:
    return np.dot(arr[...,:3], [0.2989, 0.5870, 0.1140])

def compress_arr(arr: np.ndarray) -> np.ndarray:
    return arr / 255

def occupied_squares(arr: np.ndarray) -> int:
    occupied = np.zeros(64, np.int8)

    for i in range(64):
        unique = len(np.unique(arr[i].flatten()))
        occupied[i] = 1 if unique > 250 else 0
    
    return occupied

def remove_empty(board: np.ndarray, occupied: np.ndarray):
    for i in range(64):
        if occupied[i] == 0:
            board[i] = ""

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
