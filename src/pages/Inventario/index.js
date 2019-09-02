import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';
import styles from './styles';
import NoPhoto from '../../assets/noPhoto.png';

function Inventario({ navigation }) {

    const [produto, setProduto] = useState({});
    const [qtd, setQtd] = useState({});

    useEffect(() => {      
      const prod = navigation.getParam('produto', {});
      setProduto(prod);
    }, [])

    const handleInventariar = async () => {
      const { id, ...product } = produto;
      product.inventariado += parseInt(qtd);
      console.log(product);
      // const response = await api.put(`https://api.web7online.com/produtos/${id}`, product);
      // console.log(response.data);
    }

    return (
        <ScrollView style={styles.container}>
        <View style={[styles.produto_row, styles.center]}>
          <Icon 
              name={produto.status === 'Ativo' ? 'ios-checkmark-circle': 'ios-close-circle'} 
              size={25}
              color={ produto.status === 'Ativo' ? '#008000' : '#A00' } 
              style={{ marginRight: 5 }} 
          />
          <Text style={styles.produto_titulo}>{produto.descricao}</Text>
        </View>
        <View style={[styles.produto_row, styles.center]}>
          <Text style={styles.produto_descricao}>{produto.marca}</Text>
        </View>
        
        <View style={styles.container_produto_image}>
        { produto.imagem 
          ? <Image source={{ uri: `https://vendas.medicamental.com.br/imagens/${produto.imagem}`}} style={styles.produto_image} />
          : <Image source={NoPhoto} style={styles.produto_image} />
        }
        </View>
            <Text style={styles.label}>QUANTIDADE:</Text>
            <TextInput style={styles.txtInput} onChangeText={setQtd} keyboardType='number-pad' autoFocus />
            
            <TouchableOpacity style={styles.button} onPress={handleInventariar}>
              <Text style={styles.buttonText}>Inventariar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

Inventario.navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.produto.id} | ${navigation.state.params.produto.local}`,
    headerRight: (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="ios-archive" size={25} color="white" left={20} style={{ marginRight: 10 }} />
        <Text style={{ color: '#FFF', fontSize: 20, marginRight: 10 }}>{navigation.state.params.produto.embalagem}</Text>
      </View>
    )
  });

  export default Inventario;