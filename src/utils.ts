import pkg from '../package.json';

export const getSDKVersion = (): string => pkg.version;
