# Bootstrap the app

We prepared a create-react-app template that allows you to get a basic skeleton for the app. It includes React, Typescript, ESLint, Prettier, Material UI, and styled-components. To use it, run this command in your terminal:

```
npx create-react-app drain-safe --template @safe-global/cra-template-safe-app
cd drain-safe
```

It should create a folder `drain-safe` with the following structure:

```
drain-safe
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo.svg
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── setupProxy.js
│   ├── setupTests.ts
│   └── tests
│       └── utils.tsx
├── tsconfig.json
└── yarn.lock
```

Above is a typical React application structure, so everything should be familiar. However, there's one file that's not that common: `setupProxy.js`. When loading the app inside the Safe web interface, it fetches the app information (name, description, logo) from the `https://app-url.com/manifest.json` file. Because the app is hosted on a different domain, you need to enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for this file. This file does exactly that by setting the necessary headers for the development server. When you deploy an app, you will need to set up the same headers on the hosting platform.

# Load the app inside the Safe interface

You can access our testnet deployment at https://app.safe.global/?chain=gor.

First, you need a Safe. Just follow the steps on the welcome page to create one. As soon as it's created, it should take you to a Safe overview page. Next, you need to click on the "Apps" entry in the sidebar on the left.

![Screenshot of Safe Apps page](/guides/drain-safe-app/images/safe-apps.jpeg)

On this page, you should see a card with a button to add a custom app. Click on that and put your app URL (http://localhost:3000 if you run locally) to the input field. It should pick up your app's name and logo and display them.

![Screenshot of add custom app modal](/guides/drain-safe-app/images/add-custom-app.png)

Click "add", and it should open the app. You'll also find it in the app list from now on

**Tip**: When using the Brave Browser the "Shields" feature has to be deactivated. Otherwise Brave doesn't allow any localhost connections.

![Screenshot of the default template app](/guides/drain-safe-app/images/template-app-view.png)

If it doesn't load, double-check that your manifest.json file is accessible.

**Tip**: If you want to test your app with some specific safe, you can open the Safe page directly or follow the steps to load it. For example, you can load https://app.safe.global/eth:0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7/home, and access your app within the Safe page. With read-only access, you are able to access apps via different safes. While you can't send any transactions, you can verify that you assembled the transaction correctly if the transaction modal appears.

The app should display a button that sends an empty transaction. Click on it and send the transaction to get the feeling of it.

![Screenshot of the default template app](/guides/drain-safe-app/images/test-transaction-modal.png)

# Adding necessary building blocks to the app

You need extra dependencies for the app:

- library with general purpose web3 utilities (viem)

Install them by running this command:

```
npm i viem
```

You also need an ABI for ERC20 token contracts. Create a file `src/abis/erc20.ts`:

```ts
import { Abi } from 'viem'

const ERC_20_ABI: Abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export { ERC_20_ABI }
```

In the next section you'll learn how to fetch and display assets owned by the Safe - [Display Safe Assets](/guides/drain-safe-app/02-display-safe-assets.md).
