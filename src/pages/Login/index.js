import React, { useEffect, useState } from 'react';
import { Alert, View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Modal, 
  ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import Picker from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';

import styles from './styles';
import config from '../../config';

export default Login = ({ navigation }) => {

const [loading, setLoading] = useState(true);
const [login, setLogin] = useState('antonio');
const [senha, setSenha] = useState('123');
const [empresas, setEmpresas] = useState([]);
const [empresa, setEmpresa] = useState(1);
const [showPass, setShowPass] = useState(false);

const handleLogin = async () => {
  try{
    if (empresa && login && senha){
      setLoading(true);
      const data = await api.post('/login', { empresa, login, senha })
      .then(async ({ data }) => {
        if(data.success){
          await config.setToken(data.token);
          await config.setUsuario(data.usuario);
          await config.setEmpresa(data.usuario.Empresas[0]);
        }else{
          Alert.alert('Falha!', data.error);
        }
        setLoading(false);
        return data.success;
      })
      .then(data => {
        if(data) navigation.navigate('SignedIn');
      });
    }else{
      Alert.alert('Atenção!', 'Preencha todos os campos necessários!');
    }
  } catch(err){
    setLoading(false);
    Alert.alert('Falha!', err.message);
  }
}

useEffect(() => {
  const handleEmpresas = async () => {
    try{
      const response = await api.get('/public/empresas')
      .then(({ data }) => {
        if(data.success){
          const emp = [];
          data.data.map(empresa => {
            const { nome, id } = empresa;
            emp.push({ label: nome, value: parseInt(id) });
          });
          setEmpresas(emp);
          setLoading(false);
        }else{
          setLoading(false);
        }
      });
    }catch(err){
      setLoading(false);
      Alert.alert('Falha na conexão', err.message);
    }
  }
  handleEmpresas();

  return () => {
    setLoading(false);
  }
}, []);

  return (
    <>
    <StatusBar backgroundColor='#001844' barStyle='light-content' />
    <View style={styles.container}>
      <View style={{ paddingVertical: 70, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 50, color: '#FFF', fontWeight: 'bold' }}>WEB7 ONLINE</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='ios-archive' color='#FFF' size={40} />
          <Text style={{ marginLeft: 10, fontSize: 30, color: '#FFF' }}>WMS INVENTÁRIO</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>EMPRESA</Text>
        <Picker 
          style={pickerSelectStyles}
          // useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'SELECIONE A EMPRESA', value: 0 }}
          items={empresas}
          value={empresa}
          onValueChange={val => setEmpresa(val)}
        />
        <Text style={styles.label}>LOGIN</Text>
        <TextInput style={styles.txtInput} value={login} onChangeText={setLogin} />
        <Text style={styles.label}>SENHA</Text>
        <View style={{ justifyContent: 'center' }}>
          <TextInput value={senha} secureTextEntry={!showPass} style={[styles.txtInput, {position: 'relative'}]} onChangeText={setSenha} />
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, bottom: 20 }}>
            <Icon name={showPass ? 'ios-eye' : 'ios-eye-off'} color='#FFF' size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>CONECTAR</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={loading} transparent={true} animationType={'fade'}>
        <View style={styles.loadingContainer}>
          <View style={styles.modalContainer}>
            <ActivityIndicator animating={true} size={50} color="#000" />
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    color: '#FFF',
    marginBottom: 10,
  },
  inputAndroid: {
    // borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    color: '#FFF',
    marginBottom: 10,
  },
});