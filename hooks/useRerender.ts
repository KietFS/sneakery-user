import { useState } from "react";

export const useRerender = () => {
  const [bool, setBool] = useState(false);

  const rerender = () => {
    setBool((prev) => !prev);
  };

  return { rerender };
};
