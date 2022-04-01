import styles from "./Layout.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar>Hello</Navbar>
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
