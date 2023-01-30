import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
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

const defaultChains = [mainnet, goerli];
const alchemyId = process.env.REACT_APP_ALCHEMY_ID || 'UuUIg4H93f-Bz5qs91SuBrro7TW3UShO';

const { chains, provider } = configureChains(defaultChains, [alchemyProvider({ apiKey: alchemyId })]);

const client = createClient({
  connectors: [
    new SafeConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
);

reportWebVitals();
