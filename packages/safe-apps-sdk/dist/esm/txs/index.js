import { Methods } from '../communication/methods.js';
import { isObjectEIP712TypedData, } from '../types/index.js';
class TXs {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getBySafeTxHash(safeTxHash) {
        if (!safeTxHash) {
            throw new Error('Invalid safeTxHash');
        }
        const response = await this.communicator.send(Methods.getTxBySafeTxHash, { safeTxHash });
        return response.data;
    }
    async signMessage(message) {
        const messagePayload = {
            message,
        };
        const response = await this.communicator.send(Methods.signMessage, messagePayload);
        return response.data;
    }
    async signTypedMessage(typedData) {
        if (!isObjectEIP712TypedData(typedData)) {
            throw new Error('Invalid typed data');
        }
        const response = await this.communicator.send(Methods.signTypedMessage, { typedData });
        return response.data;
    }
    async send({ txs, params }) {
        if (!txs || !txs.length) {
            throw new Error('No transactions were passed');
        }
        const messagePayload = {
            txs,
            params,
        };
        const response = await this.communicator.send(Methods.sendTransactions, messagePayload);
        return response.data;
    }
}
export { TXs };
//# sourceMappingURL=index.js.map