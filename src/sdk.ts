import { Communicator } from './types';
import InterfaceCommunicator, { SDK_MESSAGES } from './communication';
import { TXs } from './txs';
import { Eth } from './eth';

class SDK {
  #communicator: Communicator;
  public readonly eth;
  public readonly txs;

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    this.#communicator = new InterfaceCommunicator(safeAppUrlsRegExp);
    this.eth = new Eth(this.#communicator);
    this.txs = new TXs(this.#communicator);
    this.sendInitializationMessage();
  }

  private sendInitializationMessage() {
    this.#communicator.send('SAFE_APP_SDK_INITIALIZED', undefined);
  }
}

export default SDK;
