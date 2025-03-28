import SafeAppsSDK, { SafeInfo, TransactionStatus, Web3TransactionObject } from '@safe-global/safe-apps-sdk';
import { EventEmitter } from 'events';
import { EIP1193Provider, GetCallsParams, GetCallsResult, SendCallsParams, SendCallsResult } from './types';
import { getLowerCase, numberToHex } from './utils';

// The API is based on Ethereum JavaScript API Provider Standard. Link: https://eips.ethereum.org/EIPS/eip-1193
export class SafeAppProvider extends EventEmitter implements EIP1193Provider {
  private readonly safe: SafeInfo;
  private readonly sdk: SafeAppsSDK;
  private submittedTxs = new Map<string, Web3TransactionObject>();

  constructor(safe: SafeInfo, sdk: SafeAppsSDK) {
    super();
    this.safe = safe;
    this.sdk = sdk;
  }

  async connect(): Promise<void> {
    this.emit('connect', { chainId: this.chainId });
    return;
  }

  async disconnect(): Promise<void> {
    return;
  }

  public get chainId(): number {
    return this.safe.chainId;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request(request: { method: string; params?: any[] }): Promise<any> {
    const { method, params = [] } = request;

    switch (method) {
      case 'eth_accounts':
        return [this.safe.safeAddress];

      case 'net_version':
      case 'eth_chainId':
        return numberToHex(this.chainId);

      case 'personal_sign': {
        const [message, address] = params;

        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
          throw new Error('The address or message hash is invalid');
        }

        const response = await this.sdk.txs.signMessage(message);
        const signature = 'signature' in response ? response.signature : undefined;

        return signature || '0x';
      }

      case 'eth_sign': {
        const [address, messageHash] = params;

        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase() || !messageHash.startsWith('0x')) {
          throw new Error('The address or message hash is invalid');
        }

        const response = await this.sdk.txs.signMessage(messageHash);
        const signature = 'signature' in response ? response.signature : undefined;

        return signature || '0x';
      }

      case 'eth_signTypedData':
      case 'eth_signTypedData_v4': {
        const [address, typedData] = params;
        const parsedTypedData = typeof typedData === 'string' ? JSON.parse(typedData) : typedData;

        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
          throw new Error('The address is invalid');
        }

        const response = await this.sdk.txs.signTypedMessage(parsedTypedData);
        const signature = 'signature' in response ? response.signature : undefined;
        return signature || '0x';
      }

      case 'eth_sendTransaction':
        // `value` or `data` can be explicitly set as `undefined` for example in Viem. The spread will overwrite the fallback value.
        const tx = {
          ...params[0],
          value: params[0].value || '0',
          data: params[0].data || '0x',
        };

        // Some ethereum libraries might pass the gas as a hex-encoded string
        // We need to convert it to a number because the SDK expects a number and our backend only supports
        // Decimal numbers
        if (typeof tx.gas === 'string' && tx.gas.startsWith('0x')) {
          tx.gas = parseInt(tx.gas, 16);
        }

        const resp = await this.sdk.txs.send({
          txs: [tx],
          params: { safeTxGas: tx.gas },
        });

        // Store fake transaction
        this.submittedTxs.set(resp.safeTxHash, {
          from: this.safe.safeAddress,
          hash: resp.safeTxHash,
          gas: 0,
          gasPrice: '0x00',
          nonce: 0,
          input: tx.data,
          value: tx.value,
          to: tx.to,
          blockHash: null,
          blockNumber: null,
          transactionIndex: null,
        });
        return resp.safeTxHash;

      case 'eth_blockNumber':
        const block = await this.sdk.eth.getBlockByNumber(['latest']);

        return block.number;

      case 'eth_getBalance':
        return this.sdk.eth.getBalance([getLowerCase(params[0]), params[1]]);

      case 'eth_getCode':
        return this.sdk.eth.getCode([getLowerCase(params[0]), params[1]]);

      case 'eth_getTransactionCount':
        return this.sdk.eth.getTransactionCount([getLowerCase(params[0]), params[1]]);

      case 'eth_getStorageAt':
        return this.sdk.eth.getStorageAt([getLowerCase(params[0]), params[1], params[2]]);

      case 'eth_getBlockByNumber':
        return this.sdk.eth.getBlockByNumber([params[0], params[1]]);

      case 'eth_getBlockByHash':
        return this.sdk.eth.getBlockByHash([params[0], params[1]]);

      case 'eth_getTransactionByHash':
        let txHash = params[0];
        try {
          const resp = await this.sdk.txs.getBySafeTxHash(txHash);
          txHash = resp.txHash || txHash;
        } catch (e) {}
        // Use fake transaction if we don't have a real tx hash
        if (this.submittedTxs.has(txHash)) {
          return this.submittedTxs.get(txHash);
        }
        return this.sdk.eth.getTransactionByHash([txHash]).then((tx) => {
          // We set the tx hash to the one requested, as some provider assert this
          if (tx) {
            tx.hash = params[0];
          }
          return tx;
        });

      case 'eth_getTransactionReceipt': {
        let txHash = params[0];
        try {
          const resp = await this.sdk.txs.getBySafeTxHash(txHash);
          txHash = resp.txHash || txHash;
        } catch (e) {}
        return this.sdk.eth.getTransactionReceipt([txHash]).then((tx) => {
          // We set the tx hash to the one requested, as some provider assert this
          if (tx) {
            tx.transactionHash = params[0];
          }
          return tx;
        });
      }

      case 'eth_estimateGas': {
        return this.sdk.eth.getEstimateGas(params[0]);
      }

      case 'eth_call': {
        return this.sdk.eth.call([params[0], params[1]]);
      }

      case 'eth_getLogs':
        return this.sdk.eth.getPastLogs([params[0]]);

      case 'eth_gasPrice':
        return this.sdk.eth.getGasPrice();

      case 'wallet_getPermissions':
        return this.sdk.wallet.getPermissions();

      case 'wallet_requestPermissions':
        return this.sdk.wallet.requestPermissions(params[0]);

      case 'safe_setSettings':
        return this.sdk.eth.setSafeSettings([params[0]]);

      case 'wallet_sendCalls': {
        const { from, calls, chainId }: SendCallsParams = params[0];

        if (chainId !== numberToHex(this.chainId)) {
          throw new Error(`Safe is not on chain ${chainId}`);
        }

        if (from !== this.safe.safeAddress) {
          throw Error('Invalid from address');
        }

        const txs = calls.map((call, i) => {
          if (!call.to) {
            throw new Error(`Invalid call #${i}: missing "to" field`);
          }
          return {
            to: call.to,
            data: call.data ?? '0x',
            value: call.value ?? numberToHex(0),
          };
        });

        const { safeTxHash } = await this.sdk.txs.send({ txs });

        const result: SendCallsResult = {
          id: safeTxHash,
        };

        return result;
      }

      case 'wallet_getCallsStatus': {
        const safeTxHash: GetCallsParams = params[0];

        const CallStatus: {
          [key in TransactionStatus]: GetCallsResult['status'];
        } = {
          [TransactionStatus.AWAITING_CONFIRMATIONS]: 100,
          [TransactionStatus.AWAITING_EXECUTION]: 100,
          [TransactionStatus.SUCCESS]: 200,
          [TransactionStatus.CANCELLED]: 400,
          [TransactionStatus.FAILED]: 500,
        };

        const tx = await this.sdk.txs.getBySafeTxHash(safeTxHash);

        const result: GetCallsResult = {
          version: '1.0',
          id: safeTxHash,
          chainId: numberToHex(this.chainId),
          status: CallStatus[tx.txStatus],
        };

        // Transaction is queued
        if (!tx.txHash) {
          return result;
        }

        // If transaction is executing, receipt is null
        const receipt = await this.sdk.eth.getTransactionReceipt([tx.txHash]);
        if (!receipt) {
          return result;
        }

        const calls =
          tx.txData?.dataDecoded?.method !== 'multiSend'
            ? 1
            : // Number of batched transactions
              tx.txData.dataDecoded.parameters?.[0].valueDecoded?.length ?? 1;

        // Typed as number; is hex
        const blockNumber = Number(receipt.blockNumber);
        const gasUsed = Number(receipt.gasUsed);

        result.receipts = Array(calls).fill({
          logs: receipt.logs,
          status: numberToHex(tx.txStatus === TransactionStatus.SUCCESS ? 1 : 0),
          blockHash: receipt.blockHash,
          blockNumber: numberToHex(blockNumber),
          gasUsed: numberToHex(gasUsed),
          transactionHash: tx.txHash,
        });

        return result;
      }

      case 'wallet_showCallsStatus': {
        // Cannot open transaction details page via SDK
        throw new Error(`"${request.method}" not supported`);
      }

      case 'wallet_getCapabilities': {
        return {
          [numberToHex(this.chainId)]: {
            atomicBatch: {
              supported: true,
            },
          },
        };
      }

      default:
        throw Error(`"${request.method}" not implemented`);
    }
  }

  // this method is needed for ethers v4
  // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
  send(request: any, callback: (error: any, response?: any) => void): void {
    if (!request) callback('Undefined request');
    this.request(request)
      .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
      .catch((error) => callback(error, null));
  }
}
