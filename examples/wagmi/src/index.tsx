import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { mainnet, goerli } from 'viem/chains';
import { WagmiConfig, createConfig, configureChains, Connector } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SafeConnector } from 'wagmi/connectors/safe';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { Buffer } from 'buffer';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const WALLETCONNECT_PROJECT_ID = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;

const defaultChains = [mainnet, goerli];

const { chains, publicClient } = configureChains(defaultChains, [publicProvider()]);

let connectors: Connector[] = [
  new SafeConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
];

if (WALLETCONNECT_PROJECT_ID) {
  // A WalletConnect ID is provided so we add the Connector for testing purposes
  connectors = [
    ...connectors,
    new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLETCONNECT_PROJECT_ID,
      },
    }),
  ];
}

const config = createConfig({
  connectors: connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
);

reportWebVitals();
