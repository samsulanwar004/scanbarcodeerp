import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, Dimensions, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar } from 'react-native-elements';
import HTML from "react-native-render-html";
import { ScrollView } from 'react-native';
import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer
} from '@native-html/table-plugin';
import WebView from 'react-native-webview';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

//lib
import {formatDate, nowDate, convertToRupiah, round} from '../lib';

//storage
import {storageSet, storageGet} from '../storage';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

function ProductScreen({ navigation, route }) {

	const [state, dispatch] = useContext(Context);

	const {wo_detail} = route.params;

	let html = `
		<div style="overflow: scroll;">
			<table border="1" style="width: ${SCREEN_HEIGHT*2}px;">
			    <thead>
			        <tr>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">No</th>
			            <th colspan="2" style="vertical-align: middle; text-align: center;">Receive</th>
			            <th colspan="2" style="vertical-align: middle; text-align: center;">Product</th>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">Unit</th>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">Stock</th>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">Qty</th>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">Price</th>
			            <th rowspan="2" style="vertical-align: middle; text-align: center;">Total</th>
			        </tr>
			        <tr>
			            <th>Number</th>
			            <th>Date</th>
			            <th>Code</th>
			            <th>Name</th>
			        </tr>
			    </thead>
			    <tbody>`;

			    if (typeof wo_detail != 'undefined' && wo_detail.length > 0) {
			    	var i;
					for (i = 0; i < wo_detail.length; i++) {
					  	let detail = wo_detail[i];
					  	html += `<tr>
						    <td style="vertical-align: middle;">${i+1}</td>
						    <td style="vertical-align: middle;">${detail.reference_no}</td>
						    <td style="vertical-align: middle;">${formatDate(new Date(detail.date))}</td>
						    <td style="vertical-align: middle;">${detail.product_code}</td>
						    <td style="vertical-align: middle;">${detail.product_name}</td>
						    <td style="vertical-align: middle;">${detail.unit_code}</td>
						    <td style="vertical-align: middle;">${detail.stock_bc_qty}</td>
						    <td style="vertical-align: middle;">${detail.qty ?? 0}</td>
						    <td style="vertical-align: middle;">${convertToRupiah(round(detail.price ?? 0))}</td>
						    <td style="vertical-align: middle;">${convertToRupiah(round(detail.amount ?? 0))}</td>
						</tr>
						`;
					}
			    } else {
			    	html += `<tr><td colspan="12">No data</td></tr>`;
			    }	        

		html += `<tr></tr></tbody>
			</table>
		</div>
	`;

	const renderers = {
	  table: makeTableRenderer({ WebView })
	};

	const htmlConfig = {
	  alterNode,
	  renderers,
	  ignoredTags: IGNORED_TAGS
	};

	return (
		<ThemeProvider>
			<ScrollView style={{flex: 1,backgroundColor: '#FFFFFF'}}>
				<HTML html={html} {...htmlConfig} />
			</ScrollView>
		</ThemeProvider>
	);
}

export default ProductScreen;