import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';
import { useProviderStore } from 'src/stores/provider';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';
import { SafeApp } from 'src/types/apps';
import { useAppCommunicator } from './communicator';

const SIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

const AppIframe = ({ url, app }: { url: string; app: SafeApp }): React.ReactElement => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const communicator = useAppCommunicator(iframeRef, app);
  const networkId = useProviderStore((state) => state.networkId);
  const {
    params: { safeAddress },
  } = useRouteMatch<{ safeAddress: string }>();

  communicator?.on('getSafeInfo', () => ({
    safeAddress,
    network: ETHEREUM_NETWORK_TO_ID[networkId],
  }));

  return <SIframe title="Safe App iframe" src={url} ref={iframeRef} />;
};

export { AppIframe };
