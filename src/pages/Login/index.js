import React, { useEffect, useState } from 'react';
import { Alert, View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Modal, 
  ActivityIndicator, StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import styles from './styles';
import config, { 
  KEY_ID, KEY_NOME, KEY_EMAIL, KEY_LOGIN, KEY_AUDITOR, 
  KEY_ADMIN, KEY_ATIVO, KEY_EMPRESA 
} from '../../config';

export default Login = ({ navigation }) => {

const [loading, setLoading] = useState(true);
const [login, setLogin] = useState('matheus');
const [senha, setSenha] = useState('123');
const [empresas, setEmpresas] = useState([]);
const [empresa, setEmpresa] = useState(0);
const [showPass, setShowPass] = useState(false);

const handleLogin = async () => {
  try{
    if (empresa && login && senha){
      setLoading(true);
      const data = await api.post('/login', { empresa, login, senha })
      .then(({data}) => {
        if(data.success){
          config.setToken(data.token);
          AsyncStorage.setItem(KEY_EMPRESA, empresa);
          AsyncStorage.setItem(KEY_ID, data.usuario.id);
          AsyncStorage.setItem(KEY_NOME, data.usuario.nome);
          AsyncStorage.setItem(KEY_LOGIN, data.usuario.login);
          AsyncStorage.setItem(KEY_EMAIL, data.usuario.email);
          AsyncStorage.setItem(KEY_AUDITOR, data.usuario.auditor);
          AsyncStorage.setItem(KEY_ADMIN, data.usuario.admin);
          AsyncStorage.setItem(KEY_ATIVO, data.usuario.ativo);
        }else{
          Alert.alert('Falha!', data.error);
        }
        setLoading(false);
        return data.success;
      })
      .then(data => data && navigation.navigate('SignedIn'))
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
            emp.push({ label: nome, value: id });
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
}, []);

const showPassword = () => {
  setShowPass(!showPass);
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
          useNativeAndroidPickerStyle={false}
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
          <TouchableOpacity onPress={showPassword} style={{ position: 'absolute', right: 0, bottom: 20 }}>
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
    </KeyboardAvoidingView>
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