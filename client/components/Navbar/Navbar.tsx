import styles from "./Navbar.module.scss";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <Image src={logo.src} alt="Coin Ark logo" width={89} height={20} />
    </header>
  );
};

export default Navbar;
