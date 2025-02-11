import axios from 'axios';

import { makeAutoObservable, runInAction } from 'mobx';

import { Logger } from '@services/logger';

import { TickerContract } from './quotes.contract';

export class QuotesModelStatic {
  private _tickerSymbolsArray: string[] = [];
  private tickers: Map<string, TickerContract> = new Map();

  public error: string | null = null;
  public isLoading = false;
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get tickersArray() {
    return Array.from(this.tickers.values());
  }

  get tickerSymbolsArray() {
    return this._tickerSymbolsArray;
  }

  getTickerBySymbol(symbol: string) {
    const ticker = this.tickers.get(symbol);
    if (!ticker) {
      throw new Error(`Ticker for symbol ${symbol} not found`);
    }
    return ticker;
  }

  startPolling = () => {
    Logger.message('startPolling');
    this.fetchData();
    this.timer = setInterval(this.fetchData, 5000);
  };

  stopPolling = () => {
    Logger.message('stopPolling');
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  fetchData = async () => {
    Logger.message('fetchData');
    if (this.isLoading) {
      Logger.message('fetchData: isLoading');
      return;
    }

    try {
      this.isLoading = true;
      const response = await axios.get(
        'https://futures-api.poloniex.com/api/v2/tickers',
      );

      runInAction(() => {
        response.data.data.forEach((item: any) => {
          let ticker = this.tickers.get(item.symbol);

          if (!ticker) {
            ticker = new TickerContract();
            this.tickers.set(item.symbol, ticker);
            this._tickerSymbolsArray.push(item.symbol);
          }

          ticker.fromData(item);
        });

        this.error = null;
        this.isLoading = false;
      });
    } catch (error) {
      Logger.error(error, {
        method: 'QuotesModel:fetchData',
        message: 'Error fetching data',
      });
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.isLoading = false;
      });
    }
  };

  toJSON = () => {
    return {
      tickers: Array.from(this.tickers.values()).map(ticker => ticker.toJSON()),
      error: this.error,
      isLoading: this.isLoading,
    };
  };

  fromJSON = (cache?: Record<string, any>) => {
    if (!cache) return;

    if (Array.isArray(cache.tickers)) {
      cache.tickers.forEach((ticker: any) => {
        const tickerContract = new TickerContract();
        tickerContract.fromData(ticker);
        this.tickers.set(ticker.symbol, tickerContract);
        this._tickerSymbolsArray.push(ticker.symbol);
      });
    }

    if (typeof cache.error === 'string') {
      this.error = cache.error;
    }

    if (typeof cache.isLoading === 'boolean') {
      this.isLoading = cache.isLoading;
    }
  };

  dispose = () => {
    this.stopPolling();
  };
}
