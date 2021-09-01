import SDK from '../sdk';
import { SafeInfo } from '../types';
import { Methods } from '../communication/methods';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Safe Apps SDK safe methods', () => {
  const sdkInstance = new SDK();
  /* eslint-disable-next-line */
  let postMessageSpy: jest.SpyInstance<void, [message: any, options?: PostMessageOptions]>;

  beforeEach(() => {
    postMessageSpy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SDK.safe.getInfo', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.safe.getInfo();

      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.getSafeInfo, params: undefined }),
        '*',
      );
    });
  });

  describe('SDK.safe.calculateMessageHash', () => {
    test('Should generate a valid message hash', () => {
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
      const message = 'approve rugpull';
      const expectedHash = '0xb4fd0d8fd75eea963cec570dd58d8c3f5f93569f5c112e227fa64f275623b4db';
      const hash = sdkInstance.safe.calculateMessageHash(message);

      expect(hash).toEqual(expectedHash);
    });
  });

  describe('SDK.safe.check1271Signature', () => {
    test('Should send a valid message to the interface', async () => {
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
      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      // @ts-expect-error method is private but we are testing it
      sdkInstance.safe.check1271Signature(message);
      await sleep(200);
      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: Methods.rpcCall,
          params: {
            call: 'eth_call',
            params: [
              {
                to: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
                data: '0x1626ba7e617070726f76652072756770756c6c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
              },
              'latest',
            ],
          },
        }),
        '*',
      );
    });

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

    test('Should return false if the message isnt signed and underlying call reverts', async () => {
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
      rpcCallSpy.mockImplementationOnce(() => Promise.reject(new Error('Hash not approved')));

      const message = '0x68616c6c6f000000000000000000000000000000000000000000000000000000'; // ethers.utils.formatBytes32String('hallo')
      // @ts-expect-error method is private but we are testing it
      expect(await sdkInstance.safe.check1271Signature(message)).toEqual(false);
    });
  });

  describe('SDK.safe.check1271SignatureBytes', () => {
    test('Should send a valid message to the interface', async () => {
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
      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      // @ts-expect-error method is private but we are testing it
      sdkInstance.safe.check1271SignatureBytes(message);
      await sleep(200);
      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: Methods.rpcCall,
          params: {
            call: 'eth_call',
            params: [
              {
                to: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
                data: '0x20c13b0b000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020617070726f76652072756770756c6c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
              },
              'latest',
            ],
          },
        }),
        '*',
      );
    });

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
          data: '0x20c13b0b00000000000000000000000000000000000000000000000000000000',
        }),
      );

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      // @ts-expect-error method is private but we are testing it
      expect(await sdkInstance.safe.check1271SignatureBytes(message)).toEqual(true);
    });

    test('Should return false if the message isnt signed and underlying call reverts', async () => {
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
      rpcCallSpy.mockImplementationOnce(() => Promise.reject(new Error('Hash not approved')));

      const message = '0x68616c6c6f000000000000000000000000000000000000000000000000000000'; // ethers.utils.formatBytes32String('hallo')
      // @ts-expect-error method is private but we are testing it
      expect(await sdkInstance.safe.check1271SignatureBytes(message)).toEqual(false);
    });
  });

  describe('SDK.safe.isMessageSigned', () => {
    test('Should return true if check1271Signature return true', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      // @ts-expect-error method is private but we are testing it
      const check1271SignatureSpy = jest.spyOn(sdkInstance.safe, 'check1271Signature');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );
      // @ts-expect-error ts fails to infer the return type because of a private method
      check1271SignatureSpy.mockImplementationOnce(() => Promise.resolve(true));

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      const signed = await sdkInstance.safe.isMessageSigned(message);

      expect(signed).toEqual(true);
    });

    test('Should return true if check1271SignatureBytes return true', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      // @ts-expect-error method is private but we are testing it
      const check1271SignatureSpy = jest.spyOn(sdkInstance.safe, 'check1271Signature');
      // @ts-expect-error method is private but we are testing it
      const check1271SignatureBytesSpy = jest.spyOn(sdkInstance.safe, 'check1271SignatureBytes');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );
      // @ts-expect-error ts fails to infer the return type because of a private method
      check1271SignatureSpy.mockImplementationOnce(() => Promise.resolve(false));
      // @ts-expect-error ts fails to infer the return type because of a private method
      check1271SignatureBytesSpy.mockImplementationOnce(() => Promise.resolve(true));

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      const signed = await sdkInstance.safe.isMessageSigned(message);

      expect(signed).toEqual(true);
    });

    test('Should return false if all of the underlying checks return false', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      // @ts-expect-error method is private but we are testing it
      const check1271SignatureSpy = jest.spyOn(sdkInstance.safe, 'check1271Signature');
      // @ts-expect-error method is private but we are testing it
      const check1271SignatureBytesSpy = jest.spyOn(sdkInstance.safe, 'check1271SignatureBytes');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );
      // @ts-expect-error ts fails to infer the return type because of a private method
      check1271SignatureSpy.mockImplementationOnce(() => Promise.resolve(false));
      // @ts-expect-error ts fails to infer the return type because of a private method
      check1271SignatureBytesSpy.mockImplementationOnce(() => Promise.resolve(false));

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')
      const signed = await sdkInstance.safe.isMessageSigned(message);

      expect(signed).toEqual(false);
    });
  });

  describe('SDK.safe.getBalances', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.safe.experimental_getBalances({ currency: 'eur' });

      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.getSafeBalances, params: { currency: 'eur' } }),
        '*',
      );
    });
  });
});
