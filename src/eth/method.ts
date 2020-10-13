import { SDK_MESSAGES } from '../communication/messageIds';
import { sendMessageToInterface } from '../communication';

type ConstructorOptions = {
  name: string;
  call: string;
  params?: number;
};

interface MethodInterface {
  name: string;
  call: string;
  params?: number;
  // inputFormatter?: Array<(() => void) | null>;
  // outputFormatter?: () => void;
  // transformPayload?: () => void;
  // extraFormatters?: any;
  // defaultBlock?: string;
  // defaultAccount?: string | null;
  // abiCoder?: any;
  // handleRevert?: boolean;
}

class Method implements MethodInterface {
  public name: string;
  public call: string;
  public params?: number;

  constructor(options: ConstructorOptions) {
    this.name = options.name;
    this.call = options.call;
    this.params = options.params || 0;
  }

  public attachToObject(obj: Record<string, () => void>): void {
    obj[this.name] = this.buildFunc();
  }

  private buildFunc() {
    return (params) => {
      const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL);

      return message;
    };
  }
}

export { Method };
