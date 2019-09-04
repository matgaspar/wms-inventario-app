import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import config from '../../config';
import api from '../../services/api';

function Home({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [inventarios, setInventarios] = useState([]);
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');

    useEffect(() => {
        const handleInventarios = async () => {
            setLoading(true);
            const response = await api.get('/private/inventarios')
                .then(({ data }) => {
                    if(data.success) setInventarios(data.data);
                    else Alert.alert("Falha!", data.error);
                }).catch(err => {
                    Alert.alert("Falha na conexão!", err.message);
                }).finally(() => setLoading(false));
        }
        handleInventarios();

        const getDadosUsuario = async () => {
            const nome = await config.getNome().then(nome => {
                setNome(nome);
            });
            const empresa = config.getEmpresaNome().then(empresa => {
                setEmpresa(empresa);
            });
        }
        getDadosUsuario();
    }, []);

    const handleOpenInventario = inventarioItem => {
        config.setInventario(inventarioItem)
        .finally(() => navigation.navigate('Contagem', { inventarioItem }));
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.bemVindo}>Bem vindo,</Text>
            <TouchableOpacity onPress={() => {}}>
                <Icon name='ios-create' color='#5e5e5e' size={30} />
            </TouchableOpacity>
        </View>
        <View style={styles.card}>
            <Icon name='ios-contact' color='#FFF' size={70} style={styles.cardIcon} />
            <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, styles.cardText]}>{nome}</Text>
                <Text style={styles.cardText}>{empresa}</Text>
            </View>
        </View>
        <Text style={styles.textTitle}>INVENTÁRIOS DISPONÍVEIS</Text>        
        <FlatList
            style={{flex: 1}}
            keyExtractor={(item) => item.id.toString()}
            data={inventarios}
            ListHeaderComponent={ loading && <ActivityIndicator animating={true} color='#000' size={50} /> }
            renderItem={({ item }) => (
                <View>                
                    <TouchableOpacity onPress={() => handleOpenInventario(item)}>
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
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                            {item.nome}
                            </Text>
                            <Icon name='ios-arrow-dropright-circle' color='#003A00' size={30} />
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