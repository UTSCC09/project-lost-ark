# CSCC09 Final Project
## Coin Ark

The title for our CSCC09 final project is <b>Coin Ark</b>.

## Team Members

- [Gary Xie](https://github.com/GaryJX)
- [Andy Huang](https://github.com/ele7087)

## Description

Coin Ark is a cryptocurrency trading simulator platform that allows users to practice trading with cryptocurrencies without using real money.
## Key Features by Beta Version

- Authentication (User Signup and Signin)
- Connect to third-party API to track cryptocurrency market data (https://www.coingecko.com/en/api/pricing)
- User wallet balance
  - Keep track of the amount of coins that the user owns and their money
  - Summarize the account's total value
- Add ability for each user to buy and sell coins

## Additional Features by Final Version

- Show graphical representation of each coin's historical value
  - Allow filtering by past year, month, day
- Show graphical representation of each user's historical daily account balance
  - Allow filtering by past year, month, day
- Add ability to convert between coins directly
- Add OAuth providers for authentication (e.g. Google, Github, etc.)

## Technology Stack

### Frontend

- React (Next.js)
- TypeScript
- SCSS
- UI Framework (TODO)
- GraphQL

### Backend

- Node.js + Express.js
- JavaScript
- MongoDB
- GraphQL
- Third-Party Cryptocurrency Market API ([Coin Gecko](https://www.coingecko.com/en/api/pricing))

## Top 5 Technical Challenges

1. Learn how to use GraphQL (neither of us have experience with it)
2. Graphing the historical data and filtering by year, month, day 
3. Designing the MongoDB database schema for user's historical account balance
4. Adding OAuth providers for authenticating users
5. Designing an intuitive and clean UI
