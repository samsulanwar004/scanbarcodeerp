import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
import _ from 'lodash';
//storage
import { storageItemClear, storageGet } from '../storage';

//lib
import {formatDate} from '../lib';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

function HistoryScreen({ navigation }) {

	const [state, dispatch] = useContext(Context);
	const [history, setHistory] = useState(Array());

	async function getHistory() {
		let dataHistory = await storageGet('history_barcode');
		setHistory(_.isEmpty(dataHistory) ? Array() : dataHistory.reverse());
	}

	async function removeHistory() {

		const removed = async () => {
			await storageItemClear('history_barcode');
			setHistory(Array());
		}

		Alert.alert(
		  'Confirmation',
		  'Clear all history?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => console.log('Cancel Pressed'),
		      style: 'cancel'
		    },
		    { text: 'OK', onPress: () => removed() }
		  ],
		  { cancelable: false }
		);
	}

	useLayoutEffect(() => {
	    navigation.setOptions({
	      headerRight: () => (
	      	<TouchableOpacity style={{marginRight: 10}} onPress={() => removeHistory()}>
	      		<Ionicons name="trash-outline" size={24} color="black" />
	      	</TouchableOpacity>
	      ),
	    });
	}, [navigation]);

	useEffect(() => {
	    const unsubscribe = navigation.addListener('focus', () => {
	      // The screen is focused
	      // Call any action
	      getHistory();
	    });

	    // Return the function to unsubscribe from the event so it gets removed on unmount
	    return unsubscribe;
	}, [navigation]);

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			onPress={() => navigation.navigate('Working Order', {wo_reference: item.wo_reference})} 
		  	bottomDivider
		  	containerStyle={{backgroundColor: 'white'}}
		>
		    <ListItem.Content>
		      	<ListItem.Title>{item.wo_reference}</ListItem.Title>
		    </ListItem.Content>
		    <ListItem.Subtitle>{formatDate(new Date(item.date.split(' ')[0]))}</ListItem.Subtitle>
		</ListItem>
	)

	return (
		<ThemeProvider>
			<FlatList
				style={styles.containerHistory}
		      	keyExtractor={keyExtractor}
		      	data={history}
		      	renderItem={renderItem}
		    />
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	containerHistory : {
		flex: 1,
		backgroundColor: '#f9fafe',
		width: SCREEN_WIDTH, 
		borderTopLeftRadius: 10, 
		borderTopRightRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 1,
	},
});

export default HistoryScreen;