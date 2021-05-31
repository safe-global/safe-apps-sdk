"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TXs = void 0;
const methods_1 = require("../communication/methods");
class TXs {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getBySafeTxHash(safeTxHash) {
        if (!safeTxHash) {
            throw new Error('Invalid safeTxHash');
        }
        try {
            const response = await this.communicator.send(methods_1.METHODS.getTxBySafeTxHash, { safeTxHash });
            if (!response.success) {
                throw new Error(response.error);
            }
            return response.data;
        }
        catch (err) {
            throw err;
        }
    }
    async send({ txs, params }) {
        if (!txs || !txs.length) {
            throw new Error('No transactions were passed');
        }
        const messagePayload = {
            txs,
            params,
        };
        const response = await this.communicator.send(methods_1.METHODS.sendTransactions, messagePayload);
        if (!response.success) {
            throw new Error(response.error);
        }
        return response.data;
    }
}
exports.TXs = TXs;
//# sourceMappingURL=index.js.map