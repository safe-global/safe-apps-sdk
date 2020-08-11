import initSdk, { SdkInstance, SDK_MESSAGES } from './index';

describe('safe app sdk', () => {
  let sdkInstance: SdkInstance;

  describe('initSdk', () => {
    test('Should initialize with regExp', () => {
      sdkInstance = initSdk([/http:\/\/localhost:3000/]);
      expect(sdkInstance.addListeners).not.toBeUndefined();
    });

    test('Should initialize without regExp', () => {
      sdkInstance = initSdk();
      expect(sdkInstance.addListeners).not.toBeUndefined();
    });
  });

  describe('sendTransaction', () => {
    test('Should do nothing when passing an empty array', () => {
      const spy = jest.spyOn(window.parent, 'postMessage');
      sdkInstance.sendTransactions([]);
      expect(spy).not.toHaveBeenCalled();
    });

    test('Should call window.parent.postMessage when passing array of TXs', () => {
      const spy = jest.spyOn(window.parent, 'postMessage');
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      sdkInstance.sendTransactions(txs);
      expect(spy).toHaveBeenCalledWith({ messageId: SDK_MESSAGES.SEND_TRANSACTIONS, data: txs }, '*');
    });
  });
});
