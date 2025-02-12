import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { observer } from 'mobx-react';

import { ErrorCell } from '@components/ErrorCell';
import { TableHeader } from '@components/TableHeader';
import { ROW_HEIGHT, TickerRow } from '@components/TickerRow';

import { useViewModel } from '@hooks/model';

import { QuotesViewModel } from './quotes-view.model';

export const QuotesView = observer(() => {
  const viewModel = useViewModel(() => new QuotesViewModel());

  useFocusEffect(
    React.useCallback(() => {
      viewModel.startPolling();
      return () => viewModel.stopPolling();
    }, [viewModel]),
  );

  return (
    <View style={styles.container}>
      {viewModel.error && <ErrorCell error={viewModel.error} />}

      <TableHeader />

      {viewModel.shouldShowLoader && (
        <ActivityIndicator size="large" style={styles.spinner} />
      )}

      <TickerList viewModel={viewModel} />
    </View>
  );
});

const TickerList = observer((props: { viewModel: QuotesViewModel }) => {
  return (
    <FlatList
      data={props.viewModel.tickerSymbols}
      renderItem={({ item }) => (
        <TickerRow item={props.viewModel.getTickerBySymbol(item)} />
      )}
      keyExtractor={symbol => symbol}
      getItemLayout={(_, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  spinner: {
    marginVertical: 20,
  },
});
