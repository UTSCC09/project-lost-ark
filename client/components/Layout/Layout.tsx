import styles from "./Layout.module.scss";
import Navbar from "@/components/Navbar/Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar>Hello</Navbar>
      <div className={styles.main}>{children}</div>
    </>
  );
};

export default Layout;
