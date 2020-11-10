import { METHODS } from './communication/methods';
import { Communicator, SafeInfo } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';
import fs from 'fs';

// Using require() produces weird build structure as it has to include package.json
// This is a workaround (didn't dive deep, there may be a better solution)
const sdkVersion = JSON.parse(fs.readFileSync('../package.json').toString()).version;

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
