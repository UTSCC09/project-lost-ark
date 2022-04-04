import { AccountContext } from "@/context/AccountContext";
import { CoinData } from "@/types/types";
import { handleError } from "@/utils/utils";
import { gql, useMutation } from "@apollo/client";
import {
  Modal,
  TextInput,
  Button,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useContext, useState, FormEvent } from "react";

const SELL_COIN = gql`
  mutation SellCoin($coin: String!, $quantity: Float!) {
    sell(coinId: $coin, quantity: $quantity) {
      username
      balance
      cash
    }
  }
`;

// TODO
const SellModal: React.FC<{ coin: CoinData; ownedCoins: number }> = ({
  coin,
  ownedCoins,
}) => {
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const accountQuery = useContext(AccountContext)!;
  const [sellCoin] = useMutation(SELL_COIN);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  const handleClose = () => {
    setModalOpen(false);
    setQuantity("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const quantityNum = Number(quantity);

    if (quantityNum <= 0) {
      notifications.showNotification({
        message: "Quantity must be greater than 0",
        color: "red",
      });
      return;
    }

    if (quantityNum > ownedCoins) {
      notifications.showNotification({
        message: "Quantity cannot be greater than your quantity owned",
        color: "red",
      });
      return;
    }

    sellCoin({
      variables: { coin: coin._id, quantity: quantityNum },
    })
      .then((data) => {
        accountQuery?.refetch();
        notifications.showNotification({
          message: `Successfully sold ${quantity} ${coin.symbol.toUpperCase()}`,
          color: "teal",
        });
        handleClose();
      })
      .catch((err) => handleError(err, { notifications }));
  };

  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={handleClose}
        title={
          <Title order={3}>
            Sell {coin.name} ({coin.symbol.toUpperCase()})
          </Title>
        }
      >
        <form
          className={`
          modal-form 
          ${theme.colorScheme === "dark" ? "dark" : "light"}
          `}
          onSubmit={handleSubmit}
        >
          <TextInput
            disabled
            label="Unit Price"
            value={`$ ${coin.price.toFixed(2)}`}
          />
          <TextInput disabled label="Quantity Owned" value={ownedCoins} />
          <TextInput
            label="Quantity to Sell"
            value={quantity}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setQuantity(e.target.value);
              }
            }}
          />
          <TextInput
            disabled
            label="Estimated Total Sale"
            value={`$ ${(Number(quantity) * coin.price).toFixed(2)}`}
          />
          <Button type="submit" color="teal" fullWidth>
            Sell {coin.symbol.toUpperCase()}
          </Button>
        </form>
      </Modal>
      <Button color="teal" variant="light" onClick={() => setModalOpen(true)}>
        Sell
      </Button>
    </>
  );
};

export default SellModal;
