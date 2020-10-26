import { SendTransactionsArgs } from './types';
import { sendMessageToInterface, SDK_MESSAGES } from './communication';
import { txs as txsMethods } from './txs';
import { eth as ethMethods } from './eth';

class SDK {
  readonly config = {
    allowedOrigins: [
      /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
      /https?:\/\/localhost:\d+/, // Safe Multisig desktop app
    ],
  };
  public readonly txs = { ...txsMethods };
  public readonly eth = { ...ethMethods };

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    this.config.allowedOrigins.push(...safeAppUrlsRegExp);

    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }
  }

  sendTransactions({ txs, params, requestId }: SendTransactionsArgs): void {
    if (!txs || !txs.length) {
      throw new Error('sendTransactionsWithParams: No transactions were passed');
    }

    const messagePayload = {
      txs,
      params,
    };

    sendMessageToInterface(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);
  }
}

export default SDK;
