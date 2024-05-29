// app/ChessGame.tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import  Chessboard  from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessGame: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // всегда превращаем пешку в ферзя
    });

    if (move === null) return false; // Недопустимый ход

    setGame(newGame);
    setFen(newGame.fen());
    return true;
  };

  return (
    <View style={styles.container}>
      <Chessboard position={fen} onPieceDrop={onDrop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ChessGame;
