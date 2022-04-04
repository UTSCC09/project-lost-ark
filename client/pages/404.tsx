import { NextPage } from "next";
import { Container, Title } from "@mantine/core";
import TransitionWrapper from "@/components/TransitionWrapper/TransitionWrapper";

const Custom404Page: NextPage = () => {
  return (
    <Container className="error-404">
      <TransitionWrapper>
        <Title>404 Page Not Found</Title>
      </TransitionWrapper>
    </Container>
  );
};

export default Custom404Page;
