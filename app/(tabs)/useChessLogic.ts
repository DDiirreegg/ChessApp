import { useState } from 'react';
import { Chess, Square, Move as ChessMove } from 'chess.js';

export const useChessLogic = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<ChessMove[]>([]);
  const [promotionModalVisible, setPromotionModalVisible] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
  const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);
  const [colorSelectionVisible, setColorSelectionVisible] = useState(true);
  const [checkmate, setCheckmate] = useState(false);
  const [stalemate, setStalemate] = useState(false);
  const [winner, setWinner] = useState<'w' | 'b' | null>(null);

  const handleSquarePress = (square: Square) => {
    if (promotionModalVisible || colorSelectionVisible || checkmate || stalemate) return;

    if (selectedSquare) {
      const moves = game.moves({ square: selectedSquare, verbose: true }) as ChessMove[];
      const validMove = moves.find((move) => move.to === square);

      if (validMove) {
        const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setSelectedSquare(null);
          setPossibleMoves([]);
          checkGameOver();
        } else {
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      } else {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true }) as ChessMove[];
        setPossibleMoves(moves);
        if (moves.length === 0) {
          setSelectedSquare(null); // Сбрасываем выбор, если нет допустимых ходов
        }
      } else {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    }
  };

  const handlePromotion = (promotion: string) => {
    if (pendingPromotion) {
      game.move({ from: pendingPromotion.from, to: pendingPromotion.to, promotion });
      setGame(new Chess(game.fen()));
      setPendingPromotion(null);
      setPromotionModalVisible(false);
      checkGameOver();
    }
  };

  const handleColorSelection = (color: 'w' | 'b') => {
    setPlayerColor(color);
    setColorSelectionVisible(false);
    setGame(new Chess());
  };

  const startNewGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setPossibleMoves([]);
    setPromotionModalVisible(false);
    setPendingPromotion(null);
    setPlayerColor(null);
    setColorSelectionVisible(true);
    setCheckmate(false);
    setStalemate(false);
    setWinner(null);
  };

  const checkGameOver = () => {
    console.log('Checking for game over...');
    if (game.isCheckmate()) {
      setCheckmate(true);
      setWinner(game.turn() === 'w' ? 'b' : 'w');
      console.log('Checkmate detected. Winner:', game.turn() === 'w' ? 'Black' : 'White');
    } else if (game.isStalemate()) {
      setStalemate(true);
      setWinner(null);
      console.log('Stalemate detected. The game is a draw.');
    }
  };

  return {
    game,
    selectedSquare,
    possibleMoves,
    promotionModalVisible,
    colorSelectionVisible,
    playerColor,
    handleSquarePress,
    handlePromotion,
    handleColorSelection,
    setSelectedSquare,
    setPossibleMoves,
    checkmate,
    stalemate,
    winner,
    startNewGame,
    checkGameOver,
  };
};
