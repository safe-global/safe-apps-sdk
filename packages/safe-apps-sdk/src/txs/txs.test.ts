import SDK from '../index';
import { Methods } from '../communication/methods';
import { PostMessageOptions } from '../types';

describe('Safe Apps SDK transaction methods', () => {
  const sdkInstance = new SDK();
  let spy: jest.SpyInstance<void, [message: any, options?: PostMessageOptions]>;

  beforeEach(() => {
    spy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SDK.txs.send', () => {
    test('Should throw an error when passing an empty array', async () => {
      await expect(sdkInstance.txs.send({ txs: [] })).rejects.toEqual(new Error('No transactions were passed'));
    });

    test('Should call window.parent.postMessage when passing array of TXs', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];

      sdkInstance.txs.send({ txs });
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.sendTransactions, params: { txs, params: undefined } }),
        '*',
      );
    });

    test('Should include passed params to a message body', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      const params = { safeTxGas: 5000 };

      sdkInstance.txs.send({ txs, params });
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.sendTransactions, params: { txs, params } }),
        '*',
      );
    });
  });

  describe('SDK.txs.getBySafeTxHash', () => {
    test('Should throw an error when passing invalid hash', async () => {
      await expect(sdkInstance.txs.getBySafeTxHash('')).rejects.toEqual(new Error('Invalid safeTxHash'));
    });

    test('Should include passed params to a message body', () => {
      const safeTxHash = 'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a';

      sdkInstance.txs.getBySafeTxHash(safeTxHash);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.getTxBySafeTxHash, params: { safeTxHash } }),
        '*',
      );
    });
  });

  describe('SDK.txs.signMessage', () => {
    test('Should include params with non-hashed message to the message body', () => {
      const message = 'approve rugpull';

      sdkInstance.txs.signMessage(message);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.signMessage, params: { message } }),
        '*',
      );
    });
  });
});
