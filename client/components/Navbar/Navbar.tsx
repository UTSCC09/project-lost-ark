import {
  Group,
  Navbar as MantineNavbar,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { Coin, Icon, User } from "tabler-icons-react";

type NavButtonProps = {
  Icon: Icon;
  label: string;
};

const NavButton: React.FC<NavButtonProps> = ({ Icon, label }) => {
  return (
    // Button style credits: https://github.com/mantinedev/mantine/blob/master/src/mantine-demos/src/demos/core/AppShell/_mainLinks.tsx
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color="teal" variant="light">
          <Icon size={16} />
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const Navbar: React.FC = () => {
  return (
    <motion.div
      exit={{ opacity: 0, translateY: 20, transition: { duration: 0.5 } }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.5 },
      }}
    >
      <MantineNavbar width={{ xs: 250 }} p="md">
        <MantineNavbar.Section grow mt="xs">
          {/* TODO: Set up links properly */}
          <Link href="/dashboard">
            <NavButton Icon={User} label="Your Portfolio" />
          </Link>
          <Link href="/dashboard">
            <NavButton Icon={Coin} label="Trade Crypto" />
          </Link>
        </MantineNavbar.Section>
      </MantineNavbar>
    </motion.div>
  );
};

export default Navbar;
