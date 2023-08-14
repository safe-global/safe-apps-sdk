// https://github.com/paralleldrive/cuid2/issues/44#issuecomment-1531731695
const { TextEncoder, TextDecoder } = require('util')
const { default: $JSDOMEnvironment, TestEnvironment } = require('jest-environment-jsdom')

Object.defineProperty(exports, '__esModule', {
  value: true,
})

class JSDOMEnvironment extends $JSDOMEnvironment {
  constructor(...args) {
    const { global } = super(...args)
    global.Uint8Array = Uint8Array
    if (!global.TextEncoder) global.TextEncoder = TextEncoder
    if (!global.TextDecoder) global.TextDecoder = TextDecoder
  }
}

exports.default = JSDOMEnvironment
exports.TestEnvironment = TestEnvironment === $JSDOMEnvironment ? JSDOMEnvironment : TestEnvironment
