import { encodeFunctionData, Address, hashMessage, hashTypedData } from 'viem';
import { MAGIC_VALUE_BYTES, MAGIC_VALUE } from './signatures.js';
import { Methods } from '../communication/methods.js';
import { RPC_CALLS } from '../eth/constants.js';
import {
  Communicator,
  SafeInfo,
  ChainInfo,
  SafeBalances,
  GetBalanceParams,
  RPCPayload,
  TransactionConfig,
  EnvironmentInfo,
  AddressBookItem,
  isObjectEIP712TypedData,
  EIP712TypedData,
} from '../types/index.js';
import requirePermission from '../decorators/requirePermissions.js';

class Safe {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getChainInfo(): Promise<ChainInfo> {
    const response = await this.communicator.send<Methods.getChainInfo, undefined, ChainInfo>(
      Methods.getChainInfo,
      undefined,
    );

    return response.data;
  }

  async getInfo(): Promise<SafeInfo> {
    const response = await this.communicator.send<Methods.getSafeInfo, undefined, SafeInfo>(
      Methods.getSafeInfo,
      undefined,
    );

    return response.data;
  }

  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency = 'usd' }: GetBalanceParams = {}): Promise<SafeBalances> {
    const response = await this.communicator.send<Methods.getSafeBalances, { currency: string }, SafeBalances>(
      Methods.getSafeBalances,
      {
        currency,
      },
    );

    return response.data;
  }

  private async check1271Signature(messageHash: string, signature = '0x'): Promise<boolean> {
    const safeInfo = await this.getInfo();

    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: '_dataHash',
              type: 'bytes32',
            },
            {
              name: '_signature',
              type: 'bytes',
            },
          ],
          name: 'isValidSignature',
          outputs: [
            {
              name: '',
              type: 'bytes4',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'isValidSignature',
      args: [messageHash as Address, signature as Address],
    });

    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall,
        },
        'latest',
      ],
    };
    try {
      const response = await this.communicator.send<Methods.rpcCall, RPCPayload<[TransactionConfig, string]>, string>(
        Methods.rpcCall,
        payload,
      );

      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
    } catch (err) {
      return false;
    }
  }

  private async check1271SignatureBytes(messageHash: string, signature = '0x'): Promise<boolean> {
    const safeInfo = await this.getInfo();

    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: '_data',
              type: 'bytes',
            },
            {
              name: '_signature',
              type: 'bytes',
            },
          ],
          name: 'isValidSignature',
          outputs: [
            {
              name: '',
              type: 'bytes4',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'isValidSignature',
      args: [messageHash as Address, signature as Address],
    });

    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall,
        },
        'latest',
      ],
    };

    try {
      const response = await this.communicator.send<Methods.rpcCall, RPCPayload<[TransactionConfig, string]>, string>(
        Methods.rpcCall,
        payload,
      );

      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
    } catch (err) {
      return false;
    }
  }

  calculateMessageHash(message: string): string {
    return hashMessage(message);
  }

  calculateTypedMessageHash(typedMessage: EIP712TypedData): string {
    const chainId =
      typeof typedMessage.domain.chainId === 'object'
        ? typedMessage.domain.chainId.toNumber()
        : Number(typedMessage.domain.chainId);

    let primaryType = typedMessage.primaryType;
    if (!primaryType) {
      const fields = Object.values(typedMessage.types);
      // We try to infer primaryType (simplified ether's version)
      const primaryTypes = Object.keys(typedMessage.types).filter((typeName) =>
        fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace('[', '').replace(']', '') !== typeName)),
      );
      if (primaryTypes.length === 0 || primaryTypes.length > 1) throw new Error('Please specify primaryType');
      primaryType = primaryTypes[0];
    }

    return hashTypedData({
      message: typedMessage.message,
      domain: {
        ...typedMessage.domain,
        chainId,
        verifyingContract: typedMessage.domain.verifyingContract as Address,
        salt: typedMessage.domain.salt as Address,
      },
      types: typedMessage.types,
      primaryType,
    });
  }

  async getOffChainSignature(messageHash: string): Promise<string> {
    const response = await this.communicator.send<Methods.getOffChainSignature, string, string>(
      Methods.getOffChainSignature,
      messageHash,
    );

    return response.data;
  }

  async isMessageSigned(message: string | EIP712TypedData, signature = '0x'): Promise<boolean> {
    let check: (() => Promise<boolean>) | undefined;
    if (typeof message === 'string') {
      check = async (): Promise<boolean> => {
        const messageHash = this.calculateMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }

    if (isObjectEIP712TypedData(message)) {
      check = async (): Promise<boolean> => {
        const messageHash = this.calculateTypedMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (check) {
      const isValid = await check();

      return isValid;
    }

    throw new Error('Invalid message type');
  }

  async isMessageHashSigned(messageHash: string, signature = '0x'): Promise<boolean> {
    const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];

    for (const check of checks) {
      const isValid = await check(messageHash, signature);
      if (isValid) {
        return true;
      }
    }

    return false;
  }

  async getEnvironmentInfo(): Promise<EnvironmentInfo> {
    const response = await this.communicator.send<Methods.getEnvironmentInfo, undefined, EnvironmentInfo>(
      Methods.getEnvironmentInfo,
      undefined,
    );

    return response.data;
  }

  @requirePermission()
  async requestAddressBook(): Promise<AddressBookItem[]> {
    const response = await this.communicator.send<Methods.requestAddressBook, undefined, AddressBookItem[]>(
      Methods.requestAddressBook,
      undefined,
    );

    return response.data;
  }
}

export { Safe };
