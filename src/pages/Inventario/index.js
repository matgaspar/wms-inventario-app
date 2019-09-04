import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import styles from './styles';
import NoPhoto from '../../assets/noPhoto.png';
import { KEY_CONTAGEM, KEY_INVENTARIO } from '../../config';

function Inventario({ navigation }) {

    const [produto, setProduto] = useState({});
    const [contagem, setContagem] = useState({});
    const [inventario, setInventario] = useState({});
    const [imagens, setImagens] = useState([]);
    const [qtd, setQtd] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const produt = navigation.getParam('produtoItem', {});
      setProduto(produt);
      setImagens(produt.ProdutosImagens);
      /* const contag = navigation.getParam('contagemItem', {});
      const invent = navigation.getParam('inventarioItem', {});
      setContagem(contag);
      setInventario(invent); */

      const handleContagemInventario = async () => {
        setContagem(JSON.parse(await AsyncStorage.getItem(KEY_CONTAGEM)));
        setInventario(JSON.parse(await AsyncStorage.getItem(KEY_INVENTARIO)));
      }
      handleContagemInventario();

      return () => {
        setProduto({});
        setContagem({});
        setInventario({});
        setImagens([]);
        setQtd(0);
        setLoading(false);
      }
    }, [])

    const handleInventariar = async () => {
      setLoading(true);
      const response = await api.post(`/private/inventario/${inventario.id}`, { 
        produto: parseInt(produto.id), 
        contagem: parseInt(contagem.id), 
        quantidade: parseInt(qtd), 
      }).then(({ data }) => {
        if(data.id) navigation.navigate('Consultar', { contagemItem: contagem, inventarioItem: inventario });
      }).catch(err => {
        Alert.alert('Falha!', err.message);
      }).finally(() => setLoading(false));
    }

    return (
        <ScrollView style={styles.container}>
        <View style={[styles.produto_row, styles.center]}>
          <Icon 
              name={produto.status ? 'ios-checkmark-circle': 'ios-close-circle'} 
              size={25}
              color={ produto.status ? '#008000' : '#A00' } 
              style={{ marginRight: 5 }} 
          />
          <Text style={styles.produto_titulo}>{produto.descricao}</Text>
        </View>
        <View style={[styles.produto_row, styles.center]}>
          <Text style={styles.produto_descricao}>{produto.marca}</Text>
        </View>
        
        <View style={styles.container_produto_image}>
        { (imagens.length > 0) 
          ? <Image source={{ uri: `https://vendas.medicamental.com.br/imagens/${produto.ProdutosImagens[0].imagem}`}} style={styles.produto_image} />
          : <Image source={NoPhoto} style={styles.produto_image} />
        }
        </View>
            <Text style={styles.label}>QUANTIDADE:</Text>
            <TextInput style={styles.txtInput} onChangeText={setQtd} keyboardType='number-pad' autoFocus />
            
            <TouchableOpacity style={styles.button} onPress={handleInventariar} disabled={loading}>
              <Text style={styles.buttonText}>Inventariar</Text>
            </TouchableOpacity>            
            <Modal visible={loading} transparent={true} animationType={'fade'}>
            <View style={styles.loadingContainer}>
              <View style={styles.modalContainer}>
                <ActivityIndicator animating={true} size={50} color="#FFF" />
              </View>
            </View>
          </Modal>
        </ScrollView>
    );
}

Inventario.navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.produtoItem.id} | ${navigation.state.params.produtoItem.local}`,
    headerRight: (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="ios-archive" size={25} color="white" left={20} style={{ marginRight: 10 }} />
        <Text style={{ color: '#FFF', fontSize: 20, marginRight: 10 }}>{navigation.state.params.produtoItem.embalagem}</Text>
      </View>
    )
  });

  export default Inventario;