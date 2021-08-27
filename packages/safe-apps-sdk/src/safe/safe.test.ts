import SDK from '../index';
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
