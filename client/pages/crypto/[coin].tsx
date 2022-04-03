import Coin from "@/components/Coin/Coin";
import { CoinData, CoinHistoryData } from "@/types/types";
import { gql, useQuery } from "@apollo/client";
import { Loader, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const COIN_QUERY = gql`
  query CoinQuery($id: String, $days: Int) {
    coin(_id: $id) {
      _id
      symbol
      name
      price
    }
    coinHistory(_id: $id, days: $days) {
      _id
      prices
    }
  }
`;

const CoinPage: NextPage = () => {
  const router = useRouter();
  const { coin } = router.query;
  const [days, setDays] = useState(365);
  const [selectedCoin, setSelectedCoin] = useState("");
  const query = useQuery<{
    coin: CoinData;
    coinHistory: { prices: CoinHistoryData };
  }>(COIN_QUERY, { variables: { id: coin ?? selectedCoin, days: days } });

  useEffect(() => {
    if (coin) setSelectedCoin(coin as string);
  }, [coin]);

  if (query.loading) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Loader variant="bars" color="teal" />
      </div>
    );
  }
  if (query.error) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Title order={3}>Unable to Fetch Data For This Coin</Title>
      </div>
    );
  }
  return (
    <Coin
      coin={query.data!.coin}
      coinHistory={query.data!.coinHistory.prices}
    />
  );
};

export default CoinPage;
