import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TableHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerCell}>Символ</Text>
    <Text style={styles.headerCell}>Цена</Text>
    <Text style={styles.headerCell}>Бид</Text>
    <Text style={styles.headerCell}>Аск</Text>
    <Text style={styles.headerCell}>Объем</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
