import { METHODS } from '../communication/methods';
import { TxServiceModel, SendTransactionsArgs, Communicator, SendTransactionsResponse } from '../types';

class TXs {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getBySafeTxHash(safeTxHash: string): Promise<TxServiceModel> {
    try {
      const res = await fetch(`${this.txServiceUrl}/transactions/${safeTxHash}`);
      if (res.status !== 200) {
        throw new Error(
          "Failed to get the transaction. Either safeTxHash is incorrect or transaction hasn't been indexed by the service yet",
        );
      }

      const json = await res.json();

      return json as TxServiceModel;
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

  public setTxServiceUrl(url: string): void {
    this.txServiceUrl = url;
  }
}

export { TXs };
