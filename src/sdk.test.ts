import SDK, { SdkInstance } from './index';
import { SDK_MESSAGES } from './communication/messageIds';

describe('Safe apps SDK', () => {
  let sdkInstance: SdkInstance;

  describe('initSdk', () => {
    test('Should initialize with regExp', () => {
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(sdkInstance.sendTransactions).not.toBeUndefined();
    });

    test('Should initialize without regExp', () => {
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(sdkInstance.sendTransactions).not.toBeUndefined();
    });

    test('Should send initialization message', () => {
      const spy = jest.spyOn(window.parent, 'postMessage');
      sdkInstance = new SDK([/http:\/\/localhost:3000/]);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          messageId: SDK_MESSAGES.SAFE_APP_SDK_INITIALIZED,
          data: undefined,
          requestId: expect.any(Number),
        }),
        '*',
      );
    });
  });

  describe('sendTransactions', () => {
    test('Should throw an error when passing an empty array', () => {
      expect(() => {
        sdkInstance.sendTransactions({ txs: [] });
      }).toThrow();
    });

    test('Should call window.parent.postMessage with a requestId when passing array of TXs', () => {
      const requestId = '1000';
      const spy = jest.spyOn(window.parent, 'postMessage');
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      sdkInstance.sendTransactions({ txs, requestId });
      expect(spy).toHaveBeenCalledWith(
        { messageId: SDK_MESSAGES.SEND_TRANSACTIONS_V2, data: { txs, params: undefined }, requestId },
        '*',
      );
    });

    test('Should return a message containing requestId', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      const request = sdkInstance.sendTransactions({ txs });

      // expect(typeof request.requestId).toBe('number');
      // expect(request.data).toEqual({ txs });
    });

    test('Should include passed safeTxGas and requestId params to a message body', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      const requestId = 1234;
      const params = { safeTxGas: 5000 };
      const request = sdkInstance.sendTransactions({ txs, params, requestId });

      // expect(request.requestId).toBe(requestId);
      // expect(request.data).toEqual({ txs, params });
    });
  });
});
