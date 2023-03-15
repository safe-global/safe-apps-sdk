import { getSDKVersion } from './utils';

describe('Utils tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('getSDKVersion', () => {
    test('Should return a plain version unmodified', () => {
      // Mock package.json
      jest.mock('../package.json', () => ({
        version: '7.0.1',
      }));

      expect(getSDKVersion()).toBe('7.0.1');
    });

    test('Should strip the tag from a tagged version', () => {
      // Mock package.json
      jest.mock('../package.json', () => ({
        version: '8.0.0-alpha.1',
      }));
      expect(getSDKVersion()).toBe('8.0.0');
    });
  });
});
