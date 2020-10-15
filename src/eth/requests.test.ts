import initSdk from '../index';
import { SDK_MESSAGES } from '../communication/messageIds';

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
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const params = {
        from: '0x0000000000000000000000000000000000000000',
        to: '0x0000000000000000000000000000000000000000',
      };
      const request = sdkInstance.eth.call({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getBalance', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      const request = sdkInstance.eth.getBalance({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getCode', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      const request = sdkInstance.eth.getCode({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getPastLogs', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const number = 11054275;
      const params = {
        fromBlock: number,
        toBlock: 'latest',
      };
      const request = sdkInstance.eth.getPastLogs({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getBlockByHash', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const hash = '0x1955a9f306903669e295196752b11bc0dee33b48cabdf44b1103b7cea086cae7';
      const request = sdkInstance.eth.getBlockByHash({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getBlockByNumber', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const number = 11054275;
      const request = sdkInstance.eth.getBlockByNumber({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getStorageAt', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const addr = '0x0000000000000000000000000000000000000000';
      const request = sdkInstance.eth.getStorageAt({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getTransactionByHash', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      const request = sdkInstance.eth.getTransactionByHash({
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
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getTransactionReceipt', () => {
    it('Should send a valid message to the interface and return a request ID', () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      const request = sdkInstance.eth.getTransactionReceipt({
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
      expect(request.requestId).toEqual(requestId);
    });
  });
});
