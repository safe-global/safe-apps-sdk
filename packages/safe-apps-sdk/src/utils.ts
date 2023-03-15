import pkg from '../package.json';

export const getSDKVersion = (): string => {
  // Strip out version tags like `beta.0` in `1.0.0-beta.0`
  return pkg.version.split('-')[0];
};
