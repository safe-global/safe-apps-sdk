import React from 'react';
import styled from 'styled-components';
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

  return <SIframe title="Safe App iframe" src={url} ref={iframeRef} />;
};

export { AppIframe };
