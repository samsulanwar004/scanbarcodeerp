import React, { useContext, useState, useEffect } from "react";
import { View, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
//storage
import { storageClear } from '../storage';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

function ProfileScreen({ navigation }) {

	const [state, dispatch] = useContext(Context);
	const [dataProfile, setDataProfile] = useState('');

	async function getProfile() {
		const {profile} = state.account;

		setDataProfile(profile ?? []);
	}

	useEffect(() => {
	    getProfile();
	}, []);

	async function loGout() {

		const logout = async () => {
			await storageClear();
			dispatch({ type: 'LOG_OUT' });
		}

		Alert.alert(
		  'Confirmation',
		  'Logout?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => console.log('Cancel Pressed'),
		      style: 'cancel'
		    },
		    { text: 'OK', onPress: () => logout() }
		  ],
		  { cancelable: false }
		);
	}

	return (
		<ThemeProvider>
			<StatusBar barStyle="light-content" animated={true} showHideTransition="slide" backgroundColor="#202a54"/>
			<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#202a54'}}>
				<View style={{position: 'absolute', top: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH}}>
		          <Image source={require('../assets/sm_blue_big.png')} resizeMode="contain" style={{width: SCREEN_WIDTH/3, height: SCREEN_WIDTH/3}} />
		        </View>
				<View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
					<Avatar containerStyle={{borderColor: 'white', borderWidth: 2, backgroundColor: 'grey'}} rounded size="large" title={dataProfile.initial_user} />
					<View style={{marginLeft: 10}}>
						<Text style={styles.textProfile}>{dataProfile.name}</Text>
						<Text style={styles.textProfile}>{dataProfile.email}</Text>
					</View>
				</View>
			</View>
			<View style={{flex: 3, flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9fafe'}}>
				<View style={{width: SCREEN_WIDTH}}>
					<ListItem
						onPress={() => navigation.navigate('Personal Information')} 
					  	bottomDivider
					  	containerStyle={{backgroundColor: 'white'}}
					>
						<Ionicons name="person-circle" size={24} color="black" />
					    <ListItem.Content>
					      	<ListItem.Title>Personal Information</ListItem.Title>
					    </ListItem.Content>
					    <Ionicons name="chevron-forward" size={24} color="black" />
					</ListItem>
				</View>
				<View style={{position: 'absolute', bottom: 100, left: 15}}>
					<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => loGout()}>
			      		<Ionicons name="exit-outline" size={30} color="black" />
			      		<Text style={{fontWeight: 'bold', marginLeft: 10}}>Logout</Text>
			      	</TouchableOpacity>
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

export default ProfileScreen;