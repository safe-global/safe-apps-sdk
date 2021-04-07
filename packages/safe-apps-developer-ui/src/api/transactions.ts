import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { ethers } from 'ethers';

const CALL = 0;
const DELEGATE_CALL = 1;

const encodeMultiSendCall = (
  signer: ethers.providers.JsonRpcSigner,
  multiSendAddress: string,
  txs: Transaction[],
): string => {
  const multiSend = new ethers.Contract(multiSendAddress, MultiSendSol.abi, signer);

  const joinedTxs = txs
    .map((tx) => {
      const data = ethers.utils.arrayify(tx.data);
      const encoded = ethers.utils.solidityPack(
        ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
        [0, tx.to, tx.value, data.length, data],
      );
      return encoded.slice(2);
    })
    .join('');

  const encodedMultiSendCallData = multiSend.interface.encodeFunctionData('multiSend', [`0x${joinedTxs}`]);

  return encodedMultiSendCallData;
};

export { CALL, DELEGATE_CALL, encodeMultiSendCall };
