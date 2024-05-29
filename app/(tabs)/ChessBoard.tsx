// app/(tabs)/ChessBoard.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, Button } from 'react-native';
import { Square } from 'chess.js';
import { useChessLogic } from './useChessLogic';
import pieceImages from './pieceImages';

const ChessBoard: React.FC = () => {
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
  } = useChessLogic();

  const renderSquare = (row: number, col: number) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}` as Square;
    const piece = game.get(square);
    const isDark = (row + col) % 2 === 1;
    const backgroundColor = isDark ? '#769656' : '#eeeed2';
    const imageSource = piece ? pieceImages[piece.color][piece.type] : null;
    const isSelectable = piece && piece.color === game.turn();
    const isSelected = selectedSquare === square;
    const isPossibleMove = possibleMoves.some(move => move.to === square);

    return (
      <TouchableOpacity
        key={square}
        style={[styles.square, { backgroundColor }]}
        onPress={() => handleSquarePress(square)}
        disabled={!isSelectable && !selectedSquare}
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

  return (
    <View style={styles.container}>
      {colorSelectionVisible ? (
        <View style={styles.colorSelection}>
          <Text style={styles.colorSelectionTitle}>Выберите цвет</Text>
          <Button title="Белые" onPress={() => handleColorSelection('w')} />
          <Button title="Черные" onPress={() => handleColorSelection('b')} />
        </View>
      ) : (
        <>
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
          <Modal
            transparent={true}
            animationType="slide"
            visible={promotionModalVisible}
            onRequestClose={() => handlePromotion('q')}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Выберите фигуру для превращения</Text>
                <View style={styles.modalButtons}>
                  <Button title="Ферзь" onPress={() => handlePromotion('q')} />
                  <Button title="Ладья" onPress={() => handlePromotion('r')} />
                  <Button title="Конь" onPress={() => handlePromotion('n')} />
                  <Button title="Слон" onPress={() => handlePromotion('b')} />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    width: 30,
    height: 30,
  },
  selectedPiece: {
    width: 35,
    height: 35,
  },
  moveIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    opacity: 0.8,
    zIndex: 1,
  },
  columnLabels: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnLabel: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowLabel: {
    width: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  corner: {
    width: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorSelection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelectionTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ChessBoard;
