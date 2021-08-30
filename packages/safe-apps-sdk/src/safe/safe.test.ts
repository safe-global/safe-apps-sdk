import SDK from '../sdk';
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
      // to test message/hash I signed a test message on rinkeby
      // https://dashboard.tenderly.co/tx/rinkeby/0x9308fb61d9f4282080334e3f35b357fc689e06808b8ad2817536813948e3720d
      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      const expectedHash = '0x2abe5973348b08db234e452b84bd3fbc74ee544962ff70903e85725d8f5f8eaf';
      const hash = await sdkInstance.safe.calculateSafeMessageHash(message);

      expect(hash).toEqual(expectedHash);
    });
  });

  describe('SDK.safe.check1271Signature', () => {
    test('Should return true if the message is signed and magic value is returned', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      // @ts-expect-error method is private but we are testing it
      const rpcCallSpy = jest.spyOn(sdkInstance.safe.communicator, 'send');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );
      rpcCallSpy.mockImplementationOnce(() =>
        Promise.resolve({
          id: '1',
          success: true,
          data: '0x1626ba7e00000000000000000000000000000000000000000000000000000000',
        }),
      );

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      // @ts-expect-error method is private but we are testing it
      expect(await sdkInstance.safe.check1271Signature(message)).toEqual(true);
    });
  });

  // describe('SDK.safe.isMessageSigned', () => {
  //   test('Should generate a valid message hash', async () => {
  //     const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
  //     safeInfoSpy.mockImplementationOnce(
  //       (): Promise<SafeInfo> =>
  //         Promise.resolve({
  //           chainId: 4,
  //           safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
  //           owners: [],
  //           threshold: 1,
  //         }),
  //     );

  //     console.log(sdkInstance.safe.communicator);
  //     // to test message/hash I signed a test message on rinkeby
  //     // https://dashboard.tenderly.co/tx/rinkeby/0x9308fb61d9f4282080334e3f35b357fc689e06808b8ad2817536813948e3720d
  //     const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
  //     const expectedHash = '0x2abe5973348b08db234e452b84bd3fbc74ee544962ff70903e85725d8f5f8eaf';
  //     const hash = await sdkInstance.safe.calculateSafeMessageHash(message);

  //     expect(hash).toEqual(expectedHash);
  //     safeInfoSpy.mockClear();
  //   });
  // });

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
