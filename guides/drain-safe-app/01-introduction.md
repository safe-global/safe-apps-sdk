# State of Ethereum accounts

Most users of Ethereum are used to a single key wallet, often referred to as an externally owned account (EOA). These accounts are secured with a private key, which is the single point of failure. If you lose it, you cannot access the funds anymore. If that private key is compromised in any way, someone can steal the funds. If your business comprises more than 1 person, externally owned accounts are not secure to manage your crypto business's funds.
Furthermore, if an employee goes rogue or is careless with the private key, the funds are gone forever. So, even if your business is made up of just yourself, We'd argue it's still a poor way to manage funds. So, what is the better solution?

# What is Gnosis Safe?

Gnosis Safe is a smart contract wallet running on Ethereum that requires a minimum number of people to approve a transaction before it can occur (M-of-N). So if, for example, you have 3 main stakeholders in your business, you can set up the wallet to require approval from all 3 people for the transaction. It assures that no single person could compromise the funds.

On top of that, Gnosis Safe gives you complete self custody over your funds. So there is no risk of a bank giving you a hassle for running a crypto business, and the smart contract that is deployed is completely trustless and in your control. Out contracts secure over 90B$ of funds.

From a developer's perspective, the Safe is a platform with possibilities limited by one's imagination. On a contract level, you can customize and extend functionality by using modules. Modules are smart contracts that implement a concrete Safe's functionality separating its logic from the Safe's contract.

In our web app, we also have the Safe Apps. They're 3rd party web applications that can be opened inside our app and interact with the Safe wallet. You can check out [this talk](https://youtu.be/1GirpNHZPJM?t=172) to learn more.

Whatever niche you want to target: DAOs, Advanced Crypto Fund Managers - we got you covered.

Example of projects building on top of the Gnosis Safe:

- https://gnosisguild.mirror.xyz/
- https://techcrunch.com/2021/10/01/utopia-labs-is-building-an-operating-system-for-daos/
- https://multis.co/

# What are we building?

This tutorial will build a Safe App that enables us to migrate all the assets from a Safe to any other different wallets in a single transaction. This tutorial doesn't include NFTs, but this is a great thing to do on your own. In addition, you will learn about smart contract wallets, multi-signature transaction flow, and batched transactions.

The tutorial contains several sections:

- Bootstrapping the Safe App
- Retrieving the assets
- Preparing the transaction and sending it
- Additional: tracking the transaction progress

# Prerequisites

We'll assume that you are familiar with TypeScript (JavaScript), React, and Ethereum and have `node.js` and `npm` installed.

# Help

If you need help, you can reach Gnosis Safe developers in the #safe-developers channel in https://chat.gnosis.io/ or create a discussion in https://github.com/gnosis/safe-apps-sdk/discussions.
