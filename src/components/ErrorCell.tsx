import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorCellProps {
  error: string;
}

export const ErrorCell = ({ error }: ErrorCellProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{error}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: '#c62828',
    textAlign: 'center',
  },
});

export default ErrorCell;
