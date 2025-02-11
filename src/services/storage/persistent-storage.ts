import { IReactionDisposer, reaction } from 'mobx';

import { Logger } from '@services/logger';

import { AsyncStorageService } from './async-storage';

type JSONValues = boolean | string | number | JSONValues[] | undefined;
export type ToJSONReturnType = {
  [ket: string]: JSONValues | ToJSONReturnType | ToJSONReturnType[];
} | null;

type StorageAdapter = {
  read: (name: string) => Promise<Record<string, any> | null>;
  write: (name: string, data: Record<string, any> | null) => Promise<void>;
};

export type PersistentModel = {
  fromJSON: (cache?: Record<string, any>) => void;
  toJSON: () => ToJSONReturnType;
};

export class PersistentStorageStatic {
  private name: string = 'appcache';

  private _disposers: IReactionDisposer[] = [];
  private storageAdapter: StorageAdapter = {
    read: AsyncStorageService.read,
    write: AsyncStorageService.write,
  };
  constructor(storageAdapter?: StorageAdapter) {
    if (storageAdapter) {
      this.storageAdapter = storageAdapter;
    }
  }

  public async persist(model: PersistentModel) {
    const isCacheExists = await this.readFromStorage(model);

    this._disposers.push(
      reaction(
        () => model.toJSON(),
        data => this.writeToStorage(data),
        {
          delay: 1000,
          fireImmediately: true,
        },
      ),
    );

    return isCacheExists;
  }

  private writeToStorage(data: ToJSONReturnType | null): void {
    this.storageAdapter.write(this.name, data);
    if (__DEV__) {
      console.log('Debug writeToStorage data: ', data);
    }
  }

  private async readFromStorage(model: PersistentModel) {
    try {
      const data = await this.storageAdapter.read(this.name);

      if (data) {
        model.fromJSON(data);
        if (__DEV__) {
          console.log('Debug readFromStorage data: ', data);
        }
        return true;
      }
    } catch (error) {
      Logger.error(error, { method: 'PersistentStorage.readFromStorage' });
    }

    return false;
  }

  public dispose() {
    this._disposers.forEach(dispose => dispose());
    this._disposers = [];
  }
}
