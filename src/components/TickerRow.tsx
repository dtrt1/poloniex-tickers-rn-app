import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { observer } from 'mobx-react';

import type { TickerContract } from '@models/quotes-model';

import { Logger } from '@services/logger';

interface TickerRowProps {
  item: TickerContract;
}

export const TickerRow = observer(({ item }: TickerRowProps) => {
  Logger.message(`re-render symbol: ${item.symbol}`);

  /**
   * TODO: For each cell, implement a more fluid animation using react-native-reanimated,
   *       so that all animations can run on the native thread and avoid blocking the JS thread.
   *       This will provide smoother transitions and better performance overall.
   */

  const prevPrice = useRef(item.price);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (prevPrice.current !== item.price) {
      animatedValue.setValue(1);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      prevPrice.current = item.price;
    }
  }, [item.price, animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FFF9C4'],
  });

  return (
    <Animated.View style={[styles.row, { backgroundColor }]}>
      <Text style={styles.cell}>{item.symbol}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.bestBidPrice}</Text>
      <Text style={styles.cell}>{item.bestAskPrice}</Text>
      <Text style={styles.cell}>{item.bestAskSize}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
