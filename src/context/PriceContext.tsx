import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  updatePrice: (amount: number) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  updatePrice: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

interface Props {
  children?: ReactNode;
}

export const PriceProvider = ({ children }: Props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const updatePrice = (amount: number) => {
    setTotalPrice((prevPrice) => prevPrice + amount);
  };

  return (
    <PriceContext.Provider value={{ totalPrice, updatePrice }}>
      {children}
    </PriceContext.Provider>
  );
};
