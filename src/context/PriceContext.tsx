import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  totalExtrasPrice: number;
  cardOptions: CardOptions[];
  updateWebPrice: (amount: number) => void;
  updateCardOptions: (props: CardOptions) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  totalExtrasPrice: 0,
  cardOptions: [],
  updateWebPrice: () => {},
  updateCardOptions: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

interface Props {
  children?: ReactNode;
}

interface CardOptions {
  title: string;
  numPages: number;
  numLanguages: number;
  extrasPrice: number;
}

export const PriceProvider = ({ children }: Props) => {
  const [cardOptions, setCardOptions] = useState<CardOptions[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateCardOptions = (props: CardOptions) => {
    const { title, numPages, numLanguages, extrasPrice } = props;
    setCardOptions((prev) => {
      const existingItem = prev.find((item) => item.title === title);
      if (existingItem) {
        if (
          existingItem.numPages !== numPages ||
          existingItem.numLanguages !== numLanguages
        ) {
          return prev.map((item) =>
            item.title === title ? { ...item, numPages, numLanguages, extrasPrice } : item
          );
        } else {
          return prev;
        }
      } else {
        return [...prev, { title, numPages, numLanguages, extrasPrice }];
      }
    });
  };

  useEffect(() => {
    setTotalExtrasPrice(cardOptions.reduce((accumulator, card) => accumulator + card.extrasPrice, 0));
    setTotalPrice(webPrice + totalExtrasPrice);
  }, [cardOptions, webPrice, totalExtrasPrice]);

  return (
    <PriceContext.Provider
      value={{
        totalPrice,
        webPrice,
        totalExtrasPrice,
        cardOptions,
        updateWebPrice,
        updateCardOptions,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
