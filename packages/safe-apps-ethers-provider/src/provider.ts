import { BaseProvider, TransactionRequest, Network, TransactionResponse, BlockTag } from '@ethersproject/providers';
import { checkProperties, getStatic, shallowCopy, Deferrable, resolveProperties } from '@ethersproject/properties';
import { Signer } from '@ethersproject/abstract-signer';
import { hexlify, hexValue, isHexString } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { convertSafeTxToEthersTx, getLowerCase, poll, EthError } from './utils';

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
function checkError(method: string, error: any, params?: any): any {
  // Undo the "convenience" some nodes are attempting to prevent backwards
  // incompatibility; maybe for v6 consider forwarding reverts as errors
  if (method === 'call' && error.code === Logger.errors.SERVER_ERROR) {
    const e = error.error;
    if (e && e.message.match('reverted') && isHexString(e.data)) {
      return e.data;
    }
  }

  // making typescript happy
  console.log({ params });

  throw error;
}

export class SafeAppsSdkSigner extends Signer {
  readonly provider: SafeAppsSdkProvider;
  readonly _address: string;

  constructor(safe: SafeInfo, sdk: SafeAppsSDK) {
    logger.checkNew(new.target, SafeAppsSdkSigner);

    super();

    this.provider = new SafeAppsSdkProvider(safe, sdk);
    this._address = safe.safeAddress;
  }

  async getAddress(): Promise<string> {
    const address = this.provider.formatter.address(this._address);

    return address;
  }

  connect(): SafeAppsSdkSigner {
    return logger.throwError('cannot create a new connection', Logger.errors.UNSUPPORTED_OPERATION, {
      operation: 'connect',
    });
  }

  async signMessage(): Promise<string> {
    return logger.throwError('signing messages is not supported', Logger.errors.UNSUPPORTED_OPERATION, {
      operation: 'connect',
    });
  }

  signTransaction(): Promise<string> {
    return logger.throwError('signing transactions is not supported', Logger.errors.UNSUPPORTED_OPERATION, {
      operation: 'signTransaction',
    });
  }

  sendUncheckedTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
    transaction = shallowCopy(transaction);

    const fromAddress = this.getAddress().then((address) => getLowerCase(address));

    return resolveProperties({
      tx: resolveProperties(transaction),
      sender: fromAddress,
    }).then(({ tx, sender }) => {
      if (tx.from != null) {
        if (tx.from.toLowerCase() !== sender) {
          logger.throwArgumentError('from address mismatch', 'transaction', transaction);
        }
      } else {
        tx.from = sender;
      }

      if (typeof tx.value === 'undefined') {
        tx.value = 0;
      }

      const hexTx = SafeAppsSdkProvider.hexlifyTransaction(tx, { from: true });

      return this.provider.send('sendTransaction', [hexTx]).then(
        (hash) => {
          return hash;
        },
        (error) => {
          return checkError('sendTransaction', error, hexTx);
        },
      );
    });
  }

  sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
    return this.sendUncheckedTransaction(transaction).then((hash) => {
      return poll<TransactionResponse>(() => this.provider.getTransaction(hash))
        .then((tx: TransactionResponse) => {
          return this.provider._wrapTransaction(tx, hash);
        })
        .catch((error: EthError) => {
          error.transactionHash = hash;
          throw error;
        });
    });
  }
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

  getSigner(): SafeAppsSdkSigner {
    return new SafeAppsSdkSigner(this._safe, this._sdk);
  }

  // eslint-disable-next-line
  async send(method: string, params: any): Promise<any> {
    switch (method) {
      case 'sendTransaction':
        const tx = await this._sdk.txs.send({ txs: params });

        return tx.safeTxHash;

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

  async call(transaction: Deferrable<TransactionRequest>, blockTag?: BlockTag): Promise<string> {
    return this.perform('call', { transaction, blockTag });
  }

  async getTransaction(safeTxHash: string): Promise<TransactionResponse> {
    const tx = await this._sdk.txs.getBySafeTxHash(safeTxHash);

    return convertSafeTxToEthersTx(tx);
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
    (['gasLimit', 'gasPrice', 'nonce', 'value'] as const).forEach(function (key) {
      if (transaction[key] == null) {
        return;
      }

      const value = hexValue(transaction[key] ?? '');
      let property: typeof key | 'gas' = key;
      if (property === 'gasLimit') {
        property = 'gas';
      }

      result[key] = value;
    });

    (['from', 'to', 'data'] as const).forEach(function (key) {
      if (transaction[key] == null) {
        return;
      }

      result[key] = hexlify(transaction[key] ?? '');
    });

    return result;
  }
}
