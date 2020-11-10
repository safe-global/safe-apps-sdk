import { METHODS } from './communication/methods';
import { Communicator, SafeInfo } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';
import pkg from '../package.json';

const sdkVersion = pkg.version;

class SDK {
  #communicator: Communicator;
  public readonly eth;
  public readonly txs;

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    this.#communicator = new InterfaceCommunicator(safeAppUrlsRegExp, sdkVersion);
    this.eth = new Eth(this.#communicator);
    this.txs = new TXs(this.#communicator);
    this.sendInitializationMessage();
  }

  private async sendInitializationMessage() {
    const response = await this.#communicator.send(METHODS.getEnvInfo, undefined);

    console.log({ response });
  }

  async getSafeInfo(): Promise<SafeInfo> {
    const response = await this.#communicator.send(METHODS.getSafeInfo, undefined);

    return response;
  }
}

export default SDK;
