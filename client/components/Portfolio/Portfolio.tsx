import { useContext, useEffect, useMemo, useState } from "react";
import Chart from "@/components/Chart/Chart";
import { AccountContext } from "@/context/AccountContext";
import PortfolioTable from "@/components/PortfolioTable/PortfolioTable";
import { motion } from "framer-motion";
import { Loader, Paper, Title } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import { roundToDecimals } from "@/utils/utils";

type AccountHistory = {
  accountHistoryBalance: {
    balanceHistory: {
      balance: number;
      timestamp: number;
    }[];
  };
};

const ACCOUNT_HISTORY_QUERY = gql`
  query AccountHistoryQuery($days: Int) {
    accountHistoryBalance(days: $days) {
      balanceHistory {
        balance
        timestamp
      }
    }
  }
`;

const Portfolio: React.FC = () => {
  const { account, loading, refetch } = useContext(AccountContext)!;
  const { balance, cash } = account?.user ?? {};
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [days, setDays] = useState(365);
  const historyQuery = useQuery<AccountHistory>(ACCOUNT_HISTORY_QUERY, {
    variables: { days },
  });
  const accountHistory = useMemo(() => {
    const accountHistory = [
      ...(historyQuery.data?.accountHistoryBalance.balanceHistory ?? []),
    ];
    if (accountHistory.length === 0) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      accountHistory.push({
        balance: balance!,
        timestamp: yesterday.getTime(),
      });
    }
    accountHistory.push({ balance: balance!, timestamp: Date.now() });
    return accountHistory.map((row) => ({
      value: row.balance!,
      date: new Date(row.timestamp),
    }));
  }, [historyQuery.data]);

  useEffect(() => {
    Promise.all([historyQuery.refetch(), refetch]).then(() =>
      setLoadingHistory(false)
    );
  }, []);

  if (loading || loadingHistory) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Loader variant="bars" color="teal" />
      </div>
    );
  }
  return (
    <motion.div
      exit={{ opacity: 0, translateY: 20 }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="portfolio"
    >
      <Paper shadow="xs" radius="sm" p="md">
        <Title order={3} style={{ marginBottom: "0.5rem" }}>
          Your Portfolio
        </Title>
        <h2 className="section-title">Total Account Balance</h2>
        <div className="main-title">${balance?.toFixed(2)}</div>
        <Chart data={accountHistory} days={days} setDays={setDays} />
      </Paper>
      <Paper shadow="xs" radius="sm" p="md" style={{ marginTop: "1rem" }}>
        <h2 className="section-title">Assets</h2>
        <div className="cash-balance">
          Cash Balance: ${cash?.toFixed(2)} (
          {roundToDecimals((cash! / balance!) * 100, 2) || 0}%)
        </div>
        <PortfolioTable />
      </Paper>
    </motion.div>
  );
};

export default Portfolio;
