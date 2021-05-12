"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TXs = void 0;
const methods_1 = require("../communication/methods");
class TXs {
    constructor(communicator) {
        this.txServiceUrl = null;
        this.communicator = communicator;
    }
    async getBySafeTxHash(safeTxHash) {
        if (!this.txServiceUrl) {
            throw new Error("ENV information hasn't been synced yet or there was an error during the process");
        }
        const controller = new AbortController();
        const options = {
            method: 'GET',
            signal: controller.signal,
        };
        setTimeout(() => controller.abort(), 10000);
        try {
            const res = await fetch(`${this.txServiceUrl}/transactions/${safeTxHash}`, options);
            if (res.status !== 200) {
                throw new Error("Failed to get the transaction. Either safeTxHash is incorrect or transaction hasn't been indexed by the service yet");
            }
            const json = await res.json();
            return json;
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
    setTxServiceUrl(url) {
        this.txServiceUrl = url;
    }
}
exports.TXs = TXs;
//# sourceMappingURL=index.js.map