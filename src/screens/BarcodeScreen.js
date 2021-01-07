import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {Context} from '../context/Store';
import { Button, ThemeProvider, Input, Text, Avatar } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const maskRowHeight = Math.round((SCREEN_HEIGHT - 200) / 20);
const maskColWidth = (SCREEN_WIDTH - 250) / 2;

function BarcodeScreen({ navigation, route }) {

  const {mode} = route.params;
	const [state, dispatch] = useContext(Context);
	const [type, setType] = useState(RNCamera.Constants.Type.back);
	const [barcodeFinderVisible, setBarcodeFinderVisible] = useState(true);
	const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
	const [flashOn, setflashOn] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [loading, setloading] = useState(false);

	const barcodeCodes = [];

	useEffect(() => {
		setIsActive(true);
	}, []);

  useLayoutEffect(() => {

    let title = 'Barcode';

    if (mode == 'wo') {
      title = 'WO Barcode';
    } else if (mode == 'material') {
      title = 'Material Barcode';
    }

    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

	function onBarCodeRead(scanResult) {

    	if (scanResult.data != null) {
    		
	      if (!barcodeCodes.includes(scanResult.data)) {
	        barcodeCodes.push(scanResult.data);

          if (mode == 'wo') {
            navigation.navigate('Working Order', {wo_reference: scanResult.data});
          } else if (mode == 'material') {
            navigation.navigate('Material', {barcodeid: scanResult.data});
          }
	        
	      }
	    }
	    return;
	}

	async function togleFlash() {
		await setflashOn(!flashOn);

		if (!flashOn) {
			setFlashMode(RNCamera.Constants.FlashMode.torch);
		} else {
			setFlashMode(RNCamera.Constants.FlashMode.off);
		}
	}

	function renderCamera() {

	    if (!isActive) {
	      return null;
	    }

	    return (
		    <RNCamera
		        style={styles.cameraView}
		        type={type}
		        androidCameraPermissionOptions={{
		          title: 'Permission to use camera',
		          message: 'We need your permission to use your camera',
		          buttonPositive: 'Ok',
		          buttonNegative: 'Cancel',
		        }}
		        androidRecordAudioPermissionOptions={{
		          title: 'Permission to use audio recording',
		          message: 'We need your permission to use your audio',
		          buttonPositive: 'Ok',
		          buttonNegative: 'Cancel',
		        }}
		        onBarCodeRead={onBarCodeRead}
		        barcodeFinderVisible={barcodeFinderVisible}
		        barcodeFinderWidth={280}
		        barcodeFinderHeight={220}
		        barcodeFinderBorderColor="white"
		        barcodeFinderBorderWidth={2}
		        defaultTouchToFocus
		        flashMode={flashMode}
		        mirrorImage={false}
		        onFocusChanged={() => {}}
		        onZoomChanged={() => {}}
		        captureAudio={false}
		      >
		        <View style={styles.maskOutter}>
		          <View
		            style={[
		              { flex: maskRowHeight },
		              styles.maskRow,
		              styles.maskFrame
		            ]}
		          />
		          <View style={[{ flex: 30 }, styles.maskCenter]}>
		            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
		            <View style={styles.maskInner} />
		            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
		          </View>
		          <View
		            style={[
		              { flex: maskRowHeight },
		              styles.maskRow,
		              styles.maskFrame
		            ]}
		          />
		        </View>
		    </RNCamera>
		)
	}

	return (
		<ThemeProvider>
        {renderCamera()}
        <View
          style={{
            flex: 1,
            position: "absolute",
            alignItems: "center",
            flexDirection: "row",
            margin: 40
          }}
        >
          <View
            elevation={20}
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Roboto-Medium",
                fontSize: 14
              }}
            >
              Arahkan kode Barcode ke area yang telah ditentukan
            </Text>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: "90%",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          <View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                bottom: "50%"
              }}
            >
              <TouchableOpacity onPress={() => togleFlash()}>
                <Ionicons name={flashOn === true ? 'flash' : 'flash-off'} size={30} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loading &&
          <View style={styles.loading}>
            <Ionicons name="loading" size={24}/>
          </View>
        }
      </ThemeProvider>
	);
}

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    justifyContent: "flex-start"
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: SCREEN_WIDTH-40,
    backgroundColor: "transparent",
    borderColor: "#202a54",
    borderWidth: 1
  },
  maskFrame: {
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { 
    flexDirection: "row" 
  },
  loading: {
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.20)'
  },
});

export default BarcodeScreen;