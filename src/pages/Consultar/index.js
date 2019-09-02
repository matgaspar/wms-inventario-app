import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import logo from '../../assets/logo.png';

function Consultar({ navigation }) {

const [inventario, setInventario] = useState({});
const [codigo, setCodigo] = useState(22743);
const [load, setLoad] = useState(false);

useEffect(() => {
  const inventarioItem = navigation.getParam('inventarioItem', {});
  setInventario(inventarioItem);
  // loadProduto();
}, [])

const loadProduto = async () => {
  if(codigo){
    setLoad(true);
    const response = await fetch(`https://api.web7online.com/produtos/${codigo}`);
    const produto = await response.json();
    
    if(produto.id){
      setLoad(false);
      navigation.navigate('Inventario', { produto });
    }else{
      setLoad(false);
      alert('Produto não encontrado!');
    }
  }
}

const openCamera = () => {
  navigation.navigate('Camera');
  // console.log(firebase.vision().X);
  // alert("Abrir câmera!");
}

  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.label}>Código Produto</Text>
        <View style={styles.inputForm}>
          <TextInput style={styles.txtInput} value={codigo.toString()} onChangeText={setCodigo} keyboardType='number-pad' />
          <TouchableOpacity onPress={openCamera} style={{ marginLeft: 25 }}>
            <Icons name='ios-barcode' color='#000' size={50} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={loadProduto}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        { load && <ActivityIndicator style={styles.loader} size={50} color='#000' /> }
    </View>
  );
}

Consultar.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('inventarioItem', {}).nome,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
      <Icons name="ios-search" size={25} color="white" left={20} style={{ marginRight: 10 }} />
    </TouchableOpacity>
  )
});

export default Consultar;

//https://vendas.medicamental.com.br/imagens/