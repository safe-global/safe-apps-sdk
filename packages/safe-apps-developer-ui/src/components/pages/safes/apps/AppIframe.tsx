import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';
import { RPCPayload } from '@gnosis.pm/safe-apps-sdk';
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
  const [networkId, provider] = useProviderStore((state) => [state.networkId, state.provider]);
  const {
    params: { safeAddress },
  } = useRouteMatch<{ safeAddress: string }>();

  React.useEffect(() => {
    communicator?.on('getSafeInfo', () => ({
      safeAddress,
      network: ETHEREUM_NETWORK_TO_ID[networkId],
    }));

    communicator?.on('sendTransactions', (msg) => {
      // @ts-expect-error explore ways to fix this
      openConfirmationModal(msg.data.params.txs as Transaction[], msg.data.params.params, msg.data.id);
    });

    communicator?.on('rpcCall', async (msg) => {
      const params = msg.data.params as RPCPayload;

      try {
        if (provider) {
          const response = await provider.send(params.call, params.params);

          return response;
        }

        throw new Error('Provider unavailable');
      } catch (err) {
        return err;
      }
    });
  }, [communicator, safeAddress, networkId, provider]);

  return <SIframe title="Safe App iframe" src={url} ref={iframeRef} />;
};

export { AppIframe };
