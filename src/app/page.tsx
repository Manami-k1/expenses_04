import { Left } from "@/components/Left";
import { Middle } from "@/components/Middle";
import { Right } from "@/components/Right";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex h="100vh">
      <Left />
      <Middle />
      <Right />
    </Flex>
  );
};

export default Home;
