import SDK, { SdkInstance } from './index';

describe('Safe apps SDK', () => {
  let sdkInstance: SdkInstance;

  describe('initSdk', () => {
    test('Should initialize with regExp', () => {
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(sdkInstance.txs.send).not.toBeUndefined();
    });

    test('Should initialize without regExp', () => {
      sdkInstance = new SDK([]);
      expect(sdkInstance.txs.send).not.toBeUndefined();
    });

    test("should send a getEnvInfo message to obtain information about interface's env", () => {
      const spy = jest.spyOn(window.parent, 'postMessage');
      sdkInstance = new SDK([]);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'getEnvInfo',
        }),
        '*',
      );
    });
  });
});
