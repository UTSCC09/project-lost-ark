import { AccountContext } from "@/context/AccountContext";
import { handleError } from "@/utils/utils";
import { gql, useMutation } from "@apollo/client";
import { Modal, TextInput, NumberInput, Button } from "@mantine/core";
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

const SellModal: React.FC = () => {
  const { account, refetch } = useContext(AccountContext)!;
  const { balance, wallet = [] } = account?.user ?? {};

  const notifications = useNotifications();
  const [sellCoin] = useMutation(SELL_COIN);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<typeof wallet[0] | null>(
    null
  );
  const [amountToSell, setAmountToSell] = useState(0.01);

  const handleOpen = (coin: typeof wallet[0]) => {
    setModalOpen(true);
    setSelectedCoin(coin);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedCoin(null);
    setAmountToSell(0.01);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !selectedCoin ||
      !amountToSell ||
      amountToSell <= 0 ||
      amountToSell > selectedCoin.quantity
    )
      return;

    sellCoin({
      variables: { coin: selectedCoin.coin._id, quantity: amountToSell },
    })
      .then((data) => {
        refetch();
        notifications.showNotification({
          message: `Successfully sold ${amountToSell} ${selectedCoin.coin.name}`,
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
        title={`Sell ${selectedCoin?.coin.name ?? ""}`}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <TextInput
            label="Amount Owned"
            disabled
            value={selectedCoin?.quantity}
          />
          <NumberInput
            label="Amount to Sell"
            value={amountToSell}
            onChange={(val) => setAmountToSell(val ?? 0)}
            min={0.01}
            max={selectedCoin?.quantity}
            precision={2}
            step={0.1}
          />
          <NumberInput
            label="Unit Price"
            disabled
            value={selectedCoin?.coin.price}
            precision={2}
            formatter={(value) => `$ ${value}`}
          />
          <NumberInput
            label="Estimated Sale Price"
            disabled
            value={amountToSell * selectedCoin?.coin.price!}
            precision={2}
            formatter={(value) => `$ ${value}`}
          />
          <Button type="submit" color="teal" fullWidth>
            Sell {selectedCoin?.coin.name}
          </Button>
        </form>
      </Modal>
      <Button
        size="xs"
        color="teal"
        // onClick={() => handleOpen(ownedCoins[index])}
      >
        Sell
      </Button>
    </>
  );
};

export default SellModal;
