import styles from "./Coin.module.scss";
import { useContext, useMemo } from "react";
import { ActionIcon, Button, Group, Paper, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";
import { roundToDecimals } from "@/utils/utils";
import Chart from "@/components/Chart/Chart";
import { AccountContext } from "@/context/AccountContext";
import { CoinData, CoinHistoryData } from "@/types/types";
import BuyModal from "@/components/BuyModal/BuyModal";

const Coin: React.FC<{ coin: CoinData; coinHistory: CoinHistoryData }> = ({
  coin,
  coinHistory,
}) => {
  const router = useRouter();
  const query = useContext(AccountContext);
  const ownedCoins = useMemo(() => {
    return roundToDecimals(
      query?.account?.user.wallet.filter(
        (data) => data.coin._id === coin._id
      )[0]?.quantity ?? 0,
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
    <motion.div
      exit={{ opacity: 0, translateY: 20 }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
    >
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
            {/* TODO: Handle Buy/Sell */}
            {/* <Button color="teal" variant="light">
              Buy
            </Button> */}
            <BuyModal coin={coin} />
            <Button color="teal" variant="light">
              Sell
            </Button>
          </Group>
        </Group>
        <Group position="apart">
          <Group direction="column" spacing={0}>
            <h2 className={styles.sectionTitle}>Current Price</h2>
            <div className={styles.price}>${coin.price.toFixed(2)}</div>
          </Group>
          <Group direction="column" align="flex-end" spacing={0}>
            <h2 className={styles.sectionTitle}>You Own</h2>
            <div className={styles.price}>
              {ownedCoins} {coin.symbol.toUpperCase()}
            </div>
          </Group>
        </Group>

        <Chart data={chartData} aspectRatio="5 / 2" />
      </Paper>
    </motion.div>
  );
};

export default Coin;
