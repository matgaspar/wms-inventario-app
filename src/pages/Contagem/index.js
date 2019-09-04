import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import config from '../../config';
import api from '../../services/api';

import styles from './styles';

function Contagem({ navigation }) {

    const [contagens, setContagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inventarioItem = navigation.getParam('inventarioItem', {});
        handleGetContagems(inventarioItem);

        return () => {
            setContagens([]);
            setLoading(false);
            console.log('Contagem Desmontado!')
        }
    }, []);
    
    const handleGetContagems = async invent => {
        const response = await api.get(`/private/inventario/${invent.id}/contagem`)
            .then(({ data }) => {
                if(data.success) setContagens(data.data);
                else Alert.alert("Falha!", data.error);
            })
            .catch(err => {
                Alert.alert("Falha na conexão!", err.message);
            })
            .finally(() => setLoading(false));
    }

    const handleOpenContagem = async contagemItem => {
        await config.setContagem(contagemItem)
        .finally(() => navigation.navigate('Consultar', { contagemItem }));
    }

  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>CONTAGENS</Text>        
        <FlatList 
            keyExtractor={(item, idx) => item.descricao}
            data={contagens}
            ListHeaderComponent={ loading && <ActivityIndicator animating={true} color='#000' size={50} /> }
            renderItem={({ item }) => (
                <View style={{flex: 1}}>                
                    <TouchableOpacity onPress={() => handleOpenContagem(item)}>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 20, 
                            borderWidth: 1, 
                            backgroundColor: '#008000',
                            borderColor: '#008000',
                            borderRadius: 10,
                            padding: 15,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{
                            color: '#FFF',
                            fontSize: 25,
                            fontWeight: 'bold',
                        }}>{item.descricao}</Text>
                            <Icon name='ios-arrow-dropright-circle' color='#003A00' size={30} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
  );
}

Contagem.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('inventarioItem', {}).nome,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
      <Icon name="ios-search" size={25} color="white" left={20} style={{ marginRight: 10 }} />
    </TouchableOpacity>
  )
});

export default Contagem;
