import React, { useContext, useState, useEffect } from "react";
import { View, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar, ListItem } from 'react-native-elements';

//lib
import {formatDate} from '../lib';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

function PersonalScreen({ navigation }) {

	const [state, dispatch] = useContext(Context);
	const [dataProfile, setDataProfile] = useState('');

	async function getProfile() {
		const {profile} = state.account;

		setDataProfile(profile);
	}

	useEffect(() => {
	    getProfile();
	}, []);

	return (
		<ThemeProvider>
			<StatusBar barStyle="light-content" animated={true} showHideTransition="slide" backgroundColor="#202a54"/>
			<View style={{flex: 3, flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
				<View style={{width: SCREEN_WIDTH}}>
					<ListItem
					  	bottomDivider
					  	containerStyle={{backgroundColor: 'white'}}
					>
					    <ListItem.Content>
					      	<ListItem.Title>Name</ListItem.Title>
					      	<ListItem.Subtitle>{dataProfile.name}</ListItem.Subtitle>
					    </ListItem.Content>
					</ListItem>
					<ListItem
					  	bottomDivider
					  	containerStyle={{backgroundColor: 'white'}}
					>
					    <ListItem.Content>
					      	<ListItem.Title>Initial</ListItem.Title>
					      	<ListItem.Subtitle>{dataProfile.initial_user}</ListItem.Subtitle>
					    </ListItem.Content>
					</ListItem>
					<ListItem
					  	bottomDivider
					  	containerStyle={{backgroundColor: 'white'}}
					>
					    <ListItem.Content>
					      	<ListItem.Title>Email</ListItem.Title>
					      	<ListItem.Subtitle>{dataProfile.email}</ListItem.Subtitle>
					    </ListItem.Content>
					</ListItem>
					<ListItem
					  	bottomDivider
					  	containerStyle={{backgroundColor: 'white'}}
					>
					    <ListItem.Content>
					      	<ListItem.Title>Last update</ListItem.Title>
					      	<ListItem.Subtitle>{formatDate(new Date(dataProfile.updated_at))}</ListItem.Subtitle>
					    </ListItem.Content>
					</ListItem>
				</View>
			</View>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	textProfile: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: 20
	}
});

export default PersonalScreen;