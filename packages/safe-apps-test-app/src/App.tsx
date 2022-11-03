import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner, Heading, SegmentedControl } from 'evergreen-ui';
import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { AppTabs } from './types';
import Main from './tabs/Main';
import RpcCalls from './tabs/RpcCalls';

const Container = styled.div`
  padding: 24px;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const tabs = [
  {
    value: '0',
    label: 'main',
  },
  { value: '1', label: 'RPC' },
];

const SDK = new SafeAppsSDK();

const App = (): React.ReactElement => {
  const [safeInfo, setSafeInfo] = useState<SafeInfo | undefined>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        console.log('fine');
      })
      .catch(function (err) {
        console.error(err);
      });

    async function loadSafeInfo() {
      const safuInfo = await SDK.safe.getInfo()
      const chainInfo = await SDK.safe.getChainInfo()
      console.log({ safuInfo, chainInfo })
      setSafeInfo(safuInfo)
    }
    loadSafeInfo();
  }, []);

  const [currentTab, setCurrentTab] = useState<string>('0');

  if (!safeInfo) {
    return <Spinner size={24} />;
  }

  return (
    <Container>
      <Heading size={700} marginTop="default">
        Gnosis Safe Test App
      </Heading>
      <SegmentedControl
        value={currentTab}
        onChange={(val) => setCurrentTab(val as AppTabs)}
        options={tabs}
      />

      {currentTab === '0' && <Main sdk={SDK} safeInfo={safeInfo} />}
      {currentTab === '1' && <RpcCalls sdk={SDK} />}
    </Container>
  );
};

export default App;
