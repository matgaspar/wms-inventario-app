import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';

import config from '../config';

// import { Container } from './styles';

export default function Auth({ navigation }) {

    useEffect(() => {
        _bootstrapAsync = async () => {
            const userLogged = await config.isLogged();
            console.log(userLogged);
            navigation.navigate(userLogged ? 'SignedIn' : 'SignedOut');
        }
        _bootstrapAsync();
    }, [])

  return (
      <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />
    <View
        style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
        }}
    >
        <ActivityIndicator animating={true} size={80} color='#000' />
    </View>
    </>
  );
}
