import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, Modal, Button, FlatList, StyleSheet } from 'react-native';
import { Square } from 'chess.js';
import { useChessLogic } from './useChessLogic';
import pieceImages from './pieceImages';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ChessBoardStyles';

interface ChessBoardProps {
  onBack: () => void;
}

type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';

interface Move {
  from: Square;
  to: Square;
  pieceType: PieceType;
  pieceColor: 'w' | 'b';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ onBack }) => {
  const {
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
    checkGameOver, // Импортируем функцию checkGameOver
  } = useChessLogic();

  const [moves, setMoves] = useState<Move[]>([]);

  const handleMove = (from: Square, to: Square) => {
    if (!from || from === to) {
      handleSquarePress(to);
      return;
    }

    const move = game.move({ from, to, promotion: 'q' });

    if (move) {
      const pieceMove: Move = { 
        from, 
        to, 
        pieceType: move.piece as PieceType, 
        pieceColor: move.color as 'w' | 'b' 
      };
      setMoves([pieceMove, ...moves]); // Добавление нового хода в начало массива
      setSelectedSquare(null); // Сброс выбранного квадрата после успешного хода
      setPossibleMoves([]); // Очистка возможных ходов
      checkGameOver();
    } else {
      setSelectedSquare(null); // Сброс выбранного квадрата при неудачном ходе
      setPossibleMoves([]); // Очистка возможных ходов
    }
  };

  const handleNewGame = () => {
    setMoves([]); // Очистка записей о ходах
    startNewGame();
  };

  const renderSquare = (row: number, col: number) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}` as Square;
    const piece = game.get(square);
    const isDark = (row + col) % 2 === 1;
    const backgroundColor = isDark ? '#769656' : '#eeeed2';
    const imageSource = piece ? pieceImages[piece.color][piece.type] : null;
    const isSelectable = piece && piece.color === game.turn();
    const isSelected = selectedSquare === square;
    const isPossibleMove = possibleMoves.some(move => move.to === square);
    const isDisabled = selectedSquare && !isPossibleMove && selectedSquare !== square;

    return (
      <TouchableOpacity
        key={square}
        style={[styles.square, { backgroundColor }, isDisabled ? styles.disabledSquare : null]}
        onPress={() => handleMove(selectedSquare!, square)}
        disabled={!!isDisabled}
      >
        {isPossibleMove && <View style={styles.moveIndicator} />}
        {imageSource && (
          <Image source={imageSource} style={isSelected ? styles.selectedPiece : styles.piece} />
        )}
      </TouchableOpacity>
    );
  };

  const renderRow = (row: number) => {
    const actualRow = playerColor === 'w' ? row : 7 - row;
    return (
      <View key={row} style={styles.row}>
        <Text style={styles.rowLabel}>{8 - actualRow}</Text>
        {Array.from({ length: 8 }, (_, col) => renderSquare(actualRow, col))}
      </View>
    );
  };

  const renderMove = ({ item, index }: { item: Move, index: number }) => {
    const pieceImage = pieceImages[item.pieceColor][item.pieceType];
    return (
      <View style={styles.moveContainer}>
        <Text style={styles.moveText}>{`${moves.length - index}. `}</Text>
        <Image source={pieceImage} style={styles.movePieceImage} />
        <Text style={styles.moveText}>{`${item.from}-${item.to}`}</Text>
      </View>
    );
  };

  const renderMoves = (moves: Move[]) => (
    <FlatList
      data={moves}
      renderItem={renderMove}
      keyExtractor={(item, index) => index.toString()}
      style={styles.movesList}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={30} color="#000" /> 
      </TouchableOpacity>
      {colorSelectionVisible ? (
        <View style={styles.colorSelection}>
          <Text style={styles.colorSelectionTitle}>Choose a color</Text>
          <Button title="White" onPress={() => handleColorSelection('w')} />
          <Button title="Black" onPress={() => handleColorSelection('b')} />
        </View>
      ) : (
        <>
          <View style={styles.boardContainer}>
            <View style={styles.columnLabels}>
              <View style={styles.corner} />
              {Array.from({ length: 8 }, (_, col) => (
                <Text key={col} style={styles.columnLabel}>
                  {String.fromCharCode(97 + col)}
                </Text>
              ))}
            </View>
            <View style={styles.board}>
              {Array.from({ length: 8 }, (_, row) => renderRow(row))}
            </View>
          </View>
          <View style={styles.movesContainer}>
            {renderMoves(moves)}
          </View>
          <Modal
            transparent={true}
            animationType="slide"
            visible={promotionModalVisible}
            onRequestClose={() => handlePromotion('q')}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose a figure to transform</Text>
                <View style={styles.modalButtons}>
                  <Button title="Queen" onPress={() => handlePromotion('q')} />
                  <Button title="Rook" onPress={() => handlePromotion('r')} />
                  <Button title="Knight" onPress={() => handlePromotion('n')} />
                  <Button title="Bishops" onPress={() => handlePromotion('b')} />
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            animationType="slide"
            visible={checkmate || stalemate}
            onRequestClose={() => { }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {checkmate ? `${winner === 'w' ? 'White' : 'Black'} win!` : 'Stalemate! The game is a draw.'}
                </Text>
                <View style={styles.modalButtons}>
                  <Button title="New Game" onPress={handleNewGame} />
                  <Button title="Menu" onPress={onBack} />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default ChessBoard;