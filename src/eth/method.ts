type ConstructorOptions = {
  name: string;
  call: string;
};

interface MethodInterface {
  name: string;
  call: string;
  params?: number;
  inputFormatter?: Array<(() => void) | null>;
  outputFormatter?: () => void;
  transformPayload?: () => void;
  extraFormatters?: any;
  defaultBlock?: string;
  defaultAccount?: string | null;
  abiCoder?: any;
  handleRevert?: boolean;
}

class Method implements MethodInterface {
  constructor(options: ConstructorOptions) {
    this.name = options.name;
    this.call = options.call;
  }
}

export { Method };
