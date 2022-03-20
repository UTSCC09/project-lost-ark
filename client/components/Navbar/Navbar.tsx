import styles from "./Navbar.module.scss";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "@/public/logo.svg";
import TradeModal from "@/components/TradeModal/TradeModal";
import { handleError } from "@/utils/utils";
import axios from "axios";
import { useNotifications } from "@mantine/notifications";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";

const Navbar: React.FC = () => {
  const router = useRouter();
  const notifications = useNotifications();
  const query = useContext(AccountContext)!;
  const { loggedIn, ready } = useIsLoggedIn();

  const handleSignout = async () => {
    try {
      await axios.get("/api/signout");
      query
        .refetch()
        .catch(() => {})
        .finally(() => router.push("/signin?signout=true"));
    } catch (err) {
      handleError(err, { notifications });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src={logo.src} alt="Coin Ark logo" width={118} height={25} />
          </a>
        </Link>
        <div className={styles.btnGroup}>
          {ready &&
            (loggedIn ? (
              <>
                <TradeModal />
                <Button color="teal" variant="outline" onClick={handleSignout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button color="teal" variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button color="teal">Create an Account</Button>
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
