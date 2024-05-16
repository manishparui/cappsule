import React, { useState } from "react";
import { Flex, Box, Text, Divider } from "@chakra-ui/react";
import SearchBox from "./components/search-box/SearchBox";
import ResultItem from "./components/result-item/ResultItem";
import axios from "axios";

const SearchPage = (): JSX.Element => {
  const [saltSuggestions, setSaltSuggestions] = useState<any[]>([]);

  const onSearch = (keyword: string): void => {
    axios
      .get("https://backend.cappsule.co.in/api/v1/new_search", {
        params: {
          q: keyword,
          pharmacyIds: "1,2,3",
        },
      })
      .then((response) => {
        const saltSuggestions = response.data.data.saltSuggestions;
        setSaltSuggestions(saltSuggestions);
      });
  };

  return (
    <Flex padding={12} wrap={"wrap"} justifyContent={"center"}>
      <Box width={"80%"}>
        <Text marginBottom={12} align={"center"} fontSize={"x-large"}>
          Cappsule web development test
        </Text>
        <SearchBox onSearch={onSearch} />
        <Divider marginY={12} />
        {saltSuggestions.map((suggestion) => (
          <ResultItem key={suggestion.id} suggestion={suggestion} />
        ))}
      </Box>
    </Flex>
  );
};

export default SearchPage;
