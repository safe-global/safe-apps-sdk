"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Safe = void 0;
const methods_1 = require("../communication/methods");
class Safe {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getInfo() {
        const response = await this.communicator.send(methods_1.METHODS.getSafeInfo, undefined);
        if (!response.success) {
            throw new Error(response.error);
        }
        return response.data;
    }
    async getBalances({ currency = 'usd' }) {
        const response = await this.communicator.send(methods_1.METHODS.getSafeBalances, {
            currency,
        });
        if (!response.success) {
            throw new Error(response.error);
        }
        return response.data;
    }
}
exports.Safe = Safe;
//# sourceMappingURL=index.js.map