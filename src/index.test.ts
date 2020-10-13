import initSdk, { SdkInstance } from './index';
import { SDK_MESSAGES } from './communication/messageIds';

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
    test('Should throw an error when passing an empty array', () => {
      expect(() => {
        sdkInstance.sendTransactions([]);
      }).toThrow();
    });

    test('Should call window.parent.postMessage with a requestId when passing array of TXs', () => {
      const requestId = '1000';
      const spy = jest.spyOn(window.parent, 'postMessage');
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      sdkInstance.sendTransactions(txs, requestId);
      expect(spy).toHaveBeenCalledWith({ messageId: SDK_MESSAGES.SEND_TRANSACTIONS, data: txs, requestId }, '*');
    });

    test('Should return a message containing requestId', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      const request = sdkInstance.sendTransactions(txs);

      expect(typeof request.requestId).toBe('number');
      expect(request.data).toEqual(txs);
    });
  });
});
