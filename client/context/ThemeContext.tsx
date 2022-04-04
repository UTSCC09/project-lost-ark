import { gql, QueryResult, useQuery } from "@apollo/client";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const ThemeProvider: React.FC = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<"light" | "dark">({
    key: "coinark-theme",
    defaultValue: "light",
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export { ThemeContext, ThemeProvider };
