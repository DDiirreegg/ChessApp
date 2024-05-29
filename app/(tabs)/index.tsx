// app/tables/index.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChessGame from './ChessGame';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ChessGame />
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

export default App;
