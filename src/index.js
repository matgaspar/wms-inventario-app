import React, { useEffect } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import OneSignal from 'react-native-onesignal';

YellowBox.ignoreWarnings([
  'componentWillMount is deprecated',
  'Possible Unhandled Promise Rejection'
])

import Routes from './routes';
import config from './config';

export default function App() {

  useEffect(() => {
    OneSignal.init(config.OneSignalAPPID);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  }, []);

  const onReceived = notification => {
    console.log("Notification received: ", notification);
  }

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  const onIds = device => {
    // console.log('Device info: ', device);
  }

  return (
      <>
      <StatusBar barStyle='light-content' backgroundColor='#000' />
      <Routes />
      </>
  );
}
