# ChessLabs

A modern, feature-rich chess application built with Next.js, TypeScript, React, and Python. ChessLabs provides an interactive chess environment with multiple game modes, position analysis, AI-powered gameplay, and intelligent chess board image recognition.

![ChessLabs](https://github.com/user-attachments/assets/57ea5d69-dd40-4b92-839f-3351846926c3)

## 🚀 Features

### 🎮 Multiple Game Modes

- **Play Mode**: Standard chess gameplay with move validation and game rules enforcement
- **Engine Mode**: Play against Stockfish AI with configurable difficulty
- **Edit Mode**: Create and modify chess positions freely

### 🤖 AI Integration

- **Stockfish Integration**: Powered by Stockfish.online API for strong chess engine moves
- **Position Evaluation**: Real-time position analysis with numerical evaluation
- **Mate Detection**: Identifies forced checkmate sequences
- **Configurable Depth**: Engine analysis depth of 15 moves for strong play

### 📊 Position Analysis

- **Live Evaluation Bar**: Visual representation of position advantage
- **Numerical Evaluation**: Precise evaluation scores (e.g., +1.25, -0.8)
- **Mate Indicators**: Shows mate-in-X when forced sequences are detected
- **Flip-friendly Display**: Evaluation adapts to board orientation

### 🎯 Position Management

- **FEN Import/Export**: Load positions using standard FEN notation
- **Image Upload**: Upload chess board images for position recognition (powered by Python backend)
- **Position History**: Undo moves with full history tracking
- **Reset to Start**: Quick return to initial position
- **Restore Positions**: Return to previously uploaded positions

### 🎨 User Interface

- **Responsive Design**: Adapts to different screen sizes
- **Board Flipping**: View from white or black perspective
- **Smooth Animations**: Piece movement animations (disabled in edit mode)
- **Modern UI**: Clean, dark theme with intuitive controls
- **Promotion Dialog**: Vertical promotion piece selection

### ⚙️ Technical Features

- **Move Validation**: Legal move checking with chess.js
- **Game State Detection**: Automatic detection of checkmate, stalemate, and draws
- **React Query Integration**: Efficient API caching and background updates
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Chess Logic**: chess.js
- **Chess Board**: react-chessboard
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Chess Engine**: Stockfish.online API

### Backend

- **Framework**: FastAPI
- **Language**: Python
- **Image Processing**: PIL (Pillow), scikit-image
- **Machine Learning**: TensorFlow Keras, NumPy, scikit-learn (joblib)
- **Neural Networks**: Two custom CNN models for chess piece recognition
- **Server**: Uvicorn

## 📁 Project Structure

```
chesslabs/
├── README.md
├── frontend/                    # Next.js React application
│   ├── app/
│   │   ├── components/         # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # App layout
│   │   ├── page.tsx          # Main page
│   │   ├── types.ts          # TypeScript types
│   │   └── utils.ts          # Utility functions
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── backend/                    # Python FastAPI server
    ├── main.py               # FastAPI application
    ├── piece.pkl            # ML model for piece recognition
    └── color.pkl            # ML model for color detection
```

## 📦 Installation

### Prerequisites

- Node.js (for frontend)
- Python 3.8+ (for backend)

### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   git clone https://github.com/arielkeren/chesslabs.git
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to the backend directory**

   ```bash
   git clone https://github.com/arielkeren/chesslabs.git
   cd backend
   ```

2. **Create a virtual environment (recommended)**

   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   ```

3. **Install Python dependencies**

   ```bash
   pip install fastapi uvicorn pillow scikit-image scikit-learn numpy joblib tensorflow
   ```

4. **Run the backend server**

   ```bash
   python main.py
   ```

### Access the Application

- **Frontend**: Navigate to `http://localhost:3000`
- **Backend API**: Available at `http://localhost:8000`

## 🎯 Usage Guide

### Basic Gameplay

1. **Play Mode**: Make moves by dragging pieces - the app validates all moves
2. **Engine Mode**: Play against the AI - the engine will respond automatically
3. **Edit Mode**: Create custom positions by dragging pieces freely

### Loading Positions

1. Click the upload button (📤) in the controls
2. **Option 1**: Type or paste a FEN string
3. **Option 2**: Upload a chess board image (requires Python backend to be running)

### Game Controls

- **🔄 Reset**: Return to starting position
- **🔄 Flip**: Change board orientation
- **↶ Undo**: Take back the last move
- **♔ Restore**: Return to last uploaded position
- **🖥️ Engine**: Switch to AI mode
- **▶️ Play**: Switch to standard play mode
- **✏️ Edit**: Switch to position editing mode

### Position Analysis

- The evaluation bar shows who's winning (white/black)
- Positive numbers favor white, negative favor black
- "M5" indicates mate in 5 moves
- The bar height represents the evaluation magnitude

## 🔧 Configuration

### Engine Settings

The app uses Stockfish.online with a depth of 15. To modify:

```typescript
// In frontend/app/components/App.tsx, change the depth parameter
const response = await fetch(
  `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=15`
);
```

### Board Appearance

Customize the board in the `Chessboard` component:

```typescript
<Chessboard
  boardWidth={Math.min(height, width) * 0.7}
  customBoardStyle={{ borderRadius: "4px" }}
  animationDuration={state === "edit" ? 0 : 300}
/>
```

## 🖼️ Image Upload Feature

The image upload feature uses a Python backend with machine learning models for chess position recognition:

### How it works:

1. **Image Processing**: The Python backend processes uploaded chess board images using PIL and scikit-image
2. **CNN Architecture**: Two separate Convolutional Neural Networks built with TensorFlow Keras:
   - **Piece Recognition CNN**: Identifies the type of chess piece (king, queen, rook, bishop, knight, pawn)
   - **Color Recognition CNN**: Determines the color of each piece (white or black)
3. **Position Recognition**: The backend converts the image to a board representation and returns it as FEN
4. **Frontend Integration**: The Next.js frontend sends images to the backend and loads the recognized positions

### Backend Features:

- **FastAPI Server**: RESTful API for image processing
- **CORS Support**: Enables cross-origin requests from the frontend
- **Image Analysis**: Grayscale conversion, compression, and square-by-square piece recognition
- **Deep Learning Models**: Two custom CNN networks built with TensorFlow Keras:
  - `piece.pkl`: Trained to classify chess piece types (6 classes: king, queen, rook, bishop, knight, pawn)
  - `color.pkl`: Trained to classify piece colors (2 classes: white, black)
- **Board Parsing**: Converts 8x8 board array to standard chess notation

### Usage:

1. **Ensure the Python backend is running** (port 8000)
2. **Upload a chess board image** through the frontend modal
3. **The backend processes the image** and returns the position as FEN
4. **The frontend loads the recognized position** onto the board

### Backend API Endpoint:

- **URL**: `POST http://127.0.0.1:8000/`
- **Input**: Image file as binary data
- **Output**: JSON response with board position array
