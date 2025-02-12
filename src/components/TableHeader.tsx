import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ROW_HEIGHT } from './TickerRow';

export const TableHeader = () => (
  <View style={styles.headerRow}>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellText}>Символ</Text>
    </View>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellText}>Цена</Text>
    </View>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellText}>Бид</Text>
    </View>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellText}>Аск</Text>
    </View>
    <View style={[styles.headerCell, styles.lastCell]}>
      <Text style={styles.headerCellText}>Объем</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  lastCell: {
    borderRightWidth: 0,
  },
  headerCellText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
