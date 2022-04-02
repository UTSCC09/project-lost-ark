import styles from "./Layout.module.scss";
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer/Footer";
import {
  AppShell,
  Header,
  Navbar as MantineNav,
  Footer,
  Group,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

type LayoutProps = {
  Navbar: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children, Navbar }) => {
  return (
    <AppShell
      header={
        <Header height={60} className={styles.header}>
          <Group sx={{ height: "100%" }} position="apart">
            <Link href="/">
              <a className={styles.logo}>
                <Image
                  src={logo.src}
                  alt="Coin Ark logo"
                  width={118}
                  height={25}
                />
              </a>
            </Link>
          </Group>
        </Header>
      }
      navbar={Navbar ?? <MantineNav className={styles.emptyNav}>{}</MantineNav>}
      footer={
        <Footer height={50} className={styles.footer}>
          <Link href="/credits">
            <a>Credits</a>
          </Link>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
  return (
    <>
      <Navbar />
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
