import { AccountContext } from "@/context/AccountContext";
import { handleError } from "@/utils/utils";
import { gql, useMutation } from "@apollo/client";
import {
  Table,
  Button,
  Modal,
  NumberInput,
  TextInput,
  Anchor,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FormEvent, useContext, useMemo, useState } from "react";
import Link from "next/link";

const SELL_COIN = gql`
  mutation SellCoin($coin: String!, $quantity: Float!) {
    sell(coinId: $coin, quantity: $quantity) {
      username
      balance
      cash
    }
  }
`;

const PortfolioTable: React.FC = () => {
  const [sellCoin] = useMutation(SELL_COIN);
  const notifications = useNotifications();
  const { account, refetch } = useContext(AccountContext)!;
  const { balance, wallet = [] } = account?.user ?? {};
  const ownedCoins = useMemo(
    () =>
      wallet
        .filter((row) => row.quantity > 0)
        .sort((a, b) => (a.price > b.price ? -1 : 1)),
    [wallet]
  );
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
        <form onSubmit={handleSubmit} className="space-between">
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
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Current Price</th>
            <th>Amount Owned</th>
            <th>Value</th>
            <th>Portfolio %</th>
            <th style={{ width: "1px" }} />
          </tr>
        </thead>
        <tbody>
          {ownedCoins.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ fontWeight: "bold" }}>{row.coin.name}</td>
              <td>${row.coin.price.toFixed(2)}</td>
              <td>{row.quantity}</td>
              <td>${row.price.toFixed(2)}</td>
              <td>{((row.price / balance!) * 100).toFixed(2)}%</td>
              <td>
                <Button
                  size="xs"
                  color="teal"
                  onClick={() => handleOpen(ownedCoins[index])}
                >
                  Sell
                </Button>
              </td>
            </tr>
          ))}
          {ownedCoins.length === 0 && (
            <tr>
              <td colSpan={7}>
                No cryptocurrency currently owned. Go to{" "}
                <Link href="/crypto">
                  <Anchor style={{ fontSize: 14 }}>Trade Crypto</Anchor>
                </Link>{" "}
                to start trading.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default PortfolioTable;
