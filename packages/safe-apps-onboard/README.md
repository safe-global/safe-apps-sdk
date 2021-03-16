# Safe Apps Onboard

This is a wrapper around [Onboard](https://github.com/blocknative/onboard) that adds Safe Apps support.

If the app using the wrapper is run as a Safe App the `walletSelect` method will automatically connect to the Safe App.

### How to use

- Install the package and its dependencies

```
npm i @gnosis.pm/safe-apps-onboard @gnosis.pm/safe-apps-sdk bnc-onboard 

yarn add @gnosis.pm/safe-apps-onboard @gnosis.pm/safe-apps-sdk bnc-onboard 
```


- Setup Safe App
  - See https://docs.gnosis.io/safe/docs/sdks_safe_apps/


- Use `Onboard` from `safe-apps-onboard` instead from `bnc-onboard`

```js
import Onboard from 'safe-apps-onboard'

export const onboard = Onboard(onboardOptions)
```
