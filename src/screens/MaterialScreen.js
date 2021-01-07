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
import {material} from '../api/user';

//lib
import {formatDate, nowDate, convertToRupiah, round} from '../lib';

//storage
import {storageSet, storageGet} from '../storage';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

function MaterialScreen({ navigation, route }) {

	const [state, dispatch] = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [dataMaterial, setDataMaterial] = useState('');

	const {barcodeid} = route.params;

	useEffect(() => {
		getMaterial();
	}, []);

	async function getMaterial() {

		const {accessToken} = state.auth;

	    setLoading(true);

	    let data = {
	      barcodeid: barcodeid
	    }

	    const {code, result} = await material(accessToken, data);

	    if (code === 200) {
	    	setDataMaterial(result.data);
	      	setLoading(false);
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
				      <ListItem.Title>Barcode ID</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.id}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Created Date</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{formatDate(new Date(dataMaterial.created_at))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Product Name</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.product_name}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Type</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.type_name}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Group</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.group_name}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Unit</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.unit_code}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>QTY</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.qty}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Unit Price</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{convertToRupiah(round(dataMaterial.unit_price ?? 0))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Amount</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{convertToRupiah(round(dataMaterial.amount ?? 0))}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>QC Date</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.qc_date}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>QC By</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.qc_by}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Inspection</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.inspection_report}</ListItem.Title>
				    </ListItem.Content>
				</ListItem>
				<ListItem bottomDivider>
				    <ListItem.Content>
				      <ListItem.Title>Status</ListItem.Title>
				    </ListItem.Content>
				    <ListItem.Content>
				      <ListItem.Title>{dataMaterial.status_name}</ListItem.Title>
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

export default MaterialScreen;