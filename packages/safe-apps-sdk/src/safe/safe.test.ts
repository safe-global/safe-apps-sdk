import SDK from '../sdk';
import { SafeInfo, ChainInfo } from '../types';
import { Methods } from '../communication/methods';
import { FEATURES, GAS_PRICE_TYPE, RPC_AUTHENTICATION } from '@gnosis.pm/safe-react-gateway-sdk';

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
    test('Should generate correct EIP-191 message hash', () => {
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
      const expectedHash = '0xe32c44147e358bc973757518210c3baec92de66115c513ea1146d61ad4fd93af';
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
    test('Should call SDK.safe.isMessageHashSigned with a hash of the message', () => {
      const isMessageHashSignedSpy = jest.spyOn(sdkInstance.safe, 'isMessageHashSigned');

      // ethers.utils.formatBytes32String('approve rugpull')
      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000';
      const expectedHash = '0xaae9257b8ff1c926ac3cdf36923661de4e81bf934e38958beeede3519aa18b08';

      sdkInstance.safe.isMessageSigned(message);
      expect(isMessageHashSignedSpy).toHaveBeenCalledWith(expectedHash, '0x');
    });
  });

  describe('SDK.safe.isMessageHashSigned', () => {
    test('Should send call messages to check the message the interface', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getInfo');
      safeInfoSpy.mockImplementation(
        (): Promise<SafeInfo> =>
          Promise.resolve({
            chainId: 4,
            safeAddress: '0x9C6FEA0B2eAc5b6D8bBB6C30401D42aA95398190',
            owners: [],
            threshold: 1,
          }),
      );

      const message = '0x617070726f76652072756770756c6c0000000000000000000000000000000000'; // ethers.utils.formatBytes32String('approve rugpull')

      sdkInstance.safe.isMessageHashSigned(message);
      await sleep(200);
      // calling first check1271Signature method
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

      // ethers.utils.formatBytes32String('approve rugpull')
      const message = sdkInstance.safe.calculateMessageHash(
        '0x617070726f76652072756770756c6c0000000000000000000000000000000000',
      );
      const signed = await sdkInstance.safe.isMessageHashSigned(message);

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

      // ethers.utils.formatBytes32String('approve rugpull')
      const message = sdkInstance.safe.calculateMessageHash(
        '0x617070726f76652072756770756c6c0000000000000000000000000000000000',
      );
      const signed = await sdkInstance.safe.isMessageHashSigned(message);

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

      // ethers.utils.formatBytes32String('approve rugpull')
      const message = sdkInstance.safe.calculateMessageHash(
        '0x617070726f76652072756770756c6c0000000000000000000000000000000000',
      );
      const signed = await sdkInstance.safe.isMessageHashSigned(message);

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

  describe('SDK.safe.getChainInfo', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.safe.getChainInfo();

      expect(postMessageSpy).toHaveBeenCalledWith(expect.objectContaining({ method: Methods.getChainInfo }), '*');
    });

    test('should resolve the correct ChainInfo types', async () => {
      const safeInfoSpy = jest.spyOn(sdkInstance.safe, 'getChainInfo');
      safeInfoSpy.mockImplementationOnce(
        (): Promise<ChainInfo> =>
          Promise.resolve({
            transactionService: 'https://safe-transaction.rinkeby.staging.gnosisdev.com',
            chainName: 'Rinkeby',
            chainId: '4',
            shortName: 'rin',
            description: 'description',
            l2: false,
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
              logoUri: 'https://safe-transaction-assets.staging.gnosisdev.com/chains/4/currency_logo.png',
            },
            safeAppsRpcUri: {
              authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
              value: 'https://api.url/rpc',
            },
            publicRpcUri: {
              authentication: RPC_AUTHENTICATION.API_KEY_PATH,
              value: 'https://rinkeby.infura.io/v3/',
            },
            blockExplorerUriTemplate: {
              address: 'https://rinkeby.etherscan.io/address/{{address}}',
              txHash: 'https://rinkeby.etherscan.io/tx/{{txHash}}',
              api: 'https://api-rinkeby.etherscan.io/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
            },
            theme: {
              textColor: '#ffffff',
              backgroundColor: '#E8673C',
            },
            ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
            gasPrice: [
              {
                type: GAS_PRICE_TYPE.ORACLE,
                uri: 'https://api-rinkeby.etherscan.io/api?module=gastracker&action=gasoracle',
                gasParameter: 'FastGasPrice',
                gweiFactor: '1000000000.000000000',
              },
            ],
            disabledWallets: ['fortmatic', 'lattice'],
            features: [
              FEATURES.CONTRACT_INTERACTION,
              FEATURES.DOMAIN_LOOKUP,
              FEATURES.ERC721,
              FEATURES.SAFE_APPS,
              FEATURES.SPENDING_LIMIT,
            ],
          }),
      );
      const chainInfo = await sdkInstance.safe.getChainInfo();
      expect(chainInfo).toMatchObject({
        transactionService: 'https://safe-transaction.rinkeby.staging.gnosisdev.com',
        chainName: 'Rinkeby',
        chainId: '4',
        shortName: 'rin',
        description: 'description',
        l2: false,
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
          logoUri: 'https://safe-transaction-assets.staging.gnosisdev.com/chains/4/currency_logo.png',
        },
        safeAppsRpcUri: {
          authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
          value: 'https://api.url/rpc',
        },
        publicRpcUri: {
          authentication: RPC_AUTHENTICATION.API_KEY_PATH,
          value: 'https://rinkeby.infura.io/v3/',
        },
        blockExplorerUriTemplate: {
          address: 'https://rinkeby.etherscan.io/address/{{address}}',
          txHash: 'https://rinkeby.etherscan.io/tx/{{txHash}}',
          api: 'https://api-rinkeby.etherscan.io/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
        },
        theme: {
          textColor: '#ffffff',
          backgroundColor: '#E8673C',
        },
        ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        gasPrice: [
          {
            type: 'ORACLE',
            uri: 'https://api-rinkeby.etherscan.io/api?module=gastracker&action=gasoracle',
            gasParameter: 'FastGasPrice',
            gweiFactor: '1000000000.000000000',
          },
        ],
        disabledWallets: ['fortmatic', 'lattice'],
        features: ['CONTRACT_INTERACTION', 'DOMAIN_LOOKUP', 'ERC721', 'SAFE_APPS', 'SPENDING_LIMIT'],
      });
    });
  });
});
