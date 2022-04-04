import { useContext, useMemo } from "react";
import { ActionIcon, Group, Paper, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";
import { AccountContext } from "@/context/AccountContext";
import { CoinData, CoinHistoryData } from "@/types/types";
import { roundToDecimals } from "@/utils/utils";
import BuyModal from "@/components/BuyModal/BuyModal";
import Chart from "@/components/Chart/Chart";
import SellModal from "@/components/SellModal/SellModal";
import TransitionWrapper from "@/components/TransitionWrapper/TransitionWrapper";

const Coin: React.FC<{
  coin: CoinData;
  coinHistory: CoinHistoryData;
  days: number;
  setDays: (days: number) => void;
}> = ({ coin, coinHistory, days, setDays }) => {
  const router = useRouter();
  const query = useContext(AccountContext);
  const ownedCoins = useMemo(() => {
    return roundToDecimals(
      query?.account?.user.wallet.find((data) => data.coin._id === coin._id)
        ?.quantity ?? 0,
      5
    );
  }, [query]);
  const chartData = useMemo(() => {
    return coinHistory.map((data) => ({
      date: new Date(data[0]),
      value: roundToDecimals(data[1], 2),
    }));
  }, [coinHistory]);

  return (
    <TransitionWrapper>
      <Paper shadow="xs" radius="sm" p="md">
        <Group style={{ marginBottom: "0.5rem" }} position="apart">
          <Group>
            <ActionIcon
              radius="xl"
              variant="outline"
              onClick={() => router.back()}
            >
              <ArrowLeft />
            </ActionIcon>
            <Title order={3}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </Title>
          </Group>
          <Group>
            <BuyModal coin={coin} />
            <SellModal coin={coin} ownedCoins={ownedCoins} />
          </Group>
        </Group>
        <Group position="apart">
          <Group direction="column" spacing={0}>
            <h2 className="section-title">Current Price</h2>
            <div className="main-title">${coin.price.toFixed(2)}</div>
          </Group>
          <Group direction="column" align="flex-end" spacing={0}>
            <h2 className="section-title">You Own</h2>
            <div className="main-title">
              {ownedCoins} {coin.symbol.toUpperCase()}
            </div>
          </Group>
        </Group>

        <Chart
          data={chartData}
          aspectRatio="5 / 2"
          days={days}
          setDays={setDays}
        />
      </Paper>
    </TransitionWrapper>
  );
};

export default Coin;
