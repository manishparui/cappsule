import React, { useState } from "react";
import {
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import { BsSearch, BsArrowLeft } from "react-icons/bs";

interface IProps {
  onSearch: (keyword: string) => void;
}

const SearchBox = ({ onSearch }: IProps): JSX.Element => {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <Box>
      <InputGroup size={"lg"} shadow={"xl"} borderRadius={"full"}>
        <InputLeftAddon
          backgroundColor={"transparent"}
          borderLeftRadius={"full"}
          _hover={{ cursor: "pointer" }}
          onClick={() => setKeyword("")}
        >
          {keyword === "" && <BsSearch />}
          {keyword !== "" && <BsArrowLeft />}
        </InputLeftAddon>
        <Input
          focusBorderColor={"#e2e8f0"}
          placeholder={"Type your medicine name here"}
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter" && keyword !== "") {
              onSearch(keyword);
            }
          }}
        />
        <InputRightAddon
          backgroundColor={"transparent"}
          borderRightRadius={"full"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            if (keyword !== "") onSearch(keyword);
          }}
        >
          Search
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
};

export default SearchBox;
