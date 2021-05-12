import { TxServiceModel, SendTransactionsArgs, Communicator, SendTransactionsResponse } from '../types';
declare class TXs {
    private txServiceUrl;
    private readonly communicator;
    constructor(communicator: Communicator);
    getBySafeTxHash(safeTxHash: string): Promise<TxServiceModel>;
    send({ txs, params }: SendTransactionsArgs): Promise<SendTransactionsResponse>;
    setTxServiceUrl(url: string): void;
}
export { TXs };
