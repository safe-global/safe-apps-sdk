import { METHODS } from '../communication/methods';
import { Communicator, SafeInfo, SafeBalances } from '../types';

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

  async getSafeBalances(): Promise<SafeBalances> {
    const response = await this.communicator.send<'getSafeBalances', undefined, SafeBalances>(
      METHODS.getSafeBalances,
      undefined,
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export { Safe };
