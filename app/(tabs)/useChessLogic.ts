import { useState } from 'react';
import { Chess, Square, Move } from 'chess.js';

export const useChessLogic = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [promotionModalVisible, setPromotionModalVisible] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
  const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);
  const [colorSelectionVisible, setColorSelectionVisible] = useState(true);

  const handleSquarePress = (square: Square) => {
    const piece = game.get(square);

    if (promotionModalVisible || colorSelectionVisible) return;

    if (selectedSquare) {
      const validMove = game.moves({ square: selectedSquare, verbose: true }).some((move: Move) => move.to === square);
      if (validMove) {
        const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
        if (move) {
          if (move.flags.includes('p')) {
            game.undo();
            setPendingPromotion({ from: selectedSquare, to: square });
            setPromotionModalVisible(true);
          } else {
            setGame(new Chess(game.fen()));
          }
        }
      }
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setPossibleMoves(moves);
    }
  };

  const handlePromotion = (promotion: string) => {
    if (pendingPromotion) {
      game.move({ from: pendingPromotion.from, to: pendingPromotion.to, promotion });
      setGame(new Chess(game.fen()));
      setPendingPromotion(null);
      setPromotionModalVisible(false);
    }
  };

  const handleColorSelection = (color: 'w' | 'b') => {
    setPlayerColor(color);
    setColorSelectionVisible(false);
    setGame(new Chess());
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
  };
};
