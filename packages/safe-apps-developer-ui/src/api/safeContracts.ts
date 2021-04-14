import GnosisSafeSol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafe.json';
import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import ProxyFactorySol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafeProxyFactory.json';
import FallbackHandlerSol from '@gnosis.pm/safe-contracts/build/contracts/FallbackManager.json';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractFactory } from 'ethers';
import { GnosisSafe, GnosisSafeProxyFactory, MultiSend, MasterCopy, FallbackManager } from 'src/types/contracts';

const getProxyFactoryContract = (address: string, signer: JsonRpcSigner): GnosisSafeProxyFactory =>
  new Contract(address, ProxyFactorySol.abi, signer) as GnosisSafeProxyFactory;

const getSafeContract = (address: string, signer: JsonRpcSigner): GnosisSafe =>
  new Contract(address, GnosisSafeSol.abi, signer) as GnosisSafe;

const getMultiSendContract = (address: string, signer: JsonRpcSigner): MultiSend =>
  new Contract(address, MultiSendSol.abi, signer) as MultiSend;

const deployMasterCopy = async (signer: JsonRpcSigner): Promise<MasterCopy> => {
  const factory = new ContractFactory(GnosisSafeSol.abi, GnosisSafeSol.bytecode, signer);
  const masterCopy = await factory.deploy();

  return masterCopy as MasterCopy;
};

const deployProxyFactory = async (signer: JsonRpcSigner): Promise<GnosisSafeProxyFactory> => {
  const factory = new ContractFactory(ProxyFactorySol.abi, ProxyFactorySol.bytecode, signer);
  const proxyFactory = await factory.deploy();

  return proxyFactory as GnosisSafeProxyFactory;
};

const deployFallbackHandler = async (signer: JsonRpcSigner): Promise<FallbackManager> => {
  const factory = new ContractFactory(FallbackHandlerSol.abi, FallbackHandlerSol.bytecode, signer);
  const fallbackHandler = await factory.deploy();

  return fallbackHandler as FallbackManager;
};

const deployMultiSend = async (signer: JsonRpcSigner): Promise<MultiSend> => {
  const factory = new ContractFactory(MultiSendSol.abi, MultiSendSol.bytecode, signer);
  const multiSend = await factory.deploy();

  return multiSend as MultiSend;
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
