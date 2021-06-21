"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Safe = void 0;
const methods_1 = require("../communication/methods");
class Safe {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getInfo() {
        const response = await this.communicator.send(methods_1.Methods.getSafeInfo, undefined);
        return response.data;
    }
    // There is a possibility that this method will change because we may add pagination to the endpoint
    async experimental_getBalances({ currency = 'usd' } = {}) {
        const response = await this.communicator.send(methods_1.Methods.getSafeBalances, {
            currency,
        });
        return response.data;
    }
}
exports.Safe = Safe;
//# sourceMappingURL=index.js.map