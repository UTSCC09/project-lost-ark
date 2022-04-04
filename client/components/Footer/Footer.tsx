import { Footer as MantineFooter } from "@mantine/core";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <MantineFooter height={50} className="footer">
      <Link href="/credits">
        <a>Credits</a>
      </Link>
    </MantineFooter>
  );
};

export default Footer;
