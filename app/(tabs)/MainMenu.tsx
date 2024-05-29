import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { MainMenuProps } from '../(tabs)/types'

const MainMenu: React.FC<MainMenuProps> = ({ onContinue, onNewGame, onExit, hasSavedGame }) => {
  console.log('Rendering MainMenu component');
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoMenu.png')} style={styles.logo} />
      <Text style={styles.title}>Shess</Text>
      <Button title="New Game" onPress={onNewGame}/>
      <Button title="Exit" onPress={onExit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  logo: {
    borderRadius: 80,
    width: 300,
    height: 300,
    marginBottom: 20,
  }
});

export default MainMenu;
