// app/_layout.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import MainMenu from './(tabs)/MainMenu';
import { MainMenuProps } from './(tabs)/types';
import ChessBoard from './(tabs)/ChessBoard';

type Screen = 'mainMenu' | 'Chessboard';

const Layout: React.FC = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme].background;
  const [currentScreen, setCurrentScreen] = useState<Screen>('mainMenu');

  const handleContinue = () => {
    console.log("Continue game");
  };

  const handleNewGame = () => {
    setCurrentScreen('Chessboard');
  };

  const handleExit = () => {
    console.log("Exit game");
  };

  const handleBackToMenu = () => {
    setCurrentScreen('mainMenu');
  };

  const checkSavedGame = (): boolean => {
    // Логика проверки наличия сохраненной игры
    return true; // Замените реальной логикой
  };

  const mainMenuProps: MainMenuProps = {
    onContinue: handleContinue,
    onNewGame: handleNewGame,
    onExit: handleExit,
    hasSavedGame: checkSavedGame(),
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {currentScreen === 'mainMenu' && <MainMenu {...mainMenuProps} />}
      {currentScreen === 'Chessboard' && <ChessBoard onBack={handleBackToMenu} />} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Layout;
