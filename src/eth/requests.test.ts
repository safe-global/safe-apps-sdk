import initSdk from 'src/index';
import { SDK_MESSAGES } from 'src/communication/messageIds';

describe('Safe Apps SDK Read RPC Requests', () => {
  const sdkInstance = initSdk([/http:\/\/localhost:3000/]);
  /* eslint-disable-next-line */
  let spy: jest.SpyInstance<void, [message: any, targetOrigin: string, transfer?: Transferable[] | undefined]>;

  beforeEach(() => {
    spy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('call', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const params = {
        from: '0x0000000000000000000000000000000000000000',
        to: '0x0000000000000000000000000000000000000000',
      };
      sdkInstance.eth.call({
        params,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_call',
            params,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getBalance', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      sdkInstance.eth.getBalance({
        params: addr,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getBalance',
            params: addr,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getCode', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      sdkInstance.eth.getCode({
        params: addr,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getCode',
            params: addr,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getPastLogs', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const number = 11054275;
      const params = {
        fromBlock: number,
        toBlock: 'latest',
      };
      sdkInstance.eth.getPastLogs({
        params,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getLogs',
            params,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getBlockByHash', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const hash = '0x1955a9f306903669e295196752b11bc0dee33b48cabdf44b1103b7cea086cae7';
      sdkInstance.eth.getBlockByHash({
        params: hash,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getBlockByHash',
            params: hash,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getBlockByNumber', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const number = 11054275;
      sdkInstance.eth.getBlockByNumber({
        params: number,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getBlockByNumber',
            params: number,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getStorageAt', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      sdkInstance.eth.getStorageAt({
        params: addr,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getStorageAt',
            params: addr,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getTransactionByHash', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      sdkInstance.eth.getTransactionByHash({
        params: hash,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getTransactionByHash',
            params: hash,
          },
          requestId,
        },
        '*',
      );
    });
  });

  describe('getTransactionReceipt', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      sdkInstance.eth.getTransactionReceipt({
        params: hash,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: SDK_MESSAGES.RPC_CALL,
          data: {
            call: 'eth_getTransactionReceipt',
            params: hash,
          },
          requestId,
        },
        '*',
      );
    });
  });
});
