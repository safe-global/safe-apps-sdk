import SDK from '../index';
import { METHODS } from '../communication/methods';

describe('Safe Apps SDK transaction methods', () => {
  const sdkInstance = new SDK([/http:\/\/localhost:3000/]);
  /* eslint-disable-next-line */
  let spy: jest.SpyInstance<void, [message: any, targetOrigin: string, transfer?: Transferable[] | undefined]>;

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
        expect.objectContaining({ method: METHODS.sendTransactions, params: { txs, params: undefined } }),
        '*',
      );
    });

    test('Should include passed params to a message body', () => {
      const txs = [{ to: 'address', value: '0', data: '0x' }];
      const params = { safeTxGas: 5000 };

      sdkInstance.txs.send({ txs, params });
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: METHODS.sendTransactions, params: { txs, params } }),
        '*',
      );
    });
  });
});
