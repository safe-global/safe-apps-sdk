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

Safe React Components are also integrated and ready to use. [See all components](https://components.gnosis-safe.io/).

## Dependencies

### Included
- [`@gnosis.pm/safe-react-components`](https://github.com/safe-global/safe-react-components) (UI components themed for the Safe interface)
- [`@rmeissner/safe-apps-react-sdk`](https://github.com/rmeissner/safe-sdks-js/tree/836f40652aaf051b50e980f94af644ae6619334f/safe-apps-react-sdk) (React hook for the Safe Apps SDK)

### Recommended
- [`ethers`](https://github.com/ethers-io/ethers.js) (Library for interacting with Ethereum)
- [`web3`](https://github.com/ethereum/web3.js/) (Library for interacting with Ethereum)
- [`@studydefi/money-legos`](https://github.com/studydefi/money-legos) (Library for DeFi interactions)
