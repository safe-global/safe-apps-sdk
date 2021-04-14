import GnosisSafeSol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafe.json';
import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import ProxyFactorySol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafeProxyFactory.json';
import FallbackHandlerSol from '@gnosis.pm/safe-contracts/build/contracts/FallbackManager.json';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractFactory } from 'ethers';

const getProxyFactoryContract = (address: string, signer: JsonRpcSigner): Contract =>
  new Contract(address, ProxyFactorySol.abi, signer);

const getSafeContract = (address: string, signer: JsonRpcSigner): Contract =>
  new Contract(address, GnosisSafeSol.abi, signer);

const getMultiSendContract = (address: string, signer: JsonRpcSigner): Contract =>
  new Contract(address, MultiSendSol.abi, signer);

const deployMasterCopy = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(GnosisSafeSol.abi, GnosisSafeSol.bytecode, signer);
  const masterCopy = await factory.deploy();

  return masterCopy;
};

const deployProxyFactory = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(ProxyFactorySol.abi, ProxyFactorySol.bytecode, signer);
  const proxyFactory = await factory.deploy();

  return proxyFactory;
};

const deployFallbackHandler = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(FallbackHandlerSol.abi, FallbackHandlerSol.bytecode, signer);
  const fallbackHandler = await factory.deploy();

  return fallbackHandler;
};

const deployMultiSend = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(MultiSendSol.abi, MultiSendSol.bytecode, signer);
  const multiSend = await factory.deploy();

  return multiSend;
};

export {
  deployProxyFactory,
  deployFallbackHandler,
  deployMasterCopy,
  getSafeContract,
  getProxyFactoryContract,
  getMultiSendContract,
  deployMultiSend,
};
