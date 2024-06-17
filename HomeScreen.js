import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Network from 'expo-network';

const HomeScreen = () => {
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const networkState = await Network.getNetworkStateAsync();
      setNetworkInfo(networkState);
    })();
  }, []);

  const getNetworkType = () => {
    if (networkInfo) {
      return networkInfo.type;
    }
    return 'Desconocido';
  };

  const isSecureNetwork = () => {
    if (networkInfo) {
      return !networkInfo.isInternetReachable || !networkInfo.isWifi || networkInfo.details && networkInfo.details.security !== 'None';
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Información de la red:</Text>
      <Text style={styles.text}>Tipo de red: {getNetworkType()}</Text>
      <Text style={styles.text}>Es una red segura: {isSecureNetwork() ? 'Sí' : 'No'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
