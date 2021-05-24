import { Communicator, SafeInfo, SafeBalances, GetBalanceParams } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getInfo(): Promise<SafeInfo>;
    getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
}
export { Safe };
