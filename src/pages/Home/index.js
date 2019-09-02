import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import config, { KEY_NOME } from '../../config';
import api from '../../services/api';

function Home({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [inventarios, setInventarios] = useState([]);
    const [nome, setNome] = useState('');

    useEffect(() => {
        const handleInventarios = async () => {
            try{
            setLoading(true);
            const response = await api.get('/private/inventarios')
            .then(({ data }) => {
                if(data.success){
                    setInventarios(data.data);
                    setLoading(false);
                }
            }).catch(err => {
                setLoading(false);
                Alert.alert("Falha na conexão!", err.message);
            });
            }catch(err){
                Alert.alert("Alerta!", err.message);
            }
        }
        handleInventarios();

        const getDadosUsuario = async () => {
            const nome = await AsyncStorage.getItem(KEY_NOME);
            setNome(String(nome));
        }
        getDadosUsuario();
    }, []);

    const handleOpenInventario = inventarioItem => {
        navigation.navigate('Consultar', { inventarioItem });
    }

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Bem vindo, {nome}</Text>
        <Text style={[styles.text, { alignSelf: 'center', fontWeight: 'bold' }]}>INVENTÁRIOS</Text>        
        <FlatList 
            keyExtractor={(item) => item.id.toString()}
            data={inventarios}
            ListHeaderComponent={ loading && <ActivityIndicator animating={true} color='#000' size={50} /> }
            renderItem={({ item }) => (
                <View style={{flex: 1}}>                
                    <TouchableOpacity onPress={() => handleOpenInventario(item)}>
                        <View style={{ 
                            flexDirection: 'row',
                            marginTop: 30, 
                            borderWidth: 1, 
                            backgroundColor: '#000',
                            borderColor: '#000',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{
                            color: '#FFF',
                            fontSize: 30,
                            fontWeight: 'bold',
                            marginRight: 10,
                        }}>{item.nome}</Text>
                            <Icon name='ios-archive' color='#FFF' size={30} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
  );
}

Home.navigationOptions = ({ navigation }) => ({
    headerTitle: "WMS INVENTÁRIO",
    headerRight: (
        <TouchableOpacity onPress={ () => config.sair().then(out => out && navigation.navigate('Auth'))}>
            <Icon name="ios-exit" size={30} color="white" left={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
    )
});

export default Home;