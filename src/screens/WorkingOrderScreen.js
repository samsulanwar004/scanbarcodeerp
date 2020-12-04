import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, Dimensions, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

//api
import {wo} from '../api/user';

//lib
import {formatDate, nowDate, convertToRupiah, round} from '../lib';

//storage
import {storageSet, storageGet} from '../storage';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

function WorkingOrderScreen({ navigation, route }) {

	const [state, dispatch] = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [dataWo, setDataWo] = useState('');

	const {wo_reference} = route.params;

	useLayoutEffect(() => {
	    navigation.setOptions({
	      headerRight: () => (
	      	<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
	      	<TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.navigate('Product', {wo_detail: dataWo.usage_detail})}>
	      		<Ionicons name="clipboard-outline" size={24} color="black" />
	      	</TouchableOpacity>
	      	<TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.navigate('Attach', {additional: dataWo.additional, wo_detail: dataWo.usage_detail})}>
	      		<Ionicons name="attach" size={24} color="black" />
	      	</TouchableOpacity>
	      	</View>
	      ),
	    });
	}, [navigation, dataWo]);

	useEffect(() => {
		getWo();
	}, []);

	async function getWo() {

		const {accessToken} = state.auth;

	    setLoading(true);

	    let data = {
	      wo_reference: wo_reference
	    }

	    const {code, result} = await wo(accessToken, data);

	    if (code === 200) {
	    	setDataWo(result.data);
	      	setLoading(false);
	      	//save to history
	      	let oldHistory = await storageGet('history_barcode');

	      	if (_.isEmpty(oldHistory)) oldHistory = Array();

	      	let findWoRef = _.find(oldHistory, function(r) { return r.wo_reference == wo_reference; });

	      	if (_.isEmpty(findWoRef)) {
	      		await storageSet('history_barcode', oldHistory.concat({
		      		wo_reference: wo_reference,
		      		date: nowDate()
		      	}));
	      	}
	    } else if (code === 422) {
	      	setLoading(false);
	      	Alert.alert(
			  'Error',
			  JSON.stringify(result)
			);
			navigation.goBack();
	    } else {
	      	setLoading(false);
	      	Alert.alert(
			  'Error',
			  JSON.stringify(result)
			);
			navigation.goBack();
	    }
	}

	return (
		<ThemeProvider>
			<ScrollView style={{flex: 1,backgroundColor: '#FFFFFF'}}>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>WO Number</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.wo_reference}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>WO Date</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{formatDate(new Date(dataWo.wo_date))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>WO Quantity</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.wo_qty}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Notes</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.note ?? '-'}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Buyer</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.client_name}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Brand</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.brand_name ?? '-'}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Unit</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.unit_code}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Description of Goods</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.desc_goods ?? '-'}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Order Number</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.order_number}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Style Number</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataWo.style_number}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Price / pcs</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{convertToRupiah(round(dataWo.price_pcs ?? 0))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Total Amount</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{convertToRupiah(round(dataWo.amount ?? 0))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<View style={{position: 'absolute', top: SCREEN_WIDTH/2, width: SCREEN_WIDTH, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
					{loading && <><ActivityIndicator
			            animating={true}
			            style= {{ opacity : 1}}
			            size="large" 
			            color="#202a54"
			        /><Text>Please wait...</Text></>}
				</View>
			</ScrollView>
		</ThemeProvider>
	);
}

export default WorkingOrderScreen;