import { Footer as MantineFooter } from "@mantine/core";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <MantineFooter height={50} className={styles.footer}>
      <Link href="/credits">
        <a>Credits</a>
      </Link>
    </MantineFooter>
  );
};

export default Footer;
