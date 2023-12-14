import { encodeFunctionData } from 'viem'
import { BaseTransaction, TokenBalance, TokenType } from '@safe-global/safe-apps-sdk'
import { ERC_20_ABI } from '../abis/erc20'

function encodeERC20TransferData(recipient: string, amount: string): string {
  return encodeFunctionData({
    abi: ERC_20_ABI,
    functionName: 'transfer',
    args: [recipient, amount],
  })
}

function getTransferTransaction(item: TokenBalance, recipient: string): BaseTransaction {
  if (item.tokenInfo.type === TokenType.NATIVE_TOKEN) {
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
    data: encodeERC20TransferData(recipient, item.balance),
  }
}

export { getTransferTransaction }
