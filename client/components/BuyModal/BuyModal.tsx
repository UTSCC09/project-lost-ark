import { AccountContext } from "@/context/AccountContext";
import { CoinData } from "@/types/types";
import { handleError } from "@/utils/utils";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Modal, NumberInput, Select } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FormEvent, useContext, useMemo, useState } from "react";

const COINS_QUERY = gql`
  query AllCoinsQuery {
    coins {
      _id
      symbol
      name
      price
    }
    user {
      cash
    }
  }
`;

const BUY_COIN = gql`
  mutation BuyCoin($coin: String!, $quantity: Float!) {
    buy(coinId: $coin, quantity: $quantity) {
      username
      balance
      cash
    }
  }
`;

const BuyModal: React.FC = () => {
  const accountQuery = useContext(AccountContext);
  const [modalOpen, setModalOpen] = useState(false);
  const notifications = useNotifications();
  const query = useQuery<{ coins: CoinData[]; user: { cash: number } }>(
    COINS_QUERY
  );
  const { coins = [], user } = query.data ?? {};
  const [buyCoin] = useMutation(BUY_COIN);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const selectedPrice = useMemo(() => {
    const price: number | undefined = coins.filter(
      (coin) => coin._id === selectedCoin
    )[0]?.price;
    return price;
  }, [coins, selectedCoin]);

  const handleClose = () => {
    setModalOpen(false);
    setSelectedCoin("");
    setQuantity(undefined);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCoin || !quantity || quantity <= 0) return;

    buyCoin({ variables: { coin: selectedCoin, quantity: quantity } })
      .then((data) => {
        accountQuery?.refetch();
        const coinName = coins.filter((coin) => coin._id === selectedCoin)[0]
          ?.name;
        notifications.showNotification({
          message: `Successfully bought ${quantity} ${coinName}`,
          color: "teal",
        });
        handleClose();
      })
      .catch((err) => handleError(err, { notifications }));
  };

  return (
    <>
      <Modal opened={modalOpen} onClose={handleClose} title="Buy">
        <form className="space-between" onSubmit={handleSubmit}>
          <Select
            label="Cryptocurrency"
            value={{ value: selectedCoin } as any}
            onChange={(val) => setSelectedCoin(val ?? "")}
            data={coins.map((coin) => ({
              label: coin.name,
              value: coin._id,
            }))}
            searchable
            required
          />
          <NumberInput
            label="Unit Price"
            disabled
            value={selectedPrice}
            precision={2}
            formatter={(value) => `$ ${value}`}
          />
          <NumberInput
            label="Quantity"
            value={quantity}
            required
            onChange={setQuantity}
            min={0.01}
            precision={2}
            step={0.1}
          />
          <NumberInput
            label="Estimated Total Price"
            disabled
            value={quantity! * selectedPrice || 0}
            precision={2}
            formatter={(value) => `$ ${value}`}
          />
          <NumberInput
            label="Your Current Cash Balance"
            disabled
            value={user?.cash}
            precision={2}
            formatter={(value) => `$ ${value}`}
          />
          <Button type="submit" color="teal" fullWidth>
            Purchase
          </Button>
        </form>
      </Modal>
      <Button color="teal" onClick={() => setModalOpen(true)}>
        Trade
      </Button>
    </>
  );
};

export default BuyModal;
