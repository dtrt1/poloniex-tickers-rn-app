import { makeAutoObservable } from 'mobx';

import { Main } from '@main';

import { IViewModel } from '@hooks/model';

export class QuotesViewModel implements IViewModel {
  constructor() {
    makeAutoObservable(this);
  }

  get quotesModel() {
    return Main.instance.model.quotesModel;
  }

  get isLoading() {
    return this.quotesModel.isLoading;
  }

  get isEmpty() {
    return this.tickerSymbols.length === 0;
  }

  get shouldShowLoader() {
    return this.isLoading && this.isEmpty;
  }

  get error() {
    return this.quotesModel.error;
  }

  get tickers() {
    return this.quotesModel.tickersArray;
  }

  get tickerSymbols() {
    return this.quotesModel.tickerSymbolsArray;
  }

  getTickerBySymbol(symbol: string) {
    return this.quotesModel.getTickerBySymbol(symbol);
  }

  startPolling = () => {
    this.quotesModel.startPolling();
  };

  stopPolling = () => {
    this.quotesModel.stopPolling();
  };

  destroy() {
    this.stopPolling();
  }
}
