import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import TabBg from '../svg/TabBg';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function TabBarcodeButton(props) {

  const navigation = useNavigation();

	return (
	    <View
	      style={styles.container}
	      pointerEvents="box-none"
	    >
	      <TabBg
	        color={props.bgColor}
	        style={styles.background}
	      />
	      <TouchableOpacity
	        style={styles.button}
	        onPress={() => navigation.navigate('Barcode', {mode: 'wo'})}
	      >
	        <Ionicons name="barcode-outline" size={24} color="#FFFFFF"/>
	      </TouchableOpacity>
	    </View>
	)
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#202a54',
  },
});

export default TabBarcodeButton;