import { SendTransactionsArgs } from './types';
import InterfaceCommunicator, { SDK_MESSAGES } from './communication';
import { txs as txsMethods } from './txs';
import { eth as ethMethods } from './eth';

class SDK {
  private communicator;

  public readonly txs = { ...txsMethods };
  public readonly eth = { ...ethMethods };

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    this.communicator = new InterfaceCommunicator(safeAppUrlsRegExp);
  }

  sendTransactions({ txs, params, requestId }: SendTransactionsArgs): void {
    if (!txs || !txs.length) {
      throw new Error('sendTransactionsWithParams: No transactions were passed');
    }

    const messagePayload = {
      txs,
      params,
    };

    this.communicator.send(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);
  }
}

export default SDK;
