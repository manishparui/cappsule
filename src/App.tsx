import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import SearchPage from "./pages/search/SearchPage";

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <SearchPage />
  </ChakraProvider>
);
