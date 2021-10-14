import { AbiItem } from 'web3-utils'
import abiCoder, { AbiCoder } from 'web3-eth-abi'
import { BaseTransaction, TokenBalance } from '@gnosis.pm/safe-apps-sdk'
import { ERC_20_ABI } from '../abis/erc20'

function encodeTxData(method: AbiItem, recipient: string, amount: string): string {
  const coder = abiCoder as unknown as AbiCoder
  return coder.encodeFunctionCall(method, [recipient, amount])
}

function getTransferTransaction(item: TokenBalance, recipient: string): BaseTransaction {
  if (item.tokenInfo.tokenType === 'ETHER') {
    return {
      // Send ETH directly to the recipient address
      to: recipient,
      value: item.balance,
      data: '0x',
    }
  }

  return {
    // For other token types, generate a contract tx
    to: item.tokenInfo.address,
    value: '0',
    data: encodeTxData(ERC_20_ABI.transfer, recipient, item.balance),
  }
}

export { getTransferTransaction }
