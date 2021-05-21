import { METHODS } from '../communication/methods';
import { Communicator, SafeInfo, SafeBalances } from '../types';

type GetBalanceParams = { currency?: string };

class Safe {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getInfo(): Promise<SafeInfo> {
    const response = await this.communicator.send<'getSafeInfo', undefined, SafeInfo>(METHODS.getSafeInfo, undefined);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }

  async getBalances({ currency = 'usd' }: GetBalanceParams = {}): Promise<SafeBalances> {
    const response = await this.communicator.send<'getSafeBalances', { currency: string }, SafeBalances>(
      METHODS.getSafeBalances,
      {
        currency,
      },
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export { Safe };
