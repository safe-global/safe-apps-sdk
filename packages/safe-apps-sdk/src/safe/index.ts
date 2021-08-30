import { ethers } from 'ethers';
import { Methods } from '../communication/methods';
import { RPC_CALLS } from '../eth/constants';
import { Communicator, SafeInfo, SafeBalances, GetBalanceParams, RPCPayload, TransactionConfig } from '../types';
import { EIP_1271_INTERFACE, EIP_1271_BYTES_INTERFACE, MAGIC_VALUE_BYTES, MAGIC_VALUE } from './signatures';

class Safe {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
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

  async calculateSafeMessageHash(messageBytes: string): Promise<string> {
    const safeInfo = await this.getInfo();
    const EIP712_SAFE_MESSAGE_TYPE = {
      // "SafeMessage(bytes message)"
      SafeMessage: [{ type: 'bytes', name: 'message' }],
    };

    return ethers.utils._TypedDataEncoder.hash(
      { verifyingContract: safeInfo.safeAddress, chainId: safeInfo.chainId },
      EIP712_SAFE_MESSAGE_TYPE,
      {
        message: messageBytes,
      },
    );
  }

  private async check1271Signature(messageHash: string, signature = '0x'): Promise<boolean> {
    const safeInfo = await this.getInfo();

    const encodedIsValidSignatureCall = EIP_1271_INTERFACE.encodeFunctionData('isValidSignature', [
      messageHash,
      signature,
    ]);

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

    const response = await this.communicator.send<Methods.rpcCall, RPCPayload<[TransactionConfig, string]>, string>(
      Methods.rpcCall,
      payload,
    );

    return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
  }
  private async check1271SignatureBytes(messageHash: string, signature = '0x'): Promise<boolean> {
    const safeInfo = await this.getInfo();

    const encodedIsValidSignatureCall = EIP_1271_BYTES_INTERFACE.encodeFunctionData('isValidSignature', [
      messageHash,
      signature,
    ]);

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

    const response = await this.communicator.send<Methods.rpcCall, RPCPayload<[TransactionConfig, string]>, string>(
      Methods.rpcCall,
      payload,
    );

    return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
  }

  async isMessageSigned(messageHash: string, signature = '0x'): Promise<boolean> {
    const checks = [
      this.check1271Signature(messageHash, signature),
      this.check1271SignatureBytes(messageHash, signature),
    ];
    try {
      for (const check of checks) {
        const isValid = await check;
        if (isValid) {
          return true;
        }
      }
    } finally {
      return false;
    }
  }
}

export { Safe };
