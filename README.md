# Coin Ark

## Project URL

**Frontend:** https://coinark.garyxie.me/

**Backend:** https://api.coinark.garyxie.me/

## Project Video URL

**Youtube Link:** https://youtu.be/DO-WA-WI34Y

## Project Description

Coin Ark is a cryptocurrency trading simulator platform that allows users to practice trading with cryptocurrencies without using real money.

When users sign up for an account, they will start off with an account balance of $10,000 in (mock) cash. They will be able to purchase and sell cryptocurrencies using up-to-date market data from the [Coin Gecko API](https://www.coingecko.com/en/api).

Users will be able to view their historical account balance in the form of a line graph, as well as current and historical market prices for each cryptocurrrency offered by Coin Ark. They can filter the graph by year, month, week, or day, and see the price trends in the selected date range.

## Development

### Frontend

The frontend is built using [React.js](https://reactjs.org/) and [Next.js](https://nextjs.org/), and written in TypeScript. The overall code structure is designed in the form of Components: each component resides in its own folder, alongside any additional styles using SCSS. Other component-agnostic tools, such as global context and utility files are organized in their own folders.

The application uses [Mantine.dev](https://mantine.dev/) as the primary UI component library, alongside [Framer Motion](https://www.framer.com/motion/) for page transitions and [Tabler Icons](https://tablericons.com/) for icons. The data visualization graphs were built using [D3.js](https://d3js.org/).

To connect to the backend, we are using [Apollo GraphQL](https://www.apollographql.com/) to send queries and mutations to the server, and Axios for authentication requests.

### Backend

The backend is written in JavaScript using [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), and [Apollo GraphQL](https://www.apollographql.com/). The database is [MongoDB](https://www.mongodb.com/), and the backend uses [Mongoose](https://mongoosejs.com/) as the ODM to model the data into MongoDB.

It connects to the [Coin Gecko API](https://www.coingecko.com/en/api) to fetch current cryptocurrency market data.

## Deployment

The application is deployed to a [DigitalOcean](https://www.digitalocean.com/) VM using Docker and Github Actions for CI/CD. The frontend and backend are deployed as seperate Docker containers, alongside another Docker image for the MongoDB database. We are also using images for [NGINX](https://www.nginx.com/) to act as the reverse proxy, and [Let's Encrypt](https://letsencrypt.org/) to generate SSL certificates to ensure that all endpoints are secured with HTTPS. All of these containers are managed together using Docker Compose.

Every time the frontend or backend code is modified, this will trigger a workflow in Github Actions to automatically rebuild the Docker images, publish them to [Github Packages](https://github.com/features/packages), and then redeploy the application in the VM.

## Maintenance

Our Docker Compose is configured to automatically restart the containers if they crash. Also, we are able to monitor the CPU, memory, and bandwidth usage of the server via DigitalOcean's monitoring dashboard.

## Challenges

1. Learning how to use GraphQL and how to design the schemas so that they could be queried in an efficient manner
2. Learning how to use D3.js to implement the line graphs for historical price data and the crosshair for showing the specific price for a specific date when hovered
3. Figuring out how to format the historical data received from the Coin Gecko API in a way that would be compatible with D3.js

## Contributions

### Gary Xie

Gary was responsible for the development of the frontend UI as well as connecting to the backend by making GraphQL queries and mutations. Also, Gary was responsible for the deployment of the application to the DigitalOcean VM and the CI/CD workflows.

### Andy Huang

Andy was responsible for the implementation of the backend GraphQL API, as well as the designing the MongoDB schemas. Also, Andy was responsible for determining the necessary API calls needed to extract the required data from the Coin Gecko API.

# One more thing?

**Disclaimer:** The Coin Gecko API has a rate limit of 50 calls/minute. The application will bug out if the rate limit is exceeded. This was planned to be solved by implementing caching, but we were unable to finish the implementation due to time constraints.
