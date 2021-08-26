import { Methods } from '../communication/methods';
import { Communicator, SafeInfo, SafeBalances, GetBalanceParams } from '../types';

const EIP712_SAFE_MESSAGE_TYPE = {
  // "SafeMessage(bytes message)"
  SafeMessage: [{ type: 'bytes', name: 'message' }],
};

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

  async calculateSafeMessageHash(safe: Contract, message: string, chainId: BigNumberish): string {
    return utils._TypedDataEncoder.hash({ verifyingContract: safe.address, chainId }, EIP712_SAFE_MESSAGE_TYPE, {
      message,
    });
  }

  async isMessageSigned(messageHash: string): Promise<boolean> {}
}

export { Safe };
