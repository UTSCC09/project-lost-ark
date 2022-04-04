import Coin from "@/components/Coin/Coin";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
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
  const { loggedIn, ready } = useIsLoggedIn();
  const { coin } = router.query;
  const [days, setDays] = useState(365);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(false);
  const query = useQuery<{
    coin: CoinData;
    coinHistory: { prices: CoinHistoryData };
  }>(COIN_QUERY, { variables: { id: coin ?? selectedCoin, days: days } });
  const [coinData, setCoinData] = useState<{
    coin: CoinData;
    coinHistory: CoinHistoryData;
  }>();

  useEffect(() => {
    if (router.isReady && ready) {
      if (!loggedIn) {
        router.push("/signin");
      }
    }
  }, [router, loggedIn, ready]);

  useEffect(() => {
    if (coin) setSelectedCoin(coin as string);
  }, [coin]);

  useEffect(() => {
    if (!query.loading) setLoading(false);
  }, [query.loading]);

  useEffect(() => {
    if (query.data && !refetching) {
      setCoinData({
        coin: query.data.coin,
        coinHistory: query.data.coinHistory.prices,
      });
    }
  }, [query.data, refetching]);

  useEffect(() => {
    setRefetching(true);
    query.refetch().then(() => setRefetching(false));
  }, [days]);

  if (query.error) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Title order={3}>Unable to Fetch Data For This Coin</Title>
      </div>
    );
  }

  if (loading || !coinData) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Loader variant="bars" color="teal" />
      </div>
    );
  }

  return (
    <Coin
      coin={coinData.coin}
      coinHistory={coinData.coinHistory}
      days={days}
      setDays={setDays}
    />
  );
};

export default CoinPage;
