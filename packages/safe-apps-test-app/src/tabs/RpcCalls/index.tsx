import React from 'react';
import SdkInstance from '@gnosis.pm/safe-apps-sdk';
import GetBalance from './GetBalance';
import GetCode from './GetCode';
import GetStorageAt from './GetStorageAt';
import GetPastLogs from './GetPastLogs';
import GetBlockByHash from './GetBlockByHash';
import GetBlockByNumber from './GetBlockByNumber';
import Call from './Call';
import GetTransactionReceipt from './GetTransactionReceipt';
import GetTransactionByHash from './GetTransactionByHash';
import GetPermissions from './GetPermissions';
import RequestAddressBook from './RequestAddressBook';
import RequestPermissions from './RequestPermissions';

type OwnProps = {
  sdk: SdkInstance;
};

const RpcCalls = ({ sdk }: OwnProps) => (
  <div>
    <GetPermissions sdk={sdk} />
    <hr />
    <RequestPermissions sdk={sdk} />
    <hr />
    <RequestAddressBook sdk={sdk} />
    <hr />
    <GetBalance sdk={sdk} />
    <hr />
    <GetCode sdk={sdk} />
    <hr />
    <GetStorageAt sdk={sdk} />
    <hr />
    <Call sdk={sdk} />
    <hr />
    <GetPastLogs sdk={sdk} />
    <hr />
    <GetBlockByHash sdk={sdk} />
    <hr />
    <GetBlockByNumber sdk={sdk} />
    <hr />
    <GetTransactionReceipt sdk={sdk} />
    <hr />
    <GetTransactionByHash sdk={sdk} />
  </div>
);

export default RpcCalls;
