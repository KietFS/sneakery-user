import type { NextPage } from "next";
import { Input, Spacer } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <>
      <Input
        clearable
        label="Name"
        placeholder="Name"
        initialValue="NextUI"
        required
      />
    </>
  );
};

export default Home;
