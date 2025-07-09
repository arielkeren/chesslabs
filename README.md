# ChessLabs

A modern, feature-rich chess application built with Next.js, TypeScript, and React. ChessLabs provides an interactive chess environment with multiple game modes, position analysis, and AI-powered gameplay.

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
- **Image Upload**: Upload chess board images for position recognition (requires local server)
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

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Chess Logic**: chess.js
- **Chess Board**: react-chessboard
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Chess Engine**: Stockfish.online API

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chess
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   <br>Navigate to `http://localhost:3000`

## 🎯 Usage Guide

### Basic Gameplay

1. **Play Mode**: Make moves by dragging pieces - the app validates all moves
2. **Engine Mode**: Play against the AI - the engine will respond automatically
3. **Edit Mode**: Create custom positions by dragging pieces freely

### Loading Positions

1. Click the upload button (📤) in the controls
2. **Option 1**: Type or paste a FEN string
3. **Option 2**: Upload a chess board image (requires local image processing server)

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
// In App.tsx, change the depth parameter
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

The image upload feature requires a local server for chess position recognition:

1. **Start the image processing server** (port 8000)
2. **Upload a chess board image** through the modal
3. **The app converts the image to FEN** and loads the position

Expected server endpoint: `POST http://127.0.0.1:8000/`
