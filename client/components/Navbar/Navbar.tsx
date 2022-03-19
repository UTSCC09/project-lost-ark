import styles from "./Navbar.module.scss";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "@/public/logo.svg";
import TradeModal from "@/components/TradeModal/TradeModal";
import { handleError, isLoggedIn } from "@/utils/utils";
import axios from "axios";
import { useNotifications } from "@mantine/notifications";

const Navbar: React.FC = () => {
  const router = useRouter();
  const notifications = useNotifications();

  const handleSignout = () => {
    axios
      .get("/api/signout")
      .then((res) => {
        router.push("/signin?signout=true");
      })
      .catch((err) => handleError(err, { notifications }));
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
          {isLoggedIn() ? (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
