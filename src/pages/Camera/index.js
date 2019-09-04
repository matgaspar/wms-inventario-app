import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import api from '../../services/api';
import { RNCamera } from 'react-native-camera';

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

  const handleBarcodeReader = async () => {
    const options = { quality: 0.5, base64: true, skipProcessing: true, forceOrientation: true };
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleBarcodeReader}>
        <Text>Capturar</Text>
      </TouchableOpacity>
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
