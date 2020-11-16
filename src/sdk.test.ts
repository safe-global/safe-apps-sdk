import SDK, { SdkInstance } from './index';

describe('Safe apps SDK', () => {
  let sdkInstance: SdkInstance;

  describe('initSdk', () => {
    test('Should initialize with regExp', () => {
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(sdkInstance.txs.send).not.toBeUndefined();
    });

    test('Should initialize without regExp', () => {
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(sdkInstance.txs.send).not.toBeUndefined();
    });
  });
});
