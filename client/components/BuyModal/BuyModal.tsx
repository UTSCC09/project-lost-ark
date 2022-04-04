import { AccountContext } from "@/context/AccountContext";
import { CoinData } from "@/types/types";
import { handleError } from "@/utils/utils";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Modal,
  NumberInput,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FormEvent, useContext, useMemo, useState } from "react";

const BUY_COIN = gql`
  mutation BuyCoin($coin: String!, $quantity: Float!) {
    buy(coinId: $coin, quantity: $quantity) {
      username
      balance
      cash
    }
  }
`;

const BuyModal: React.FC<{ coin: CoinData }> = ({ coin }) => {
  const theme = useMantineTheme();
  const [buyCoin] = useMutation(BUY_COIN);
  const notifications = useNotifications();
  const accountQuery = useContext(AccountContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState<string>("");

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

    buyCoin({ variables: { coin: coin._id, quantity: quantityNum } })
      .then((data) => {
        accountQuery?.refetch();
        notifications.showNotification({
          message: `Successfully bought ${quantity} ${coin.symbol.toUpperCase()}`,
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
            Buy {coin.name} ({coin.symbol.toUpperCase()})
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
          <TextInput
            label="Quantity"
            value={quantity}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setQuantity(e.target.value);
              }
            }}
          />
          <TextInput
            disabled
            label="Estimated Total Price"
            value={`$ ${(Number(quantity) * coin.price).toFixed(2)}`}
          />
          <TextInput
            disabled
            label="Current Cash Balance"
            value={`$ ${(accountQuery?.account?.user.cash || 0).toFixed(2)}`}
          />
          <Button type="submit" color="teal" fullWidth>
            Purchase
          </Button>
        </form>
      </Modal>
      <Button color="teal" variant="light" onClick={() => setModalOpen(true)}>
        Buy
      </Button>
    </>
  );
};

export default BuyModal;
