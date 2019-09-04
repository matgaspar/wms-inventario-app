import AsyncStorage from '@react-native-community/async-storage';

export const VERSION = '1.0.0';

export const KEY_TOKEN = '@wms:token';
export const KEY_EMPRESA_ID = '@wms:empresa';
export const KEY_EMPRESA_NOME = '@wms:nome_empresa';
export const KEY_USUARIO_ID = '@wms:id';
export const KEY_USUARIO_NOME = '@wms:nome';
export const KEY_USUARIO_SOBRENOME = '@wms:sobrenome';
export const KEY_USUARIO_EMAIL = '@wms:email';
export const KEY_USUARIO_LOGIN = '@wms:login';
export const KEY_USUARIO_AUDITOR = '@wms:auditor';
export const KEY_USUARIO_ADMIN = '@wms:admin';
export const KEY_USUARIO_ATIVO = '@wms:ativo';

export const KEY_INVENTARIO = '@wms:inventario';
export const KEY_CONTAGEM = '@wms:contagem';

export const KEY_PERMISSAO_CAMERA = '@wms:permissao_camera';

const Config = {
  OneSignalAPPID: 'd61dfa82-0769-4bf9-8e01-36e4b49a473b',
  getPermissaoCamera: async () => {
    try {
      return Boolean(await AsyncStorage.getItem(KEY_PERMISSAO_CAMERA));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUsuarioId: async () => {
    try {
      return await AsyncStorage.getItem(KEY_USUARIO_ID);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getEmpresaId: async () => {
    try {
      return await AsyncStorage.getItem(KEY_EMPRESA_ID);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(KEY_TOKEN);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getInventario: async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem(KEY_INVENTARIO));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getContagem: async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem(KEY_CONTAGEM));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getNome: async () => {
    try {
      return await AsyncStorage.getItem(KEY_USUARIO_NOME);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getEmpresaNome: async () => {
    try {
      return await AsyncStorage.getItem(KEY_EMPRESA_NOME);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getLogin: async () => {
    try {
      return await AsyncStorage.getItem(KEY_USUARIO_LOGIN);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getAuditor: async () => {
    try {
      return Boolean(await AsyncStorage.getItem(KEY_USUARIO_AUDITOR));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getAdmin: async () => {
    try {
      return Boolean(await AsyncStorage.getItem(KEY_USUARIO_ADMIN));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getAtivo: async () => {
    try {
      return Boolean(await AsyncStorage.getItem(KEY_USUARIO_ATIVO));
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  setPermissaoCamera: async (permissao) => {
    try {
      await AsyncStorage.setItem(KEY_PERMISSAO_CAMERA, permissao);
    } catch (e) {
      console.log(e);
    }
  },

  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(KEY_TOKEN, token);
    } catch (e) {
      console.log(e);
    }
  },
  setUsuario: async (usuario) => {
    try {
      await AsyncStorage.setItem(KEY_USUARIO_ID, String(usuario.id));
      await AsyncStorage.setItem(KEY_USUARIO_NOME, usuario.nome);
      if (usuario.email) await AsyncStorage.setItem(KEY_USUARIO_EMAIL, usuario.email);
      await AsyncStorage.setItem(KEY_USUARIO_LOGIN, usuario.login);
      if (usuario.auditor) await AsyncStorage.setItem(KEY_USUARIO_AUDITOR, String(Boolean(usuario.auditor)));
      if (usuario.admin) await AsyncStorage.setItem(KEY_USUARIO_ADMIN, String(Boolean(usuario.admin)));
      await AsyncStorage.setItem(KEY_USUARIO_ATIVO, String(Boolean(usuario.ativo)));
    } catch (e) {
      console.log(e);
    }
  },
  setEmpresa: async (empresa) => {
    try {
      await AsyncStorage.setItem(KEY_EMPRESA_ID, String(empresa.id));
      await AsyncStorage.setItem(KEY_EMPRESA_NOME, empresa.nome);
    } catch (e) {
      console.log(e);
    }
  },
  setInventario: async (inventario) => {
    try {
      await AsyncStorage.setItem(KEY_INVENTARIO, JSON.stringify(inventario));
    } catch (e) {
      console.log(e);
    }
  },
  setContagem: async (contagem) => {
    try {
      await AsyncStorage.setItem(KEY_CONTAGEM, JSON.stringify(contagem));
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
