import { IReactionDisposer, makeAutoObservable } from 'mobx';

import { QuotesModelStatic } from '@models/quotes-model';

import { Logger } from '@services/logger';
import { PersistentStorageStatic } from '@services/storage';

class RootModelStatic {
  public disposers: IReactionDisposer[] = [];

  public readonly quotesModel = new QuotesModelStatic();

  public readonly persistentStorage = new PersistentStorageStatic();

  constructor() {
    makeAutoObservable(this);
  }

  public toJSON() {
    try {
      return {
        quotesModel: this.quotesModel.toJSON(),
      };
    } catch (e) {
      Logger.error(e, { method: 'RootModelStatic.toJSON' });
      return null;
    }
  }

  public fromJSON(cache?: Record<string, any>) {
    if (!cache) {
      return;
    }

    if (cache.quotesModel) {
      this.quotesModel.fromJSON(cache.quotesModel);
    }
  }

  public async init() {
    try {
      await this.persistentStorage.persist(this);
    } catch (error) {
      Logger.error(error, { method: 'RootModelStatic.init' });
    }
  }

  public async fetchMainData() {
    try {
      // await this.authenticationModel.refreshAccessToken();
    } catch (error) {
      Logger.error(error, { method: 'RootModel.fetchMainData' });
      throw error;
    }
  }

  public dispose() {
    this.persistentStorage.dispose();
    this.disposers.forEach(dispose => dispose());
    this.disposers = [];
  }
}

export const RootModel = new RootModelStatic();

export type IRootModel = typeof RootModel;
