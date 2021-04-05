import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { ethers } from 'ethers';

const encodeMultiSendCall = (signer: ethers.providers.JsonRpcSigner, txs: Transaction[]): string => {
  const multiSend = new web3.eth.Contract(MultiSendSol.abi, MULTI_SEND_ADDRESS);

  const joinedTxs = txs
    .map((tx) =>
      [
        web3.eth.abi.encodeParameter('uint8', 0).slice(-2),
        web3.eth.abi.encodeParameter('address', tx.to).slice(-40),
        web3.eth.abi.encodeParameter('uint256', tx.value).slice(-64),
        web3.eth.abi.encodeParameter('uint256', web3.utils.hexToBytes(tx.data).length).slice(-64),
        tx.data.replace(/^0x/, ''),
      ].join(''),
    )
    .join('');

  const encodedMultiSendCallData = multiSend.methods.multiSend(`0x${joinedTxs}`).encodeABI();

  return encodedMultiSendCallData;
};

export { encodeMultiSendCall };
