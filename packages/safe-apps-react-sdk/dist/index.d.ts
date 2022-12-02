import { ReactElement } from 'react';
import SafeAppsSDK, { Opts as SDKOpts, SafeInfo } from '@gnosis.pm/safe-apps-sdk';
type SafeReactSDKContext = {
    sdk: SafeAppsSDK;
    connected: boolean;
    safe: SafeInfo;
};
interface Props {
    loader?: ReactElement;
    opts?: SDKOpts;
    children: React.ReactNode;
}
export declare const SafeProvider: React.FC<Props>;
export declare const useSafeAppsSDK: () => SafeReactSDKContext;
export default SafeProvider;
