# Safe Apps Developer Tools Monorepo

[![Logo](https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/logo.png)](https://gnosis.pm/)
[![Build Status](https://travis-ci.org/gnosis/safe-apps-sdk.svg?branch=master)](https://travis-ci.org/gnosis/pm-contracts)

Developer tools to integrate third-party applications (Safe Apps) with Safe Multisig (https://gnosis-safe.io/app/).

You can find more resources on Safe Apps in the [Gnosis Safe Developer Portal](https://docs.gnosis.io/safe/docs/sdks_safe_apps/).

## Packages

| Package                                                                                                     | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| [cra-template-safe-app](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/cra-template-safe-app) | CRA template to quickly bootstrap a Safe app                                                                |
| [safe-apps-react-sdk](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-react-sdk)     | A wrapper of safe-apps-sdk with helpful hooks                                                               |
| [safe-apps-sdk](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-sdk)                 | JavaScript SDK                                                                                              |
| [safe-apps-provider](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-provider)       | A generic provider that can be used with common web3 libraries                                              |
| [safe-apps-onboard](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-onboard)         | A wrapper around Onboard.js that would automatically connect to the Safe if the app is loaded as a Safe app |
| [safe-apps-web3modal](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-web3modal)     | A wrapper around Web3modal that would automatically connect to the Safe if the app is loaded as a Safe app  |
| [safe-apps-web3-react](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-web3-react)   | A web-react connector for Safe Apps                                                                         |

## Setting up development environment

### Installing dependencies

```
npm i -g lerna
yarn global add lerna

lerna bootstrap
```

### Running commands

We will use `build` command as an example. Same applies to other commands.

For all packages:

```
lerna run build
```

For a specific package:

```
lerna run --scope @gnosis.pm/safe-apps-sdk build --stream
```

`--stream` options enables command output. By default, lerna displays it only in case of an error.

## Useful links

- [Start a new project using the Safe App React template](https://github.com/gnosis/safe-app-template)
- [Video introduction to Building with Safe Apps SDK & Contract Proxy Kit](https://www.youtube.com/watch?v=YGw8WfBw5OI)
