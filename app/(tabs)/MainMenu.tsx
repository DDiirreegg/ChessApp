import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { MainMenuProps } from '../(tabs)/types';
import ExitApp from 'react-native-exit-app';
import styles from './MainMenuStyles';

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame }) => {
  console.log('Rendering MainMenu component');

  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoMenu.png')} style={styles.logo} />
      <Text style={styles.title}>Shess</Text>
      <Button title="New Game" onPress={onNewGame}/>
    </View>
  );
};

export default MainMenu;
