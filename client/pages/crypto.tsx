import Crypto, { Coin } from "@/components/Crypto/Crypto";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "@mantine/core";
import { NextPage } from "next";

const COINS_QUERY = gql`
  query AllCoinsQuery {
    coins {
      _id
      symbol
      name
      price
    }
  }
`;

const CryptoPage: NextPage = () => {
  const query = useQuery<{ coins: Coin[] }>(COINS_QUERY);
  if (query.loading) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Loader variant="bars" color="teal" />
      </div>
    );
  }
  return <Crypto coins={query.data?.coins ?? []} />;
};

export default CryptoPage;
