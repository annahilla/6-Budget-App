import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  numExtras: number;
  numPages: number;
  numLanguages: number;
  updateWebPrice: (amount: number) => void;
  updateNumExtras: (amount: number) => void;
  updateNumPages: (amount: number) => void;
  updateNumLanguages: (amount: number) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  numExtras: 0,
  numPages: 0,
  numLanguages: 0,
  updateWebPrice: () => {},
  updateNumExtras: () => {},
  updateNumPages: () => {},
  updateNumLanguages: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

interface Props {
  children?: ReactNode;
}

export const PriceProvider = ({ children }: Props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [numExtras, setNumExtras] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateNumExtras = (amount: number) => {
    setNumExtras(amount);
  }

  const updateNumPages = (amount: number) => {
    setNumPages(amount);
  }

  const updateNumLanguages = (amount: number) => {
    setNumLanguages(amount);
  }

  useEffect(() => {
    const extrasPrice = numExtras * 30;
    setTotalPrice(webPrice + extrasPrice);
   }, [webPrice, numExtras])

  return (
    <PriceContext.Provider value={{ totalPrice, webPrice, numExtras, numPages, numLanguages, updateWebPrice, updateNumExtras, updateNumPages, updateNumLanguages}}>
      {children}
    </PriceContext.Provider>
  );
};
