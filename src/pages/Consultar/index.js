import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Permissions from "react-native-permissions";

import styles from "./styles";
import api from "../../services/api";
import config from "../../config";

function Consultar({ navigation }) {
  const [inventario, setInventario] = useState({});
  const [contagem, setContagem] = useState({});
  const [codigo, setCodigo] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const handleContagemInventario = async () => {
      setContagem(await config.getContagem()); // JSON.parse(await AsyncStorage.getItem(KEY_CONTAGEM)));
      setInventario(await config.getInventario()); //JSON.parse(await AsyncStorage.getItem(KEY_INVENTARIO)));
    };
    handleContagemInventario();
    // loadProduto();
  }, []);

  const loadProduto = async () => {
    try {
      if (codigo) {
        setLoad(true);
        const response = await api.get(`/private/produto/${codigo}`)
          .then(({ data }) => {
            if (data.id)
              navigation.navigate("Inventario", { produtoItem: data });
            else Alert.alert("Atenção!", "Produto não encontrado!");
          })
          .finally(() => setLoad(false));
      }
    } catch (err) {
      setLoad(false);
      Alert.alert("Falha!", err.message);
    }
  };

  const openCamera = async () => {
    let permission = await config.getPermissaoCamera();
    if(permission){
      navigation.navigate("Camera");
    }else{
      setLoad(true);
      await Permissions.check("camera").then(async response => {
        switch (response) {
          case 'undetermined':
          case 'restricted':
            await Permissions.request("camera").then(async permissao => {
              // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
              await config.setPermissaoCamera(permissao === 'authorized' ? 'true' : 'false');
            })
            break;
          case 'denied':
            await config.setPermissaoCamera('true')
            Alert.alert(
              "Permissão Negada!",
              "Para conseguir realizar a leitura do código de barras, " +
                "é necessário autorizar o aplicativo para usar a câmera.\nVá em Configurações > Apps e " +
                "Notificações -> Procure pelo APP -> Permissões -> Câmera"
            );
            break;
          case 'authorized':
            await config.setPermissaoCamera('true')
            .finally(() => navigation.navigate("Camera"));
          break;
          default:
            break;
        }
      }).finally(() => setLoad(false));;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={styles.headerIcon}
          name="ios-archive"
          color="#001844"
          size={100}
        />
        <Text style={styles.headerTitle}>{inventario.nome}</Text>
      </View>
      <Text style={styles.label}>Código Produto</Text>
      <View style={styles.inputForm}>
        <TextInput
          style={styles.txtInput}
          value={codigo.toString()}
          onChangeText={setCodigo}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={openCamera} style={{ marginLeft: 25 }}>
          <Icon name="ios-barcode" color="#000" size={50} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={loadProduto} disabled={load}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {load && (
        <ActivityIndicator style={styles.loader} size={50} color="#000" />
      )}
    </View>
  );
}

Consultar.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("contagemItem", {}).descricao,
  headerBackTitleStyle: { color: "#000" },
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
      <Icon
        name="ios-search"
        size={25}
        color="white"
        left={20}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  )
});

export default Consultar;

//https://vendas.medicamental.com.br/imagens/
