import { Methods } from '../communication/methods';
import {
  GatewayTransactionDetails,
  SignMessageParams,
  SendTransactionsParams,
  GetTxBySafeTxHashParams,
  Communicator,
  SendTransactionsResponse,
} from '../types';

class TXs {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getBySafeTxHash(safeTxHash: string): Promise<GatewayTransactionDetails> {
    if (!safeTxHash) {
      throw new Error('Invalid safeTxHash');
    }

    const response = await this.communicator.send<
      Methods.getTxBySafeTxHash,
      GetTxBySafeTxHashParams,
      GatewayTransactionDetails
    >(Methods.getTxBySafeTxHash, { safeTxHash });

    return response.data;
  }

  async signMessage(message: string): Promise<SendTransactionsResponse> {
    const messagePayload = {
      message,
    };

    const response = await this.communicator.send<Methods.signMessage, SignMessageParams, SendTransactionsResponse>(
      Methods.signMessage,
      messagePayload,
    );

    return response.data;
  }

  async send({ txs, params }: SendTransactionsParams): Promise<SendTransactionsResponse> {
    if (!txs || !txs.length) {
      throw new Error('No transactions were passed');
    }

    const messagePayload = {
      txs,
      params,
    };

    const response = await this.communicator.send<
      Methods.sendTransactions,
      SendTransactionsParams,
      SendTransactionsResponse
    >(Methods.sendTransactions, messagePayload);

    return response.data;
  }
}

export { TXs };
