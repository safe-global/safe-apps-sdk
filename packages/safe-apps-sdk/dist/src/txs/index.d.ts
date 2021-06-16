import { GatewayTransactionDetails, SendTransactionsParams, Communicator, SendTransactionsResponse } from '../types';
declare class TXs {
    private readonly communicator;
    constructor(communicator: Communicator);
    getBySafeTxHash(safeTxHash: string): Promise<GatewayTransactionDetails>;
    send({ txs, params }: SendTransactionsParams): Promise<SendTransactionsResponse>;
}
export { TXs };
