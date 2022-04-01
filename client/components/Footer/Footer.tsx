import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Link href="/credits">
        <a>Credits</a>
      </Link>
    </div>
  );
};

export default Footer;
