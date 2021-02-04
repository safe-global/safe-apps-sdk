import { BaseProvider, TransactionRequest, Network } from '@ethersproject/providers';
import { checkProperties, getStatic, shallowCopy } from '@ethersproject/properties';
import { hexlify, hexValue, isHexString } from '@ethersproject/bytes';
import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { Logger } from '@ethersproject/logger';
import { getLowerCase } from './utils';

const logger = new Logger('safe_apps_sdk_ethers_provider');

const allowedTransactionKeys: { [key: string]: boolean } = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
};

// eslint-disable-next-line
function checkError(method: string, error: any): any {
  // Undo the "convenience" some nodes are attempting to prevent backwards
  // incompatibility; maybe for v6 consider forwarding reverts as errors
  if (method === 'call' && error.code === Logger.errors.SERVER_ERROR) {
    const e = error.error;
    if (e && e.message.match('reverted') && isHexString(e.data)) {
      return e.data;
    }
  }

  throw error;
}

export class SafeAppsSdkProvider extends BaseProvider {
  _safe: SafeInfo;
  _sdk: SafeAppsSDK;

  constructor(safe: SafeInfo, sdk: SafeAppsSDK) {
    super(safe.network.toLowerCase());
    this._safe = safe;
    this._sdk = sdk;
  }

  async detectNetwork(): Promise<Network> {
    const network = this.network;

    if (!network) {
      logger.throwError('no network detected', Logger.errors.UNKNOWN_ERROR, {});
    }

    return network;
  }

  async listAccounts(): Promise<Array<string>> {
    return [this.formatter.address(this._safe.safeAddress)];
  }

  // eslint-disable-next-line
  async send(method: string, params: any): Promise<any> {
    switch (method) {
      case 'getBlockNumber':
        const block = await this._sdk.eth.getBlockByNumber(['latest']);

        return block.number;

      case 'getBalance':
        return this._sdk.eth.getBalance([getLowerCase(params.address), params.blockTag]);

      case 'getCode':
        return this._sdk.eth.getCode([getLowerCase(params.address), params.blockTag]);

      case 'getStorageAt':
        return this._sdk.eth.getStorageAt([getLowerCase(params.address), params.position, params.blockTag]);

      case 'getBlock':
        if (params.blockTag) {
          return this._sdk.eth.getBlockByNumber([params.blockTag, !!params.includeTransactions]);
        } else if (params.blockHash) {
          return this._sdk.eth.getBlockByHash([params.blockHash, !!params.includeTransactions]);
        }
        return logger.throwError('Invalid getBlock arguments', Logger.errors.INVALID_ARGUMENT, params);

      case 'getTransaction':
        return this._sdk.eth.getTransactionByHash([params.transactionHash]);

      case 'getTransactionReceipt':
        return this._sdk.eth.getTransactionReceipt([params.transactionHash]);

      case 'call': {
        const hexlifyTransaction = getStatic<
          (t: TransactionRequest, a?: { [key: string]: boolean }) => { [key: string]: string }
        >(this.constructor, 'hexlifyTransaction');

        return this._sdk.eth.call([hexlifyTransaction(params.transaction, { from: true }), params.blockTag]);
      }

      case 'getLogs':
        if (params.filter && params.filter.address != null) {
          params.filter.address = getLowerCase(params.filter.address);
        }
        return this._sdk.eth.getPastLogs([params.filter]);

      default:
        logger.throwError(method + ' not implemented', Logger.errors.NOT_IMPLEMENTED, { operation: method });
        break;
    }
  }

  // eslint-disable-next-line
  async perform(method: string, params: any): Promise<any> {
    try {
      return await this.send(method, params);
    } catch (error) {
      return checkError(method, error);
    }
  }

  // Convert an ethers.js transaction into a JSON-RPC transaction
  //  - gasLimit => gas
  //  - All values hexlified
  //  - All numeric values zero-striped
  //  - All addresses are lowercased
  // NOTE: This allows a TransactionRequest, but all values should be resolved
  //       before this is called
  // @TODO: This will likely be removed in future versions and prepareRequest
  //        will be the preferred method for this.
  static hexlifyTransaction(
    transaction: TransactionRequest,
    allowExtra?: { [key: string]: boolean },
  ): { [key: string]: string } {
    // Check only allowed properties are given
    const allowed = shallowCopy(allowedTransactionKeys);
    if (allowExtra) {
      for (const key in allowExtra) {
        if (allowExtra[key]) {
          allowed[key] = true;
        }
      }
    }
    checkProperties(transaction, allowed);

    const result: { [key: string]: string } = {};

    // Some nodes (INFURA ropsten; INFURA mainnet is fine) do not like leading zeros.
    ['gasLimit', 'gasPrice', 'nonce', 'value'].forEach(function (key) {
      // eslint-disable-next-line
      if ((<any>transaction)[key] == null) {
        return;
      }
      // eslint-disable-next-line
      const value = hexValue((<any>transaction)[key]);
      if (key === 'gasLimit') {
        key = 'gas';
      }

      result[key] = value;
    });

    ['from', 'to', 'data'].forEach(function (key) {
      // eslint-disable-next-line
      if ((<any>transaction)[key] == null) {
        return;
      }

      // eslint-disable-next-line
      result[key] = hexlify((<any>transaction)[key]);
    });

    return result;
  }
}
