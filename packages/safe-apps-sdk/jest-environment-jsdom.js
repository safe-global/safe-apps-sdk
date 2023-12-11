// https://github.com/paralleldrive/cuid2/issues/44#issuecomment-1531731695
import { TextEncoder, TextDecoder } from 'util';
import jestEnvironmentJsDom from 'jest-environment-jsdom';

// jest-environment-jsdom attaches properties to exports object so it needs to be imported like this
const { default: $JSDOMEnvironment, TestEnvironment: JSDOMTestEnvironment } = jestEnvironmentJsDom;

class JSDOMEnvironment extends $JSDOMEnvironment {
  constructor(...args) {
    const { global } = super(...args);
    global.Uint8Array = Uint8Array;
    if (!global.TextEncoder) global.TextEncoder = TextEncoder;
    if (!global.TextDecoder) global.TextDecoder = TextDecoder;
  }
}

export const TestEnvironment = JSDOMTestEnvironment === $JSDOMEnvironment ? JSDOMEnvironment : JSDOMTestEnvironment;

export default JSDOMEnvironment;
