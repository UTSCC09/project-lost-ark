import styles from "./Crypto.module.scss";
import { Button, Paper, Table, Title, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { CoinData } from "@/types/types";

const Crypto: React.FC<{ coins: CoinData[] }> = ({ coins }) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <motion.div
      exit={{ opacity: 0, translateY: 20 }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
    >
      <Paper shadow="xs" radius="sm" p="md">
        <Title order={3} style={{ marginBottom: "0.5rem" }}>
          Trade Crypto
        </Title>
        <Table
          className={`
            ${styles.cryptoTable} 
            ${theme.colorScheme === "dark" ? styles.dark : ""}
          `}
          verticalSpacing="sm"
        >
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
    </motion.div>
  );
};

export default Crypto;
