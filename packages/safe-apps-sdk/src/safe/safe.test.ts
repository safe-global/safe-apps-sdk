import SDK from '../index';
import { SafeInfo } from '../types';
import { Methods } from '../communication/methods';

describe('Safe Apps SDK safe methods', () => {
  const sdkInstance = new SDK();
  /* eslint-disable-next-line */
  let spy: jest.SpyInstance<void, [message: any, options?: PostMessageOptions]>;

  beforeEach(() => {
    spy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SDK.safe.getInfo', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.safe.getInfo();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.getSafeInfo, params: undefined }),
        '*',
      );
    });
  });

  describe('SDK.safe.calculateSafeMessageHash', () => {
    test('Should generate a valid message hash', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );
      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // approve rugpull
      const expectedHash = '0x2abe5973348b08db234e452b84bd3fbc74ee544962ff70903e85725d8f5f8eaf';
      const hash = await sdkInstance.safe.calculateSafeMessageHash(message);

      expect(hash).toEqual(expectedHash);
    });
  });

  describe('SDK.safe.getBalances', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.safe.experimental_getBalances({ currency: 'eur' });

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.getSafeBalances, params: { currency: 'eur' } }),
        '*',
      );
    });
  });
});
