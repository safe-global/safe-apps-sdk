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
var _communicator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eth = void 0;
const constants_1 = require("../eth/constants");
const methods_1 = require("../communication/methods");
const inputFormatters = {
    defaultBlockParam: (arg = 'latest') => arg,
    returnFullTxObjectParam: (arg = false) => arg,
    numberToHex: (arg) => `0x${arg.toString(16)}`,
};
class Eth {
    constructor(communicator) {
        _communicator.set(this, void 0);
        __classPrivateFieldSet(this, _communicator, communicator);
        this.call = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_call,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getBalance = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getBalance,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getCode = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getCode,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getStorageAt = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getStorageAt,
            formatters: [null, inputFormatters.numberToHex, inputFormatters.defaultBlockParam],
        });
        this.getPastLogs = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getLogs,
        });
        this.getBlockByHash = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getBlockByHash,
            formatters: [null, inputFormatters.returnFullTxObjectParam],
        });
        this.getBlockByNumber = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getBlockByNumber,
            formatters: [inputFormatters.numberToHex, inputFormatters.returnFullTxObjectParam],
        });
        this.getTransactionByHash = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getTransactionByHash,
        });
        this.getTransactionReceipt = this.buildRequest({
            call: constants_1.RPC_CALLS.eth_getTransactionReceipt,
        });
    }
    buildRequest({ call, formatters }) {
        return (params) => __awaiter(this, void 0, void 0, function* () {
            if (formatters && Array.isArray(params)) {
                formatters.forEach((formatter, i) => {
                    if (formatter) {
                        params[i] = formatter(params[i]);
                    }
                });
            }
            const payload = {
                call,
                params,
            };
            const response = yield __classPrivateFieldGet(this, _communicator).send(methods_1.METHODS.rpcCall, payload);
            if (!response.success) {
                throw new Error(response.error);
            }
            return response.data;
        });
    }
}
exports.Eth = Eth;
_communicator = new WeakMap();
//# sourceMappingURL=index.js.map