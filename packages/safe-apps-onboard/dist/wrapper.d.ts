import { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { Initialization, API, ConfigOptions, UserState } from 'bnc-onboard/dist/src/interfaces';
export declare class OnboardWrapper implements API {
    private sdk;
    private onboardApi;
    private subscriptions?;
    private safe;
    private state;
    constructor(options: Initialization);
    connectedSafe(timeout?: number): Promise<SafeInfo | undefined>;
    checkSafeApp(): Promise<void>;
    reset(): void;
    walletSelect(autoSelectWallet?: string): Promise<boolean>;
    walletCheck(): Promise<boolean>;
    walletReset(): void;
    accountSelect(): Promise<boolean>;
    config(options: ConfigOptions): void;
    getState(): UserState;
}
