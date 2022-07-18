import SDK from '../sdk';
import { Methods } from '../communication/methods';
import { PostMessageOptions } from '../types';
import { Permission } from '../types/permissions';

describe('Safe Apps SDK wallet methods', () => {
  const sdkInstance = new SDK();
  let postMessageSpy: jest.SpyInstance<void, [message: any, options?: PostMessageOptions]>;

  beforeEach(() => {
    postMessageSpy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SDK.wallet.getPermissions', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.wallet.getPermissions();

      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.wallet_getPermissions, params: undefined }),
        '*',
      );
    });

    test('should resolve the correct getPermissions types', async () => {
      const getPermissionsSpy = jest.spyOn(sdkInstance.wallet, 'getPermissions');
      const date = Date.now();

      getPermissionsSpy.mockImplementationOnce(
        (): Promise<Permission[]> =>
          Promise.resolve([
            {
              parentCapability: 'requestAddressBook',
              invoker: 'http://test.eth',
              date,
            },
          ]),
      );
      const permissions = await sdkInstance.wallet.getPermissions();

      expect(permissions).toMatchObject([
        {
          parentCapability: 'requestAddressBook',
          invoker: 'http://test.eth',
          date,
        },
      ]);
    });
  });

  describe('SDK.wallet.requestPermissions', () => {
    test('Should send a valid message to the interface', () => {
      sdkInstance.wallet.requestPermissions([{ requestAddressBook: {} }]);

      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({ method: Methods.wallet_requestPermissions, params: [{ requestAddressBook: {} }] }),
        '*',
      );
    });

    test('should resolve the correct requestPermissions types', async () => {
      const requestPermissionsSpy = jest.spyOn(sdkInstance.wallet, 'requestPermissions');
      const date = Date.now();

      requestPermissionsSpy.mockImplementationOnce(
        (): Promise<Permission[]> =>
          Promise.resolve([
            {
              parentCapability: 'requestAddressBook',
              invoker: 'http://test.eth',
              date,
            },
          ]),
      );
      const permissions = await sdkInstance.wallet.requestPermissions([{ requestAddressBook: {} }]);

      expect(permissions).toMatchObject([
        {
          parentCapability: 'requestAddressBook',
          invoker: 'http://test.eth',
          date,
        },
      ]);
    });
  });
});
