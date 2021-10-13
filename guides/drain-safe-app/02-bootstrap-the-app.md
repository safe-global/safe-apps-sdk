# Bootstrap the app

We have a create-react-app template that allows you to get a basic skeleton for the app. It includes React, Typescript, ESLint, Prettier, Material UI. To use it, run this command in your terminal:

```
npx create-react-app drain-safe --template @gnosis.pm/cra-template-safe-app
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
│   ├── GlobalStyle.ts
│   ├── fonts.d.ts
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── setupProxy.js
│   ├── setupTests.ts
│   └── tests
│       └── utils.tsx
├── tsconfig.json
└── yarn.lock
```

Above is a typical React application structure, so everything should be familiar. However, there's one file that's not that common: `setupProxy.js`. When loading the app inside the Safe web interface, we get the app information (name, description, logo) from the `https://app-url.com/manifest.json` file. Because the app is hosted on a different domain, you need to enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for this file. This file does exactly that by setting the necessary headers for the development server. When you deploy an app, you will need to set up the same headers on the hosting platform.

# Load your app inside the Safe interface

You can access our testnet deployment at https://rinkeby.gnosis-safe.io/. If you need rinkeby ETH, you can get it at https://faucet.rinkeby.io/.

First, you need a Safe. Just follow the steps on the welcome page to create one. As soon as it's created, it should take you to a Safe overview page. Next, you need to click on the "Apps" entry in the sidebar on the left.

On this page, you should see a card with a button to add a custom app. Click on that and put your app URL (http://localhost:3000 if you run locally) to the input field. It should pick up your app's name and logo and display them.

Click "add", and now you should see your app on the screen.

If it doesn't load, double-check that your manifest.json file is accessible.

**Tip**: If you want to test your app with some specific safe, you can open the Safe page directly or follow the steps to load it. For example, you can load https://gnosis-safe.io/app/#/safes/0x292BACF82268e143F5195aF6928693699E31F911/balances, and access your app within the Safe page. With read-only access, you are able to access apps via different safes. While you can't send any transactions, you can verify that you assembled the transaction correctly if the transaction modal appears.
