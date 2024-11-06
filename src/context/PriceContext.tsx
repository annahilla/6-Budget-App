import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  numExtras: number;
  cardOptions: WebExtra[];
  updateWebPrice: (amount: number) => void;
  updateNumExtras: (amount: number) => void;
  updateCardOptions: (props: WebExtra) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  numExtras: 0,
  cardOptions: [],
  updateWebPrice: () => {},
  updateNumExtras: () => {},
  updateCardOptions: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

interface Props {
  children?: ReactNode;
}

interface WebExtra {
  title: string;
  numPages: number;
  numExtras: number;
}

export const PriceProvider = ({ children }: Props) => {
  const [cardOptions, setCardOptions] = useState<WebExtra[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [numExtras, setNumExtras] = useState(0);

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateNumExtras = (amount: number) => {
    setNumExtras(amount);
  };

  const updateCardOptions = (props: WebExtra) => {
    const { title, numPages, numExtras } = props;
    setCardOptions((prev) => {
      const existingItem = prev.find((item) => item.title === title);
      if (existingItem) {
        if (
          existingItem.numPages !== numPages ||
          existingItem.numExtras !== numExtras
        ) {
          return prev.map((item) =>
            item.title === title ? { ...item, numPages, numExtras } : item
          );
        } else {
          return prev;
        }
      } else {
        return [...prev, { title, numPages, numExtras }];
      }
    });
  };

  useEffect(() => {
    const extrasPrice = numExtras * 30;
    setTotalPrice(webPrice + extrasPrice);
  }, [webPrice, numExtras]);

  return (
    <PriceContext.Provider
      value={{
        totalPrice,
        webPrice,
        numExtras,
        cardOptions,
        updateWebPrice,
        updateNumExtras,
        updateCardOptions,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
