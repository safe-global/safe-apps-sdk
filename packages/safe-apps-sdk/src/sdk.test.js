"use strict";
exports.__esModule = true;
var index_1 = require("./index");
describe('Safe apps SDK', function () {
    var sdkInstance;
    describe('initSdk', function () {
        test('Should initialize with opts', function () {
            sdkInstance = new index_1["default"]({ whitelistedDomains: [/http:\/\/localhost:3000/] });
            expect(sdkInstance.txs.send).not.toBeUndefined();
        });
        test('Should initialize without opts', function () {
            sdkInstance = new index_1["default"]();
            expect(sdkInstance.txs.send).not.toBeUndefined();
        });
        test("should send a getEnvInfo message to obtain information about interface's env", function () {
            var spy = jest.spyOn(window.parent, 'postMessage');
            sdkInstance = new index_1["default"]();
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({
                method: 'getEnvInfo'
            }), '*');
        });
    });
});
