import React from "react";
import { View, Dimensions, Image, StatusBar } from 'react-native';
import { Button, ThemeProvider, Text } from 'react-native-elements';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

function SplashScreen({ navigation }) {
  return (
  	<ThemeProvider>
  		<StatusBar barStyle="light-content" animated={true} showHideTransition="slide" backgroundColor="#202a54"/>
		<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#202a54', width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
			<Image source={require('../assets/sm_blue_big.png')} resizeMode="contain" style={{width: SCREEN_WIDTH/2, height: SCREEN_WIDTH/2}} />
		  	<Text h1 style={{color: 'white'}}>Suryamandiri</Text>
		</View>
    </ThemeProvider>
  );
}

export default SplashScreen;