import styles from "./Layout.module.scss";
import { AppShell, Navbar as MantineNav, ScrollArea } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type LayoutProps = {
  Navbar?: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children, Navbar }) => {
  return (
    <AppShell
      header={<Header />}
      navbarOffsetBreakpoint="sm"
      navbar={Navbar ?? <MantineNav className={styles.emptyNav}>{}</MantineNav>}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
