import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const AboutView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poloniex Tickers App</Text>
      <Text style={styles.text}>Version 1.0.0</Text>
      <Text style={styles.text}>
        Application for tracking cryptocurrency quotes
      </Text>
      <Text style={styles.text}>
        Author: <Text style={styles.author}>Gleb G.</Text>
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  author: {
    fontWeight: 'bold',
  },
});
