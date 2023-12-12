"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./communication/index.js"));
const index_js_2 = require("./txs/index.js");
const index_js_3 = require("./eth/index.js");
const index_js_4 = require("./safe/index.js");
const index_js_5 = require("./wallet/index.js");
class SafeAppsSDK {
    constructor(opts = {}) {
        const { allowedDomains = null, debug = false } = opts;
        this.communicator = new index_js_1.default(allowedDomains, debug);
        this.eth = new index_js_3.Eth(this.communicator);
        this.txs = new index_js_2.TXs(this.communicator);
        this.safe = new index_js_4.Safe(this.communicator);
        this.wallet = new index_js_5.Wallet(this.communicator);
    }
}
exports.default = SafeAppsSDK;
//# sourceMappingURL=sdk.js.map