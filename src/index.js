import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'componentWillMount is deprecated',
  'Possible Unhandled Promise Rejection'
])

import Routes from './routes';

export default function App() {
  return (
      <>
      <StatusBar barStyle='light-content' backgroundColor='#000' />
      <Routes />
      </>
  );
}
