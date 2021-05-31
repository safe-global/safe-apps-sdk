import { METHODS } from '../communication/methods';
import {
  TxServiceModel,
  SendTransactionsArgs,
  GetTxBySafeTxHashParams,
  Communicator,
  SendTransactionsResponse,
} from '../types';

class TXs {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getBySafeTxHash(safeTxHash: string): Promise<TxServiceModel> {
    if (!safeTxHash) {
      throw new Error('Invalid safeTxHash');
    }

    try {
      const response = await this.communicator.send<'getTxBySafeTxHash', GetTxBySafeTxHashParams, TxServiceModel>(
        METHODS.getTxBySafeTxHash,
        { safeTxHash },
      );

      if (!response.success) {
        throw new Error(response.error);
      }

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async send({ txs, params }: SendTransactionsArgs): Promise<SendTransactionsResponse> {
    if (!txs || !txs.length) {
      throw new Error('No transactions were passed');
    }

    const messagePayload = {
      txs,
      params,
    };

    const response = await this.communicator.send<'sendTransactions', SendTransactionsArgs, SendTransactionsResponse>(
      METHODS.sendTransactions,
      messagePayload,
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export { TXs };
