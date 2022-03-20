import { AccountContext } from "@/context/AccountContext";
import { useContext } from "react";

const useIsLoggedIn = () => {
  const query = useContext(AccountContext)!;
  return { loggedIn: !!query.account?.user.username, ready: !query.loading };
};

export default useIsLoggedIn;
