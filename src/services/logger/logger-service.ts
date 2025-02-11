type Extra = Record<string, any>;

class LoggerService {
  private enabled: boolean = __DEV__;

  message(msg: string, extra?: Extra) {
    this.log('message: ', msg, extra);
  }

  error(err: any, extra?: Extra) {
    this.log('❌ \x1b[41merror\x1b[0m ❌', err, extra);
  }

  debug(msg: string, extra?: Extra) {
    this.log('debug: ', msg, extra);
  }

  private log(...args: any[]) {
    if (!this.enabled) return;

    const filteredArgs = args.filter(arg => arg !== undefined);
    if (filteredArgs.length === 0) return;

    console.log(...filteredArgs);
  }
}

export const Logger = new LoggerService();
