import type { IRootModel } from '@models/root-model';

import { Logger } from '@services/logger';

type Config = {
  model: IRootModel;
};

export class Main {
  private static _instance: Main | undefined;

  public static get instance(): Main {
    if (!Main._instance) {
      Main._instance = new Main();
    }

    return Main._instance;
  }

  private _model: IRootModel | undefined;

  public get model(): IRootModel {
    if (!this._model) {
      throw new Error('Main:bootstrap:error - model is missing');
    }

    return this._model;
  }

  constructor() {}

  public async bootstrap({ model }: Config) {
    Logger.message('Main - bootstrap', model);
    this._model = model;
  }

  public async onAppLaunch() {
    try {
      Logger.message('Main - onAppLaunch');
      await this.model.init();
    } catch (error) {
      Logger.error(error, { method: 'Main.onAppLaunch' });
    }

    try {
      await this.start();
    } catch (error) {
      Logger.error(error, { method: 'Main.onAppLaunch.start' });
    }
  }

  private async start() {
    await this.model.fetchMainData();
  }

  public dispose() {
    Logger.message('Main - dispose');
    if (this.model) this.model.dispose();
  }
}
