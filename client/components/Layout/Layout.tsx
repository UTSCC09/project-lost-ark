import { AppShell, Navbar as MantineNav } from "@mantine/core";
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
      navbar={Navbar ?? <MantineNav style={{ width: 0 }}>{}</MantineNav>}
      footer={<Footer />}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
