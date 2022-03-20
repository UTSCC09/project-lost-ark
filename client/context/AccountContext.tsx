import { gql, QueryResult, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";

type AccountQuery = {
  user: {
    username: string;
    balance: number;
    cash: number;
    wallet: {
      coin: {
        name: string;
        price: number;
      };
      quantity: number;
      price: number;
    }[];
  };
};

const AccountContext = createContext<{
  account: AccountQuery | null;
  loading: boolean;
  refetch: () => Promise<any>;
} | null>(null);

const ACCOUNT_QUERY = gql`
  query AccountQuery {
    user {
      username
      balance
      cash
      wallet {
        coin {
          name
          price
        }
        quantity
        price
      }
    }
  }
`;

const AccountProvider: React.FC = ({ children }) => {
  const query = useQuery<AccountQuery>(ACCOUNT_QUERY);
  const [account, setAccount] = useState<AccountQuery | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(query.loading);
    if (query.error) {
      setAccount(null);
    } else {
      setAccount(query.data ?? null);
    }
  }, [query.data, query.loading, query.error]);

  return (
    <AccountContext.Provider
      value={{ account, loading, refetch: query.refetch }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
