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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const methods_1 = require("../communication/methods");
describe('Safe Apps SDK transaction methods', () => {
    const sdkInstance = new index_1.default();
    /* eslint-disable-next-line */
    let spy;
    beforeEach(() => {
        spy = jest.spyOn(window.parent, 'postMessage');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('SDK.txs.send', () => {
        test('Should throw an error when passing an empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(sdkInstance.txs.send({ txs: [] })).rejects.toEqual(new Error('No transactions were passed'));
        }));
        test('Should call window.parent.postMessage when passing array of TXs', () => {
            const txs = [{ to: 'address', value: '0', data: '0x' }];
            sdkInstance.txs.send({ txs });
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({ method: methods_1.METHODS.sendTransactions, params: { txs, params: undefined } }), '*');
        });
        test('Should include passed params to a message body', () => {
            const txs = [{ to: 'address', value: '0', data: '0x' }];
            const params = { safeTxGas: 5000 };
            sdkInstance.txs.send({ txs, params });
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({ method: methods_1.METHODS.sendTransactions, params: { txs, params } }), '*');
        });
    });
});
//# sourceMappingURL=txs.test.js.map