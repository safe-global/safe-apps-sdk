# Safe Apps Developer Tools Monorepo

[![Logo](https://raw.githubusercontent.com/safe-global/safe-apps-sdk/main/assets/logo.svg)](https://safe.global/)

![license](https://img.shields.io/github/license/safe-global/safe-apps-sdk)

Developer tools to integrate third-party applications (Safe Apps) with Safe (https://app.safe.global/).

You can find more resources on Safe Apps in the [Safe Developer Portal](https://docs.safe.global/safe-core-aa-sdk/safe-apps).

![safeapps_pathways_v4](https://user-images.githubusercontent.com/6764315/123075714-c5564100-d418-11eb-8da0-898aa163dee2.png)

## Packages

| Package                                                       | Description                                                                                                                                       |
|---------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| [cra-template-safe-app](/packages/cra-template-safe-app)      | CRA template to quickly bootstrap a Safe app                                                                                                      |
| [safe-apps-react-sdk](/packages/safe-apps-react-sdk)          | A wrapper of safe-apps-sdk with helpful React Hooks                                                                                               |
| [safe-apps-sdk](/packages/safe-apps-sdk)                      | JavaScript SDK                                                                                                                                    |
| [safe-apps-provider](/packages/safe-apps-provider)            | A generic provider that can be used with common web3 libraries (e.g. web3.js or Ethers)                                                           |
| [safe-apps-onboard](https://onboard.blocknative.com/)         | Blocknative included Safe App support in onboard.js v1.26.0. Check [Blocknative docs](https://onboard.blocknative.com/) for the integration guide |
| [safe-apps-web3modal](/packages/safe-apps-web3modal)          | A wrapper around Web3Modal that would automatically connect to the Safe if the app is loaded as a Safe app                                        |
| [safe-apps-web3-react](https://github.com/Uniswap/web3-react) | A web3-react connector for Safe is included in web3-react starting from version 8                                                                 |
| [safe-apps-wagmi](/packages/safe-apps-wagmi)                  | A wagmi connector for Safe Apps                                                                                                                   |
| [safe-apps-test-app](/packages/safe-apps-test-app)            | A test app to test the Safe Apps SDK                                                                                                              |

## Testing your Safe App

You can directly use [our production interface](https://app.safe.global) for testing your Safe App


## Setting up development environment

### Installing dependencies

```
yarn install
```

### Running commands

We will use `build` command as an example. Same applies to other commands.

For all packages:

```
yarn build
```

For a specific package:

```
yarn lerna run --scope @safe-global/safe-apps-sdk build --stream
```

`--stream` options enables command output. By default, lerna displays it only in case of an error.

## Release process

Release process is described in [releases.md](/docs/releases.md)

## Useful links

- [Making an app to withdraw all assets from a Safe in one transaction - tutorial](/guides/drain-safe-app)
- [Start a new project using the Safe App React template](/packages/cra-template-safe-app)
- [Video introduction to Building with Safe Apps SDK & Contract Proxy Kit](https://www.youtube.com/watch?v=YGw8WfBw5OI)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
