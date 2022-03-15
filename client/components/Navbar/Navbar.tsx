import styles from "./Navbar.module.scss";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Button } from "@mantine/core";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src={logo.src} alt="Coin Ark logo" width={118} height={25} />
          </a>
        </Link>
        <div className={styles.btnGroup}>
          <Link href="/signin">
            <Button color="teal" variant="subtle">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button color="teal">Create an Account</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;