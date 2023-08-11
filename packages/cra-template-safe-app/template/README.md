# My Safe App

## Getting Started

Install dependencies and start a local dev server.

```
yarn install
cp .env.sample .env
yarn start
```

Then:

- If HTTPS is used (by default enabled)
  - Open your Safe app locally (by default via https://localhost:3000/) and accept the SSL error.
- Go to the [Safe web interface](https://app.safe.global)
- Create your test safe
- Go to Apps -> Manage Apps -> Add Custom App
- Paste your localhost URL, default is https://localhost:3000/
- You should see Safe App Starter as a new app
- Develop your app from there

## Features

Safe App Starter combines recommendations described in the following repositories:

- [Safe Apps SDK](https://github.com/safe-global/safe-apps-sdk)
- [safe-react-components](https://github.com/safe-global/safe-react-components)

You can use the `useSafe` React hook to interact with the Safe Apps SDK

```
const safe = useSafe();
console.log(safe.info);
```

Safe React Components are also integrated and ready to use. [See all components](https://components.safe.global/).

## Dependencies

### Included
- [`@safe-global/safe-react-components`](https://github.com/safe-global/safe-react-components) (Safe{Wallet} theming for @mui/material@v5 and useful UI components)
- [`@safe-global/safe-apps-react-sdk`](https://github.com/safe-global/safe-apps-sdk/tree/main/packages/safe-apps-react-sdk) (React hook for the Safe Apps SDK)

### Recommended
- [`ethers`](https://github.com/ethers-io/ethers.js) (Library for interacting with Ethereum)
- [`web3`](https://github.com/ethereum/web3.js/) (Library for interacting with Ethereum)
- [`viem`](https://github.com/wagmi-dev/viem) (Typerscript library for interacting with Ethereum)
- [`@studydefi/money-legos`](https://github.com/studydefi/money-legos) (Library for DeFi interactions)
