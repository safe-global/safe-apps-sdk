import { METHODS } from '../communication/methods';
import { Communicator, SafeInfo } from '../types';

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

  async getSafeBalances(): Promise<any> {
    const response = await this.communicator.send<'getSafeBalances', undefined, any>(
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
