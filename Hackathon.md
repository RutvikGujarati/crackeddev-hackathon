## Inspiration/Statement

**API Problems of real world data transferring. Inspired from chainlink functions and graph protocol.**

## What it does?

	*It can simply fetch the api data from the decentralize node. Decentralize api for crackedDev jobs*

## How I built it?

  1. first step is setup of graphql into locally
  2. create foundry project for smart contract for storing api data
  3. create subgraph to interact with UI with api data.
  4. graphql is more helpful in terms of getting data from onchain instead of calling smart contract functions.
  5. index with graph and contract event
  6. create next.js application to interact with jobs.

## Challenges I ran into

- local set-up is always unhealthy
- graphql errors with connecting of smart contract
- next.js running errors
- smart contract compilation errors like "stack out of memory" in event handling


## What I learned

**- I am not so aware with graphql before this hackathone. Now, I can build API with using contract and graphql. Other stuff is Next.js. more familiar with components. upgrade my smart contract creating skills.**

## Feature Of this Decentralize API

1. smart contract is immutable so, there is privacy thing with this API
2. anyTime we update smart contract it can directly fetch data from graphql (add some code into graph folder.)
3. indexing with smart Contract to subgraph to UI
  **UI <-- Subgraph <-- Smart contract**
  
