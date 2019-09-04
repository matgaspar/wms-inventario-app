import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import BarcodeScanner, {
  Exception,
  FocusMode,
  CameraFillMode,
  FlashMode,
  pauseScanner,
  resumeScanner
} from "react-native-barcode-scanner-google";
import api from '../../services/api';

function Camera({ navigation }) {
  const [codigo, setCodigo] = useState(0);

  /* useEffect(() => {

        return () => {

        }
    }, []); */
    
  const loadProduto = async (ean = codigo) => {
    try {
      if (ean) {
        const response = await api
          .get(`/private/produto/${ean}/barcode`)
          .then(({ data }) => {
            if (data.id) {
              navigation.navigate("Inventario", { produtoItem: data });
              resumeScanner();
            } else {
              resumeScanner();
              Alert.alert("Atenção!", "Produto não encontrado!");
            }
          })
      } else {
        resumeScanner();
      }
    } catch (err) {
        resumeScanner();
        Alert.alert("Falha!", err.message);
    }
  };

  const handleBarcodeReader = ({ data, type }) => {
    if (data) {
      setCodigo(data);
      pauseScanner()
        .then(() => {
          loadProduto(data);
          // do something after the scanner (camera) stream was resumed.
        })
        .catch(e => {
          resumeScanner();
          // Print error if scanner stream could not be resumed.
          console.log(e);
        });
    }
    //console.log(`Barcode '${data}' of type '${type}' was scanned.`);
  };

  return (
    <View style={{ flex: 1 }}>
      <BarcodeScanner
        style={{ flex: 1 }}
        onBarcodeRead={handleBarcodeReader}
        onException={exceptionKey => {
          // check instructions on Github for a more detailed overview of these exceptions.
          switch (exceptionKey) {
            case Exception.NO_PLAY_SERVICES:
            // tell the user they need to update Google Play Services
            case Exception.LOW_STORAGE:
            // tell the user their device doesn't have enough storage to fit the barcode scanning magic
            case Exception.NOT_OPERATIONAL:
            // Google's barcode magic is being downloaded, but is not yet operational.
            default:
              break;
          }
        }}
        focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
        cameraFillMode={CameraFillMode.COVER /* could also be FIT */}
        //barcodeType={BarcodeType.CODE_128 | BarcodeType.EAN_13 | BarcodeType.EAN_8 | BarcodeType.ALL /* replace with ALL for all alternatives */}
        FlashMode={FlashMode.TORCH /* 0 is OFF or 1 is TORCH  */}
      />
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
