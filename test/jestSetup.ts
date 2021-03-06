import { GlobalWithFetchMock } from 'jest-fetch-mock';
import { NativeModules } from 'react-native';
/**
 * monkey patching the locale to avoid the error:
 * Something went wrong initializing the native ReactLocalization module
 * https://gist.github.com/MoOx/08b465c3eac9e36e683929532472d1e0
 */

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: (): any => ({
    navigation: jest.fn(),
    goBack: jest.fn(),
  }),
}));

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

// @ts-ignore
customGlobal.matchMedia = (): object => {
  return {
    matches: true,
  };
};
