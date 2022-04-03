import Layout from "@/components/Layout/Layout";
import { Container, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { NextPage } from "next";

const Custom404Page: NextPage = () => {
  return (
    <Layout>
      <Container
        style={{ height: "100%", display: "grid", placeItems: "center" }}
      >
        <motion.div
          exit={{ opacity: 0, translateY: 20, transition: { duration: 0.5 } }}
          initial={{ opacity: 0, translateY: 20 }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.5 },
          }}
        >
          <Title>404 Page Not Found</Title>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default Custom404Page;