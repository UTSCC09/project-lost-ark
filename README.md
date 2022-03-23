# CSCC09 Final Project - Beta Version

## Proposal

The proposal README can be found [here](https://github.com/UTSCC09/project-lost-ark/blob/main/README-PROPOSAL.md).

## Beta Version

Our final project beta version is deployed at http://c09-xiegary.utsc-labs.utoronto.ca/ using Docker.
We will migrate our deployment to DigitalOcean and setup HTTPS for the final version.

### Features

We have finished the following features:

- Authentication (User Signup and Signin)
- Connect to third-party API to track cryptocurrency market data (https://www.coingecko.com/en/api)
- User wallet balance
  - Keep track of the amount of coins that the user owns and their money
  - Summarize the account's total value
- Add ability for each user to buy and sell coins

WIP Features (started but not finished):

- Graph of historical user account balance
  - The current UI is showing dummy data in the graph, it is not connected to the backend
