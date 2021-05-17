"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const communication_1 = require("./communication");
const communication_2 = __importDefault(require("./communication"));
const txs_1 = require("./txs");
const eth_1 = require("./eth");
class SafeAppsSDK {
    constructor(opts = {}) {
        if (typeof window === 'undefined') {
            throw new Error('Error initializing the sdk: window is undefined');
        }
        const { whitelistedDomains = null, debug = false } = opts;
        this.communicator = new communication_2.default(whitelistedDomains, debug);
        this.eth = new eth_1.Eth(this.communicator);
        this.txs = new txs_1.TXs(this.communicator);
        this.bootstrap();
    }
    async bootstrap() {
        const { txServiceUrl } = await this.getEnvInfo();
        this.txs.setTxServiceUrl(txServiceUrl);
    }
    async getEnvInfo() {
        const response = await this.communicator.send(communication_1.METHODS.getEnvInfo, undefined);
        if (!response.success) {
            throw new Error(response.error);
        }
        return response.data;
    }
    async getSafeInfo() {
        const response = await this.communicator.send(communication_1.METHODS.getSafeInfo, undefined);
        if (!response.success) {
            throw new Error(response.error);
        }
        return response.data;
    }
}
exports.default = SafeAppsSDK;
//# sourceMappingURL=sdk.js.map