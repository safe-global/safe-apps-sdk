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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.__esModule = true;
exports.TXs = void 0;
var methods_1 = require("../communication/methods");
var TXs = /** @class */ (function () {
    function TXs(communicator) {
        _txServiceUrl.set(this, null);
        _communicator.set(this, void 0);
        __classPrivateFieldSet(this, _communicator, communicator);
    }
    TXs.prototype.getBySafeTxHash = function (safeTxHash) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, options, res, json, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!__classPrivateFieldGet(this, _txServiceUrl)) {
                            throw new Error("ENV information hasn't been synced yet or there was an error during the process");
                        }
                        controller = new AbortController();
                        options = {
                            method: 'GET',
                            signal: controller.signal
                        };
                        setTimeout(function () { return controller.abort(); }, 10000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(__classPrivateFieldGet(this, _txServiceUrl) + "/transactions/" + safeTxHash, options)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _a.sent();
                        return [2 /*return*/, json];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TXs.prototype.send = function (_a) {
        var txs = _a.txs, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var messagePayload, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!txs || !txs.length) {
                            throw new Error('No transactions were passed');
                        }
                        messagePayload = {
                            txs: txs,
                            params: params
                        };
                        return [4 /*yield*/, __classPrivateFieldGet(this, _communicator).send(methods_1.METHODS.sendTransactions, messagePayload)];
                    case 1:
                        response = _b.sent();
                        if (!response.success) {
                            throw new Error(response.error);
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    TXs.prototype.setTxServiceUrl = function (url) {
        __classPrivateFieldSet(this, _txServiceUrl, url);
    };
    return TXs;
}());
exports.TXs = TXs;
_txServiceUrl = new WeakMap(), _communicator = new WeakMap();
