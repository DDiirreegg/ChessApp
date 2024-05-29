import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import ChessBoard from './(tabs)/ChessBoard'; // Проверьте правильность пути
import MainMenu from './(tabs)/MainMenu';

const Layout: React.FC = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme].background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ChessBoard />
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
