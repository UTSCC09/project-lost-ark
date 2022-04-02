import {
  ActionIcon,
  Button,
  Group,
  Navbar as MantineNavbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { Coin, Icon, MoonStars, Sun, User } from "tabler-icons-react";

type NavButtonProps = {
  Icon: Icon;
  label: string;
  onClick: () => void;
};

const NavButton: React.FC<NavButtonProps> = ({ Icon, label, onClick }) => {
  return (
    // Button style credits: https://github.com/mantinedev/mantine/blob/master/src/mantine-demos/src/demos/core/AppShell/_mainLinks.tsx
    <UnstyledButton
      onClick={onClick}
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineNavbar width={{ xs: 250 }} p="md">
      <MantineNavbar.Section grow mt="xs">
        <NavButton
          Icon={User}
          label="Account Balance"
          onClick={() => {
            /** TODO */
          }}
        />
        <NavButton
          Icon={Coin}
          label="All Coins"
          onClick={() => {
            /** TODO */
          }}
        />
      </MantineNavbar.Section>
      <MantineNavbar.Section mb="xs">
        <NavButton
          Icon={colorScheme === "dark" ? Sun : MoonStars}
          label={`Toggle ${colorScheme === "dark" ? "Light" : "Dark"} Mode`}
          onClick={() => toggleColorScheme()}
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
