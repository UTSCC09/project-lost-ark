import { Button, Paper, Table, Title, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { CoinData } from "@/types/types";
import TransitionWrapper from "@/components/TransitionWrapper/TransitionWrapper";

const Crypto: React.FC<{ coins: CoinData[] }> = ({ coins }) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <TransitionWrapper>
      <Paper shadow="xs" radius="sm" p="md">
        <Title order={3} style={{ marginBottom: "0.5rem" }}>
          Trade Crypto
        </Title>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Current Price</th>
              <th style={{ width: "1px" }} />
            </tr>
          </thead>
          <tbody>
            {[...coins]
              .sort((a, b) => (a.price > b.price ? -1 : 1))
              .map((coin, index) => (
                <tr
                  key={coin._id}
                  className={`hover-table-row ${theme.colorScheme}`}
                  onClick={() => router.push(`/crypto/${coin._id}`)}
                >
                  <td>{index + 1}</td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td style={{ fontWeight: "bold" }}>{coin.name}</td>
                  <td>${coin.price.toFixed(2)}</td>
                  <td>
                    <Button color="teal" variant="outline">
                      Trade
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Paper>
    </TransitionWrapper>
  );
};

export default Crypto;
