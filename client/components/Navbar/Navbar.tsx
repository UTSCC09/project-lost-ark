import {
  Group,
  Navbar as MantineNavbar,
  Space,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Coin, Icon, User } from "tabler-icons-react";

type NavButtonProps = {
  Icon: Icon;
  label: string;
  active?: boolean;
};

const NavButton: React.FC<NavButtonProps> = ({
  Icon,
  label,
  active = false,
}) => {
  return (
    // Button style credits: https://github.com/mantinedev/mantine/blob/master/src/mantine-demos/src/demos/core/AppShell/_mainLinks.tsx
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        backgroundColor: active
          ? theme.colorScheme === "dark"
            ? "rgba(9, 146, 104, 0.35)"
            : theme.colors.teal[0]
          : undefined,
        color:
          theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.black,

        "&:hover": {
          backgroundColor: active
            ? undefined
            : theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon
          color="teal"
          variant="light"
          sx={(theme) => ({
            backgroundColor: active ? "transparent" : undefined,
          })}
        >
          <Icon size={16} />
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const tabs = [
  { icon: User, label: "Your Portfolio", route: "/portfolio" },
  { icon: Coin, label: "Trade Crypto", route: "/crypto" },
];

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      exit={{ opacity: 0, translateY: 20 }}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0, transition: { delay: 0.35 } }}
    >
      <MantineNavbar width={{ xs: 250 }} p="md">
        <MantineNavbar.Section grow>
          {tabs.map((tab) => (
            <React.Fragment key={tab.route}>
              <Link href={tab.route}>
                <a>
                  <NavButton
                    Icon={tab.icon}
                    label={tab.label}
                    active={router.route.startsWith(tab.route)}
                  />
                </a>
              </Link>
              <Space h="xs" />
            </React.Fragment>
          ))}
        </MantineNavbar.Section>
      </MantineNavbar>
    </motion.div>
  );
};

export default Navbar;
