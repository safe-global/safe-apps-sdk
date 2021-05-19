import { METHODS } from '../communication/methods';
import { TxServiceModel, SendTransactionsArgs, Communicator, SendTransactionsResponse, SafeInfo } from '../types';

class Safe {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getSafeInfo(): Promise<SafeInfo> {
    const response = await this.communicator.send<'getSafeInfo', undefined, SafeInfo>(METHODS.getSafeInfo, undefined);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export { Safe };
