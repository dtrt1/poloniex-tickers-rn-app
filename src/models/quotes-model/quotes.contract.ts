import { makeAutoObservable } from 'mobx';

import { formatNumber } from '@utils/format';

export class TickerContract {
  public symbol: string = '';
  public price: number = 0;
  public bestBidPrice: number = 0;
  public bestAskPrice: number = 0;
  public bestAskSize: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public fromData(data: any) {
    this.symbol = data.symbol || '';
    this.price = formatNumber(data.price) || 0;
    this.bestBidPrice = formatNumber(data.bestBidPrice) || 0;
    this.bestAskPrice = formatNumber(data.bestAskPrice) || 0;
    this.bestAskSize = formatNumber(data.bestAskSize) || 0;
  }

  public toJSON() {
    return {
      symbol: this.symbol,
      price: this.price,
      bestBidPrice: this.bestBidPrice,
      bestAskPrice: this.bestAskPrice,
      bestAskSize: this.bestAskSize,
    };
  }
}
