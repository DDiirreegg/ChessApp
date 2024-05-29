// app/(tabs)/MainMenu.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import ChessBoard from './ChessBoard';

interface MainMenuProps {
  onContinue: () => void;
  onNewGame: () => void;
  onExit: () => void;
  hasSavedGame: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ onContinue, onNewGame, onExit, hasSavedGame }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoMenu.png')} style={styles.logo} />
      <Text style={styles.title}>Шахматы</Text>
      {hasSavedGame && <Button title="Countinius" onPress={onContinue} />}
      <Button title="New game" onPress={onNewGame} />
      <Button title="Exit" onPress={onExit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default MainMenu;
