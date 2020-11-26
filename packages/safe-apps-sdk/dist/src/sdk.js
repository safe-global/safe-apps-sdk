"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _communicator;
Object.defineProperty(exports, "__esModule", { value: true });
const communication_1 = require("./communication");
const communication_2 = __importDefault(require("./communication"));
const txs_1 = require("./txs");
const eth_1 = require("./eth");
class SafeAppsSDK {
    constructor(opts = {}) {
        _communicator.set(this, void 0);
        if (typeof window === 'undefined') {
            throw new Error('Error initializing the sdk: window is undefined');
        }
        const { whitelistedDomains = null } = opts;
        __classPrivateFieldSet(this, _communicator, new communication_2.default(whitelistedDomains));
        this.eth = new eth_1.Eth(__classPrivateFieldGet(this, _communicator));
        this.txs = new txs_1.TXs(__classPrivateFieldGet(this, _communicator));
        this.bootstrap();
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            const { txServiceUrl } = yield this.getEnvInfo();
            this.txs.setTxServiceUrl(txServiceUrl);
        });
    }
    getEnvInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield __classPrivateFieldGet(this, _communicator).send(communication_1.METHODS.getEnvInfo, undefined);
            if (!response.success) {
                throw new Error(response.error);
            }
            return response.data;
        });
    }
    getSafeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield __classPrivateFieldGet(this, _communicator).send(communication_1.METHODS.getSafeInfo, undefined);
            if (!response.success) {
                throw new Error(response.error);
            }
            return response.data;
        });
    }
}
_communicator = new WeakMap();
exports.default = SafeAppsSDK;
//# sourceMappingURL=sdk.js.map