import { Communicator, SafeInfo, SafeBalances } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getInfo(): Promise<SafeInfo>;
    getBalances({ currency }: {
        currency: string;
    }): Promise<SafeBalances>;
}
export { Safe };
