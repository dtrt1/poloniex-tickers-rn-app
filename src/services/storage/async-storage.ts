import AsyncStorage from '@react-native-async-storage/async-storage';

import { Logger } from '@services/logger';

class AsyncStorageStatic {
  private readonly path = 'localdata_';

  read = async <T>(name: string): Promise<T | null> => {
    try {
      const fullPath = this.path + name;
      const value = await AsyncStorage.getItem(fullPath);

      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      Logger.error(error, { method: 'AsyncStorage.read' });
      throw error;
    }
  };

  write = async <T>(name: string, data: T) => {
    try {
      const fullPath = this.path + name;

      await AsyncStorage.setItem(fullPath, JSON.stringify(data));
    } catch (error) {
      Logger.error(error, { method: 'AsyncStorage.write' });
      throw error;
    }
  };
}

export const AsyncStorageService = new AsyncStorageStatic();
