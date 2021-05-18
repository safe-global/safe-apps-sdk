import { Initialization, API, ConfigOptions, UserState } from 'bnc-onboard/dist/src/interfaces';
export declare class OnboardWrapper implements API {
    private sdk;
    private triedToConnect;
    private onboardApi;
    private subscriptions?;
    private safe;
    private state;
    constructor(options: Initialization);
    private connectToSafe;
    isSafeApp(): Promise<boolean>;
    private setOnboardState;
    reset(): void;
    walletSelect(autoSelectWallet?: string): Promise<boolean>;
    walletCheck(): Promise<boolean>;
    walletReset(): void;
    accountSelect(): Promise<boolean>;
    config(options: ConfigOptions): void;
    getState(): UserState;
}
