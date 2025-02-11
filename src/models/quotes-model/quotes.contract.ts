import { makeAutoObservable } from 'mobx';

export class TickerContract {
  public symbol: string = '';
  public price: string = '';
  public bestBidPrice: string = '';
  public bestAskPrice: string = '';
  public bestAskSize: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public fromData(data: any) {
    this.symbol = data.symbol || '';
    this.price = data.price || '';
    this.bestBidPrice = data.bestBidPrice || '';
    this.bestAskPrice = data.bestAskPrice || '';
    this.bestAskSize = String(data.bestAskSize) || '';
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
