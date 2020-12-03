import React, { useContext, useState, useEffect } from "react";
import { View, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
import HTML from "react-native-render-html";
import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer
} from '@native-html/table-plugin';
import WebView from 'react-native-webview';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

function AttachScreen({ navigation, route }) {

	const {additional, wo_detail} = route.params;
	const [state, dispatch] = useContext(Context);
	const [active, setActive] = useState({
		description: false,
		cutting: false,
		material: false,
		trimming: false,
		bordir: false,
		sewing: false,
		finishing: false,
		packing: false,
		sample: false,
		washing: false,
	});

	const renderers = {
	  table: makeTableRenderer({ WebView })
	};

	const htmlConfig = {
	  alterNode,
	  renderers,
	  ignoredTags: IGNORED_TAGS
	};

	function renderDescription() {
		let html = additional.production_desc;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_desc &&
					<Image 
						source={{uri: additional.file_desc}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html && 
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderCutting() {

		let sizes = additional.size;
		let instruction = additional.instruction_cutting;

		let sizeNumber = sizes[0].size;

		let html = `
			<div style="overflow: scroll;">
				<table border="1" style="width: ${SCREEN_HEIGHT}px;">
				    <tbody>
				        <tr>
				            <td width="20%">SIZE ASSORTMENT</td>
				            <td colspan="${(sizeNumber.length+3)}">SIZE</td>
				        </tr>`;

				        html += `<tr>
				            <td><strong>Colour</strong></td>`;

				        for (var i = 0; i < sizeNumber.length; i++) {	
				        	html += `<td>${sizeNumber[i]}</td>`;
				        }

				        html +=`
				            <td>Country</td>
				            <td>Hasil Potong</td>
				            <td>Total</td>
				        </tr>`;

				        for (var i = 0; i < sizes.length; i++) {	
				        	html += `<tr>
					            <td>${sizes[i].colour}</td>`;

				            for (var j = 0; j < sizes[i].amount.length; j++) {
				            	html += `<td>${sizes[i].amount[j]}</td>`;
				            }

					        html += `<td width="10%">${sizes[i].country ?? '-'}</td>
					            <td width="15%">${sizes[i].cutting ?? 0}</td>
					            <td>${sizes[i].total}</td>
					        </tr>`;
				        }

				        html +=`
				        <tr></tr>
				    </tbody>
				</table>
			</div>
			`;

		return (
			<View style={styles.containerAdditionalTable}>
				<HTML html={html} {...htmlConfig} />
				{instruction &&
					<HTML html={instruction} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderMaterial() {

		let html = `
			<div style="overflow: scroll;">
				<table border="1" style="width: ${SCREEN_HEIGHT}px;">
				    <thead>
				        <tr>
				            <th style="vertical-align: middle; text-align: center;">No</th>
				            <th style="vertical-align: middle; text-align: center;">Material</th>
				            <th style="vertical-align: middle; text-align: center;">Spesification</th>
				        </tr>
				    </thead>
				    <tbody>`;

				    if (typeof wo_detail != 'undefined' && wo_detail.length > 0) {

						for (var i = 0; i < wo_detail.length; i++) {
						  	let detail = wo_detail[i];

						  	if (detail.receive_detail_id == 11) {
						  		html += `<tr>
						            <td width="7%">${i+1}</td>
						            <td colspan="3">Material waiting receive</td>
						        </tr>`;
						  	} else {
						  		html += `<tr>
								    <td width="7%">${i+1}</td>
								    <td>${detail.product_type}</td>
								    <td>${detail.product_name}</td>
								</tr>
								`;
						  	}
					    }
					} else {
						html += `<tr><td colspan="3">No data</td></tr>`;
					}
				        
				        html += `<tr></tr>
				    </tbody>
				</table>
			</div>
			`;

		return (
			<View style={styles.containerAdditionalTable}>
				<HTML html={html} {...htmlConfig} />
			</View>
		)
	}

	function renderTrimming() {
		let html = additional.instruction_trimming;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_trimming &&
					<Image 
						source={{uri: additional.file_trimming}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html && 
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderBordir() {

		let html = additional.instruction_bordir;

		return (
			<View style={styles.containerAdditional}>
				{additional.file_bordir &&
					<Image 
						source={{uri: additional.file_bordir}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html && 
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderSewing() {
		return (
			<View style={styles.containerAdditional}>
				<Text>
					Sewing
				</Text>
			</View>
		)
	}

	function renderFinishing() {
		let html = additional.instruction_finishing;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_finishing && 
					<Image 
						source={{uri: additional.file_finishing}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html &&
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderPacking() {
		let html = additional.instruction_packing;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_packing &&
					<Image 
						source={{uri: additional.file_packing}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html &&
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderSample() {
		let html = additional.instruction_sample;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_sample &&
					<Image 
						source={{uri: additional.file_sample}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html &&
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	function renderWashing() {
		let html = additional.instruction_washing;
		
		return (
			<View style={styles.containerAdditional}>
				{additional.file_washing &&
					<Image 
						source={{uri: additional.file_washing}} 
						resizeMode="contain" 
						style={{width: SCREEN_WIDTH - 10, height: SCREEN_HEIGHT}}
					/>
				}
				{html &&
					<HTML html={html} {...htmlConfig} />
				}
			</View>
		)
	}

	return (
		<ThemeProvider>
			<StatusBar barStyle="dark-content" animated={true} showHideTransition="slide" backgroundColor="#FFFFFF"/>
			<ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f9fafe'}}>
				<ListItem
					onPress={() => setActive({
						...active,
						description: !active.description
					})} 
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Product Description</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.description && renderDescription()}
				<ListItem
					onPress={() => setActive({
						...active,
						cutting: !active.cutting
					})} 
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Cutting</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.cutting && renderCutting()}
				<ListItem
					onPress={() => setActive({
						...active,
						material: !active.material
					})}
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Material</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.material && renderMaterial()}
				<ListItem
					onPress={() => setActive({
						...active,
						trimming: !active.trimming
					})}
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Trimming</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.trimming && renderTrimming()}
				<ListItem
					onPress={() => setActive({
						...active,
						bordir: !active.bordir
					})}
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Bordir</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.bordir && renderBordir()}
				<ListItem
					onPress={() => setActive({
						...active,
						sewing: !active.sewing
					})} 
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Sewing</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.sewing && renderSewing()}
				<ListItem
					onPress={() => setActive({
						...active,
						finishing: !active.finishing
					})}
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Finishing</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.finishing && renderFinishing()}
				<ListItem
					onPress={() => setActive({
						...active,
						packing: !active.packing
					})}
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Packing</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.packing && renderPacking()}
				<ListItem
					onPress={() => setActive({
						...active,
						sample: !active.sample
					})} 
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Sample</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.sample && renderSample()}
				<ListItem
					onPress={() => setActive({
						...active,
						washing: !active.washing
					})} 
				  	bottomDivider
				  	containerStyle={{backgroundColor: 'white'}}
				>
				    <ListItem.Content>
				      	<ListItem.Title>Instruction Washing</ListItem.Title>
				    </ListItem.Content>
				    <Ionicons name="chevron-down" size={24} color="black" />
				</ListItem>
				{active.washing && renderWashing()}
			</ScrollView>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	containerAdditional: {
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center',
		padding: 10
	},
	containerAdditionalTable: {
		flex: 1,
		flexDirection: 'column', 
		padding: 10
	}
});

export default AttachScreen;