import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Auth from './pages';
import Login from './pages/Login';
import Home from './pages/Home';
import Consultar from './pages/Consultar';
import Camera from './pages/Camera';
import Inventario from './pages/Inventario';
import Produtos from './pages/Produtos';


const SignedInScreens = createStackNavigator(
  {
    Home,
    Consultar,
    Camera,
    Inventario,
    Produtos,
  }, {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitle: 'WMS Inventário',
      headerTintColor: '#FFF',
      headerTitleStyle: { fontWeight: 'bold' },
      headerStyle: {
        backgroundColor: '#000',
      },
    },
    mode: 'modal',
  },
);

const SignedOutScreens = createSwitchNavigator({ Login }, { mode: 'modal' });

const Routes = createAppContainer(
  createSwitchNavigator({
    Auth,
    SignedIn: SignedInScreens,
    SignedOut: SignedOutScreens,
  },
  { initialRouteName: 'Auth' }),
);

export default Routes;
