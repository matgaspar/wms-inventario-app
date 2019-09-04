import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import config from '../config';

// import { Container } from './styles';

export default function Auth({ navigation }) {

    useEffect(() => {
        _bootstrapAsync = async () => {
            const userLogged = await config.isLogged();
            if(userLogged){
                let inventarioItem = await config.getInventario(); // JSON.parse(await AsyncStorage.getItem(KEY_INVENTARIO));
                let contagemItem = await config.getContagem(); // JSON.parse(await AsyncStorage.getItem(KEY_CONTAGEM));
                if(contagemItem)
                    navigation.navigate('Consultar', { contagemItem, inventarioItem });
                else if (inventarioItem)
                    navigation.navigate('Contagem', { inventarioItem });
                else
                    navigation.navigate('SignedIn');
            }else{
                navigation.navigate('SignedOut');
            }
        }
        _bootstrapAsync();
    }, [])

  return (
    <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    }}>
        <ActivityIndicator animating={true} size={100} color='#000' />
    </View>
  );
}
