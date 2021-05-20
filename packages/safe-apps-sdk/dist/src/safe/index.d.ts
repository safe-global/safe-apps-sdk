import { Communicator, SafeInfo, SafeBalances } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getInfo(): Promise<SafeInfo>;
    getBalances(): Promise<SafeBalances>;
}
export { Safe };
