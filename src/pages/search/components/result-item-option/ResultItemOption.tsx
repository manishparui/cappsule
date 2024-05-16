import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Tag, Text } from "@chakra-ui/react";

interface IOption {
  name: string;
  isAvailable: boolean;
}

interface IProps {
  title: string;
  options: IOption[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const ResultItemOption = ({
  title,
  options,
  selectedOption,
  onSelect,
}: IProps): JSX.Element => {
  const [maxHeight, setMaxHeight] = useState<string | undefined>("4rem");
  const [shouldShowToggle, setShouldShowToggle] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onToggle = (): void => {
    if (maxHeight === "4rem") setMaxHeight(undefined);
    else setMaxHeight("4rem");
  };

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;

      const handleScroll = (): void => {
        const containerRect = container.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        if (contentRect.bottom <= containerRect.bottom) setShouldShowToggle(false);
        else setShouldShowToggle(true);
      };

      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <Flex marginY={6}>
      <Box width={"25%"}>
        {title}
      </Box>
      
      <Box width={"60%"} overflowY={"hidden"}>
        <Flex
          ref={containerRef}
          wrap={"wrap"}
          maxHeight={maxHeight}
          overflowY={"hidden"}
        >
          {options.map((option, index) => (
            <Tag
              ref={index === options.length - 1 ? contentRef : undefined}
              key={option.name}
              marginRight={2}
              marginBottom={2}
              backgroundColor={"transparent"}
              border={option.isAvailable ? "1px solid" : "1px dashed"}
              color={option.name === selectedOption ? "black" : "gray"}
              borderColor={option.name === selectedOption ? "black" : "gray"}
              shadow={option.name === selectedOption ? "xl" : "none"}
              _hover={{ cursor: "pointer" }}
              onClick={() => onSelect(option.name)}
            >
              {option.name}
            </Tag>
          ))}
        </Flex>
      </Box>

      <Box width={"15%"} position={"relative"}>
        {shouldShowToggle && (
          <Text position={"absolute"} bottom={0} onClick={onToggle} _hover={{cursor: "pointer"}}>
            {maxHeight === undefined ? "hide" : "more"}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default ResultItemOption;
