import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import api from '../../services/api';
import { RNCamera, Point } from 'react-native-camera';

function Camera({ navigation }) {
  const [codigo, setCodigo] = useState(0);

  useEffect(() => {

        return () => {
          setCodigo(0);
        }
    }, []);
    
  const loadProduto = async (ean = codigo) => {
    try {
      if (ean) {
        const response = await api
          .get(`/private/produto/${ean}/barcode`)
          .then(({ data }) => {
            if (data.id) {
              navigation.navigate("Inventario", { produtoItem: data });
              // this.camera.resumePreview();
            } else {
              // this.camera.resumePreview();
              Alert.alert("Atenção!", "Produto não encontrado!");
            }
          })
      } else {
        // this.camera.resumePreview();
      }
    } catch (err) {
      // this.camera.resumePreview();
      Alert.alert("Falha!", err.message);
    }
  };

  const handleBarcodeReader = async () => {
    const options = { quality: 0.5, base64: true, skipProcessing: true, forceOrientation: true };
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => { this.camera = ref; }}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        zoom={0.5}
        // focusDepth={0.9}
        autoFocusPointOfInterest={{ x: 71.37254901960785, y: 236.07843524217606 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto} 
        style={styles.preview}
        // androidCameraPermissionOptions={{
        //   title: 'Permission to use camera',
        //   message: 'We need your permission to use your camera',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
        onBarCodeRead={(data) => console.log(data)}
        // onGoogleVisionBarcodesDetected={(data) => {
        //   const { barcodes, ...props } = data;
        //   if(barcodes.length > 0 && codigo === 0){
        //     let barcode = barcodes[0].data;
        //     setCodigo(barcode);
        //     console.log(barcodes[0]);
        //     console.log(props);
        //     loadProduto(barcode);
        //     // this.camera.pausePreview();
        //   }
        // }}
      >
      </RNCamera>
    </View>
  );
}

Camera.navigationOptions = ({ navigation }) => ({
  headerTitle: "LER CÓDIGO DE BARRAS",
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
      <Icons
        name="ios-search"
        size={25}
        color="white"
        left={20}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  )
});

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});