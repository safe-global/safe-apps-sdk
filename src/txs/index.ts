import { TxServiceModel } from './../types';

class TXs {
  #txServiceUrl: string | null = null;

  async getBySafeTxHash(safeTxHash: string): Promise<TxServiceModel> {
    if (!this.#txServiceUrl) {
      throw new Error("ENV information hasn't been synced yet or there was an error during the process");
    }

    const controller = new AbortController();
    const options = {
      method: 'GET',
      signal: controller.signal,
    };
    setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`${this.#txServiceUrl}/transactions/${safeTxHash}`, options);
      const json = await res.json();

      return json as TxServiceModel;
    } catch (err) {
      throw err;
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

    this.#communicator.send(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);
  }

  public setTxServiceUrl(url: string): void {
    this.#txServiceUrl = url;
  }
}

export { TXs };
