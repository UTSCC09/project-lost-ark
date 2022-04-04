import { AccountContext } from "@/context/AccountContext";
import { roundToDecimals } from "@/utils/utils";
import { Table, Button, Anchor, useMantineTheme } from "@mantine/core";
import { useContext, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PortfolioTable: React.FC = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { account } = useContext(AccountContext)!;
  const { balance, wallet = [] } = account?.user ?? {};
  const ownedCoins = useMemo(
    () =>
      wallet
        .filter((row) => row.quantity > 0)
        .sort((a, b) => (a.price > b.price ? -1 : 1)),
    [wallet]
  );

  return (
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
          <tr
            key={index}
            className={`hover-table-row ${theme.colorScheme}`}
            onClick={() => router.push(`/crypto/${row.coin._id}`)}
          >
            <td>{index + 1}</td>
            <td style={{ fontWeight: "bold" }}>
              {row.coin.name} ({row.coin.symbol.toUpperCase()})
            </td>
            <td>${row.coin.price.toFixed(2)}</td>
            <td>{roundToDecimals(row.quantity, 5)}</td>
            <td>${row.price.toFixed(2)}</td>
            <td>{roundToDecimals((row.price / balance!) * 100, 2)}%</td>
            <td>
              <Button color="teal" variant="outline">
                Trade
              </Button>
            </td>
          </tr>
        ))}
        {ownedCoins.length === 0 && (
          <tr>
            <td colSpan={7}>
              No cryptocurrency currently owned. Go to{" "}
              <Link href="/crypto" passHref>
                <Anchor style={{ fontSize: 14 }}>Trade Crypto</Anchor>
              </Link>{" "}
              to start trading.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PortfolioTable;
