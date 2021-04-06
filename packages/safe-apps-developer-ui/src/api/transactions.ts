import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { ethers } from 'ethers';

const AbiCoder = new ethers.utils.AbiCoder();

const encodeMultiSendCall = (
  signer: ethers.providers.JsonRpcSigner,
  multiSendAddress: string,
  txs: Transaction[],
): string => {
  const multiSend = new ethers.Contract(multiSendAddress, MultiSendSol.abi, signer);

  const joinedTxs = txs
    .map((tx) =>
      [
        AbiCoder.encode(['uint8'], [0]).slice(-2),
        AbiCoder.encode(['address'], [tx.to]).slice(-40),
        AbiCoder.encode(['uint256'], [tx.value]).slice(-64),
        AbiCoder.encode(['uint256'], [ethers.utils.arrayify(tx.data).length]).slice(-64),
        tx.data.replace(/^0x/, ''),
      ].join(''),
    )
    .join('');

  const encodedMultiSendCallData = multiSend.encodeFunctionData('multiSend', [`0x${joinedTxs}`]);

  return encodedMultiSendCallData;
};

export { encodeMultiSendCall };
