import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { observer } from 'mobx-react';

import type { TickerContract } from '@models/quotes-model';

import { Logger } from '@services/logger';

import { TickerCell } from './TickerCell';

export const ROW_HEIGHT = 40;

interface TickerRowProps {
  item: TickerContract;
}

export const TickerRow = observer(({ item }: TickerRowProps) => {
  Logger.message(`re-render row: ${item.symbol}`);

  return (
    <View style={styles.row}>
      {/* Symbol */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.symbol}</Text>
      </View>

      {/* Other columns use TickerCell for animations */}
      <TickerCell item={item} type="price" containerStyle={styles.cell} />
      <TickerCell
        item={item}
        type="bestBidPrice"
        containerStyle={styles.cell}
      />
      <TickerCell
        item={item}
        type="bestAskPrice"
        containerStyle={styles.cell}
      />
      <TickerCell
        item={item}
        type="bestAskSize"
        containerStyle={[styles.cell, styles.lastCell]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEE',
  },
  lastCell: {
    borderRightWidth: 0,
  },
  cellText: {
    textAlign: 'center',
  },
});
