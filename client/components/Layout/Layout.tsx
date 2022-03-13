import Navbar from "@/components/Navbar/Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar>Hello</Navbar>
      {children}
    </>
  );
};

export default Layout;
