import { gql, useQuery } from "@apollo/client";
import { Button, Select } from "@mantine/core";
import { useModals } from "@mantine/modals";
import styles from "./TradeModal.module.scss";

type Coin = {
  _id: string;
  symbol: string;
  name: string;
  price: number;
};

const TradeModal: React.FC = () => {
  const modals = useModals();
  const { data } = useQuery<{ coins: Coin[] }>(gql`
    query AllCoinsQuery {
      coins {
        _id
        symbol
        name
        price
      }
    }
  `);
  const coins = data?.coins ?? [];

  const openModal = () => {
    modals.openModal({
      title: "Buy",
      children: (
        <div className={styles.tradeForm}>
          <Select
            label="Cryptocurrency"
            data={coins.map((coin) => ({
              label: coin.name,
              value: coin.symbol,
            }))}
          />
          <Button color="teal" fullWidth>
            Purchase
          </Button>
        </div>
      ),
    });
  };

  return (
    <>
      <Button color="teal" onClick={openModal}>
        Trade
      </Button>
    </>
  );
};

export default TradeModal;
