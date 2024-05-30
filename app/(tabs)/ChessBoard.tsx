import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Modal, Button, FlatList } from 'react-native';
import { Square } from 'chess.js';
import { useChessLogic } from './useChessLogic';
import pieceImages from './pieceImages';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Импорт иконки
import styles from './ChessBoardStyles'; // Импорт стилей

interface ChessBoardProps {
  onBack: () => void;
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
  } = useChessLogic();

  const [whiteMoves, setWhiteMoves] = useState<string[]>([]);
  const [blackMoves, setBlackMoves] = useState<string[]>([]);

  const handleMove = (from: Square, to: Square) => {
    if (!from || from === to) {
      // Не сохраняем ход, если только выбрана фигура (первый клик) или ход не изменился
      handleSquarePress(to);
      return;
    }
  
    // Сохраняем ход перед сменой хода в игре
    const move = `${from}-${to}`;
    handleSquarePress(to);
    if (game.turn() === 'b') {
      // Ход белых завершился, сохраняем его
      setWhiteMoves([...whiteMoves, move]);
    } else {
      // Ход черных завершился, сохраняем его
      setBlackMoves([...blackMoves, move]);
    }
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

    return (
      <TouchableOpacity
        key={square}
        style={[styles.square, { backgroundColor }]}
        onPress={() => handleMove(selectedSquare || square, square)}
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

  const renderMove = ({ item, index }: { item: string, index: number }) => (
    <Text style={styles.moveText}>{`${index + 1}. ${item}`}</Text>
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
          <View style={styles.movesContainer1}>
            <FlatList
              data={blackMoves}
              renderItem={renderMove}
              keyExtractor={(item, index) => index.toString()}
              style={styles.movesList}
            />
          </View>
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
            <FlatList
              data={whiteMoves}
              renderItem={renderMove}
              keyExtractor={(item, index) => index.toString()}
              style={styles.movesList}
            />
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
        </>
      )}
    </View>
  );
};

export default ChessBoard;
