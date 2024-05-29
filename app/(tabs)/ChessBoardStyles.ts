// app/(tabs)/ChessBoardStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Добавляем это свойство
    padding: 10,
  },
  backButton: {
    marginTop: 30,
    position: 'absolute',
    top: 10,
    left: -20,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    marginBottom: 5, // Дистанция между буквами и доской
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
    marginTop: 350,
    fontSize: 24,
    marginBottom: 20,
  },
});

export default styles;
