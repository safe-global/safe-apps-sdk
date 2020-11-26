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
var _txServiceUrl, _communicator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TXs = void 0;
const methods_1 = require("../communication/methods");
class TXs {
    constructor(communicator) {
        _txServiceUrl.set(this, null);
        _communicator.set(this, void 0);
        __classPrivateFieldSet(this, _communicator, communicator);
    }
    getBySafeTxHash(safeTxHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _txServiceUrl)) {
                throw new Error("ENV information hasn't been synced yet or there was an error during the process");
            }
            const controller = new AbortController();
            const options = {
                method: 'GET',
                signal: controller.signal,
            };
            setTimeout(() => controller.abort(), 10000);
            try {
                const res = yield fetch(`${__classPrivateFieldGet(this, _txServiceUrl)}/transactions/${safeTxHash}`, options);
                const json = yield res.json();
                return json;
            }
            catch (err) {
                throw err;
            }
        });
    }
    send({ txs, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txs || !txs.length) {
                throw new Error('No transactions were passed');
            }
            const messagePayload = {
                txs,
                params,
            };
            const response = yield __classPrivateFieldGet(this, _communicator).send(methods_1.METHODS.sendTransactions, messagePayload);
            if (!response.success) {
                throw new Error(response.error);
            }
            return response.data;
        });
    }
    setTxServiceUrl(url) {
        __classPrivateFieldSet(this, _txServiceUrl, url);
    }
}
exports.TXs = TXs;
_txServiceUrl = new WeakMap(), _communicator = new WeakMap();
//# sourceMappingURL=index.js.map