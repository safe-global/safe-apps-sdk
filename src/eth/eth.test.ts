import { TransactionConfig, PastLogsOptions } from 'web3-core';
import SDK from '../index';
import { METHODS } from '../communication/methods';

describe('Safe Apps SDK Read RPC Requests', () => {
  const sdkInstance = new SDK([/http:\/\/localhost:3000/]);
  /* eslint-disable-next-line */
  let spy: jest.SpyInstance<void, [message: any, targetOrigin: string, transfer?: Transferable[] | undefined]>;

  beforeEach(() => {
    spy = jest.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Methods requiring default block param', () => {
    describe('getBalance', () => {
      it('Should send a valid message to the interface and return a request ID', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getBalance({
          params: [addr, 'pending'],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getBalance',
              params: [addr, 'pending'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });

      it('Should add `latest` as a default block parameter when one is not passed', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getBalance({
          params: [addr],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getBalance',
              params: [addr, 'latest'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });
    });

    describe('getCode', () => {
      it('Should send a valid message to the interface and return a request ID', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getCode({
          params: [addr, 'pending'],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getCode',
              params: [addr, 'pending'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });

      it('Should add `latest` as a default block parameter when one is not passed', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getCode({
          params: [addr],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getCode',
              params: [addr, 'latest'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });
    });

    describe('getStorageAt', () => {
      it('Should send a valid message to the interface and return a request ID', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getStorageAt({
          params: [addr, 0, 'earliest'],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getStorageAt',
              params: [addr, '0x0', 'earliest'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });

      it('Should add `latest` as a default block parameter when one is not passed', async () => {
        const requestId = '1000';
        const addr = '0x0000000000000000000000000000000000000000';
        const request = await sdkInstance.eth.getStorageAt({
          params: [addr, 0],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_getStorageAt',
              params: [addr, 0, 'latest'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });
    });

    describe('call', () => {
      it('Should send a valid message to the interface and return a request ID', async () => {
        const requestId = '1000';
        const config: TransactionConfig = {
          from: '0x0000000000000000000000000000000000000000',
          to: '0x0000000000000000000000000000000000000000',
        };
        const request = await sdkInstance.eth.call({
          params: [config, 'pending'],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_call',
              params: [config, 'pending'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });

      it('Should add `latest` as a default block parameter when one is not passed', async () => {
        const requestId = '1000';
        const config: TransactionConfig = {
          from: '0x0000000000000000000000000000000000000000',
          to: '0x0000000000000000000000000000000000000000',
        };
        const request = await sdkInstance.eth.call({
          params: [config],
          requestId,
        });

        expect(spy).toHaveBeenCalledWith(
          {
            messageId: METHODS.rpcCall,
            data: {
              call: 'eth_call',
              params: [config, 'latest'],
            },
            requestId,
          },
          '*',
        );
        expect(request.requestId).toEqual(requestId);
      });
    });
  });

  describe('getPastLogs', () => {
    it('Should send a valid message to the interface and return a request ID', async () => {
      const requestId = '1000';
      const number = 11054275;
      const params: [PastLogsOptions] = [
        {
          fromBlock: number,
          toBlock: 'latest',
        },
      ];
      const request = await sdkInstance.eth.getPastLogs({
        params,
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
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
    it('Should send a valid message to the interface and return a request ID', async () => {
      const requestId = '1000';
      const hash = '0x1955a9f306903669e295196752b11bc0dee33b48cabdf44b1103b7cea086cae7';
      const request = await sdkInstance.eth.getBlockByHash({
        params: [hash],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getBlockByHash',
            params: [hash, false],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });

    it('Should respect passed full tx object boolean param', async () => {
      const requestId = '1000';
      const hash = '0x1955a9f306903669e295196752b11bc0dee33b48cabdf44b1103b7cea086cae7';
      const request = await sdkInstance.eth.getBlockByHash({
        params: [hash, true],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getBlockByHash',
            params: [hash, true],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getBlockByNumber', () => {
    it('Should send a valid message to the interface and return a request ID', async () => {
      const requestId = '1000';
      const number = '11054275';
      const request = await sdkInstance.eth.getBlockByNumber({
        params: [number],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getBlockByNumber',
            params: [number, false],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });

    it('Should respect passed full tx object boolean param', async () => {
      const requestId = '1000';
      const number = '11054275';
      const request = await sdkInstance.eth.getBlockByNumber({
        params: [number, true],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getBlockByNumber',
            params: [number, true],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getTransactionByHash', () => {
    it('Should send a valid message to the interface and return a request ID', async () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      const request = await sdkInstance.eth.getTransactionByHash({
        params: [hash],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getTransactionByHash',
            params: [hash],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });
  });

  describe('getTransactionReceipt', () => {
    it('Should send a valid message to the interface and return a request ID', async () => {
      const requestId = '1000';
      const hash = '0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7';
      const request = await sdkInstance.eth.getTransactionReceipt({
        params: [hash],
        requestId,
      });

      expect(spy).toHaveBeenCalledWith(
        {
          messageId: METHODS.rpcCall,
          data: {
            call: 'eth_getTransactionReceipt',
            params: [hash],
          },
          requestId,
        },
        '*',
      );
      expect(request.requestId).toEqual(requestId);
    });
  });
});
