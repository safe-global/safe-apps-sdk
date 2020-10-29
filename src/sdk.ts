import { SendTransactionsArgs, Communicator } from './types';
import InterfaceCommunicator, { SDK_MESSAGES } from './communication';
import TXs from './txs';
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
    this.txs = new TXs();
    this.sendInitializationMessage();
  }

  private sendInitializationMessage() {
    this.#communicator.send('SAFE_APP_SDK_INITIALIZED', undefined);
  }

  sendTransactions({ txs, params, requestId }: SendTransactionsArgs): void {
    if (!txs || !txs.length) {
      throw new Error('sendTransactionsWithParams: No transactions were passed');
    }

    const messagePayload = {
      txs,
      params,
    };

    this.#communicator.send(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);
  }
}

export default SDK;
