"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('Safe apps SDK', () => {
    let sdkInstance;
    describe('initSdk', () => {
        test('Should initialize with opts', () => {
            sdkInstance = new index_1.default({ whitelistedDomains: [/http:\/\/localhost:3000/] });
            expect(sdkInstance.txs.send).not.toBeUndefined();
        });
        test('Should initialize without opts', () => {
            sdkInstance = new index_1.default();
            expect(sdkInstance.txs.send).not.toBeUndefined();
        });
        test("should send a getEnvInfo message to obtain information about interface's env", () => {
            const spy = jest.spyOn(window.parent, 'postMessage');
            sdkInstance = new index_1.default();
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({
                method: 'getEnvInfo',
            }), '*');
        });
    });
});
//# sourceMappingURL=sdk.test.js.map