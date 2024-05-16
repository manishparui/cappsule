import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import ResultItemOption from "../result-item-option/ResultItemOption";

interface IProps {
  suggestion: any;
}

interface IOption {
  name: string;
  isAvailable: boolean;
}

const ResultItem = ({ suggestion }: IProps): JSX.Element => {
  const [forms, setForms] = useState<IOption[]>([]);
  const [selectedForm, setselectedForm] = useState<string>(forms[0]?.name);
  const [strengths, setStrengths] = useState<IOption[]>([]);
  const [selectedStrength, setSelectedStrength] = useState<string>(
    strengths[0]?.name
  );
  const [packagings, setPackagings] = useState<IOption[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string>(
    packagings[0]?.name
  );
  const [price, setPrice] = useState<number | null>(null);

  // set forms and selectedForms
  useEffect(() => {
    if (suggestion.salt_forms_json) {
      const formNames: string[] = Object.keys(suggestion.salt_forms_json);
      const forms: IOption[] = [];
      
      for (const formName of formNames) {
        const strengths: any[] = Object.values(
          suggestion.salt_forms_json[formName]
        );
        let products: any[] = [];
        
        for (const strength of strengths) {
          const packagings: any[] = Object.values(strength);
          
          for (const packaging of packagings) {
            products.push(
              ...Object.values(packaging)
                .filter((product) => product !== null)
                .flat()
            );
          }
        }

        forms.push({
          name: formName,
          isAvailable: products.length > 0,
        });
      }

      setForms(forms);
      setselectedForm(forms[0].name);
    }
  }, [suggestion]);
  // end set forms and selectedForms

  // set strengths and selectedStrength
  useEffect(() => {
    if (suggestion.salt_forms_json?.[selectedForm]) {
      const strengthNames: string[] = Object.keys(
        suggestion.salt_forms_json[selectedForm]
      );
      const strengths: IOption[] = [];
      
      for (const strengthName of strengthNames) {
        const packagings: any[] = Object.values(
          suggestion.salt_forms_json[selectedForm][strengthName]
        );
        let products: any[] = [];
        
        for (const packaging of packagings) {
          products.push(
            ...Object.values(packaging)
              .filter((product) => product !== null)
              .flat()
          );
        }
        strengths.push({
          name: strengthName,
          isAvailable: products.length > 0,
        });
      }
      setStrengths(strengths);
      setSelectedStrength(strengths[0].name);
    }
  }, [suggestion, selectedForm]);
  // end set strengths and selectedStrength

  // set packagings and selectedPackaging
  useEffect(() => {
    if (suggestion.salt_forms_json?.[selectedForm]?.[selectedStrength]) {
      const packagingNames: string[] = Object.keys(
        suggestion.salt_forms_json[selectedForm][selectedStrength]
      );
      const packagings: IOption[] = [];
      
      for (const pack of packagingNames) {
        const products: any[] = Object.values(
          suggestion.salt_forms_json[selectedForm][selectedStrength][pack]
        ).filter((product: any) => product !== null) as any[];
        packagings.push({
          name: pack,
          isAvailable: products.length > 0,
        });
      }
      setPackagings(packagings);
      setSelectedPackaging(packagings[0].name);
    }
  }, [suggestion, selectedForm, selectedStrength]);
  // end set packagings and selectedPackaging

  // set price
  useEffect(() => {
    if (
      suggestion.salt_forms_json?.[selectedForm]?.[selectedStrength]?.[
        selectedPackaging
      ]
    ) {
      const products: any[] = Object.values(
        suggestion.salt_forms_json[selectedForm][selectedStrength][
          selectedPackaging
        ]
      ).filter((product: any) => product !== null) as any[];
      
      if (products) {
        const prices = products.flat().map((product) => product.selling_price);
        setPrice(prices.length ? Math.min(...prices) : null);
      }
    }
  }, [suggestion, selectedForm, selectedStrength, selectedPackaging]);
  // end set price

  return (
    <Flex
      paddingX={6}
      paddingY={3}
      marginBottom={12}
      borderRadius={"xl"}
      shadow={"xl"}
      justifyContent={"space-between"}
      border={"1px solid #e2e8f0"}
      bgGradient={"linear(to-r, white, #EAF1F1)"}
    >
      <Box width={"40%"}>
        <ResultItemOption
          title={"Form"}
          options={forms}
          selectedOption={selectedForm}
          onSelect={(option) => setselectedForm(option)}
        />
        <ResultItemOption
          title={"Strength"}
          options={strengths}
          selectedOption={selectedStrength}
          onSelect={(option) => setSelectedStrength(option)}
        />
        <ResultItemOption
          title={"Packaging"}
          options={packagings}
          selectedOption={selectedPackaging}
          onSelect={(option) => setSelectedPackaging(option)}
        />
      </Box>
      <Flex
        width={"30%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"lg"}>
          {suggestion.salt}
        </Text>
        <Text>
          {selectedForm} | {selectedStrength} | {selectedPackaging}
        </Text>
      </Flex>
      <Flex width={"20%"} justifyContent={"center"} alignItems={"center"}>
        {price && (
          <Text fontWeight={"bold"} fontSize={"x-large"}>
            From ₹{price}
          </Text>
        )}
        {!price && (
          <Box padding={3} border={"1px solid lightgrey"} textAlign={"center"}>
            No stores selling this product near you
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default ResultItem;
