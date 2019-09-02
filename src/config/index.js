import AsyncStorage from '@react-native-community/async-storage';

export const VERSION = '1.0.0';

export const KEY_TOKEN = '@wms:token';
export const KEY_ID = '@wms:id';
export const KEY_EMPRESA = '@wms:empresa';
export const KEY_NOME = '@wms:nome';
export const KEY_SOBRENOME = '@wms:sobrenome';
export const KEY_EMAIL = '@wms:email';
export const KEY_LOGIN = '@wms:login';
export const KEY_AUDITOR = '@wms:auditor';
export const KEY_ADMIN = '@wms:admin';
export const KEY_ATIVO = '@wms:ativo';

const Config = {
  OneSignalAPPID: 'd61dfa82-0769-4bf9-8e01-36e4b49a473b',
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(KEY_TOKEN);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setToken: (token) => {
    try {
      AsyncStorage.setItem(KEY_TOKEN, token);
    } catch (e) {
      console.log(e);
    }
  },
  isLogged: async () => {
    const token = await AsyncStorage.getItem(KEY_TOKEN);
    return token !== null;
  },
  sair: async () => {
    await AsyncStorage.clear();
    return true;
  },
};

export default Config;
