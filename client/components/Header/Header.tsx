import styles from "./Header.module.scss";
import logo from "@/public/logo.svg";
import { Header as MantineHeader, Group, Button } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useNotifications } from "@mantine/notifications";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { handleError } from "@/utils/utils";
import axios from "axios";

const Header: React.FC = () => {
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
        .finally(() => router.push("/signin"));
    } catch (err) {
      handleError(err, { notifications });
    }
  };

  return (
    <MantineHeader height={60} className={styles.header}>
      <Group sx={{ height: "100%" }} position="apart">
        <Link href={loggedIn ? "/dashboard" : "/"}>
          <a className={styles.logo}>
            <Image src={logo.src} alt="Coin Ark logo" width={118} height={25} />
          </a>
        </Link>
        <div>
          {ready ? (
            loggedIn ? (
              <>
                <span style={{ marginRight: "1rem", fontWeight: "bold" }}>
                  Welcome, {query.account?.user.username}!
                </span>
                <Button color="teal" variant="outline" onClick={handleSignout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    color="teal"
                    variant="outline"
                    style={{ marginRight: "1rem" }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button color="teal">Create an Account</Button>
                </Link>
              </>
            )
          ) : null}
        </div>
      </Group>
    </MantineHeader>
  );
};

export default Header;