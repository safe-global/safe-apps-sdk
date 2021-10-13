import { AbiItem } from 'web3-utils'

const ERC_20_ABI: { [key: string]: AbiItem } = {
  transfer: {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
}

export { ERC_20_ABI }
