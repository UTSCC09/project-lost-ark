import styles from "./Credits.module.scss";
import { Title, List, Anchor } from "@mantine/core";
import { motion } from "framer-motion";

const Credits = () => {
  return (
    <motion.div
      className={styles.credits}
      exit={{ opacity: 0, translateY: 20, transition: { duration: 0.5 } }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.5 },
      }}
    >
      <Title order={1}>Credits</Title>
      <div className="credits-section">
        <Title order={3}>UI Frameworks and Libraries</Title>
        <List withPadding>
          <List.Item>
            <Anchor href="https://reactjs.org/" target="_blank">
              React.js
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://nextjs.org/" target="_blank">
              Next.js
            </Anchor>
          </List.Item>
          <List.Item>
            UI Component Library:{" "}
            <Anchor href="https://mantine.dev/" target="_blank">
              Mantine.dev
            </Anchor>
          </List.Item>
          <List.Item>
            Data Visualization Graphs:{" "}
            <Anchor href="https://d3js.org/" target="_blank">
              D3.js
            </Anchor>
          </List.Item>
          <List.Item>
            Animations:{" "}
            <Anchor href="https://www.framer.com/motion/" target="_blank">
              Framer Motion
            </Anchor>
          </List.Item>
          <List.Item>
            Icons:{" "}
            <Anchor href="https://tablericons.com/" target="_blank">
              Tabler Icons
            </Anchor>
          </List.Item>
        </List>
      </div>
      <div className="credits-section">
        <Title order={3}>Backend Documentation and References</Title>
        <List withPadding>
          <List.Item>
            <Anchor
              href="https://www.apollographql.com/docs/tutorial"
              target="_blank"
            >
              GraphQL Documentation
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor
              href="https://www.cloudcity.io/blog/2021/08/22/graphql-authentication-why-out-of-band-authentication-is-better-than-in-band/"
              target="_blank"
            >
              GraphQL Authentication
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor
              href="https://medium.com/geekculture/graphql-with-mongodb-and-expressjs-26e1b94ab886"
              target="_blank"
            >
              GraphQL Setup
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor
              href="https://cheatcode.co/tutorials/how-to-set-up-a-graphql-server-with-apollo-server-and-express"
              target="_blank"
            >
              GraphQL Setup
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://mongoosejs.com/docs/" target="_blank">
              Mongoose Documentation
            </Anchor>
          </List.Item>
        </List>
      </div>
    </motion.div>
  );
};

export default Credits;
