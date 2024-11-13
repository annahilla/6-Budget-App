import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  cardOptions: CardOptions[];
  userInfo: User[];
  isDiscounted: boolean;
  numPages: number;
  numLangs: number;
  updateWebPrice: (amount: number, discount: number) => void;
  updateCardOptions: (props: CardOptions) => void;
  updateUserInfo: (props: User) => void;
  updateIsDiscounted: () => void;
  updateNumPages: (amount: number) => void;
  updateNumLangs: (amount: number) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  cardOptions: [],
  userInfo: [],
  isDiscounted: false,
  numPages: 0,
  numLangs: 0,
  updateWebPrice: () => {},
  updateCardOptions: () => {},
  updateUserInfo: () => {},
  updateIsDiscounted: () => {},
  updateNumPages: () => {},
  updateNumLangs: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  cardOptions: CardOptions[];
  totalPrice: number;
  date: Date;
}

export interface CardOptions {
  id: number;
  title: string;
  webPrice: number;
  discount: number;
  remove: boolean;
}

interface Props {
  children?: ReactNode;
}

export const PriceProvider = ({ children }: Props) => {
  const [cardOptions, setCardOptions] = useState<CardOptions[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [numLangs, setNumLangs] = useState(0);

  const pricePerExtra = 30;

  const updateNumPages = (amount: number) => {
    setNumPages(amount);
  };

  const updateNumLangs = (amount: number) => {
    setNumLangs(amount);
  };

  const updateIsDiscounted = () => {
    setIsDiscounted((prev) => !prev);
  };

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateCardOptions = (props: CardOptions) => {
    const { id, title, webPrice, discount, remove } = props;
    setCardOptions((prev) => {
      if (remove) {
        return prev.filter((option) => option.id !== id);
      } else {
        return [
          ...prev,
          {
            id,
            title,
            webPrice,
            discount,
            remove,
          },
        ];
      }
    });
  };

  const updateUserInfo = (props: User) => {
    const { id, name, phone, email, cardOptions, date } = props;
    setUserInfo((prev) => [
      ...prev,
      { id, name, phone, email, cardOptions, totalPrice, date },
    ]);
  };

  useEffect(() => {
    const webPriceCalculation = cardOptions.reduce((accumulator, card) => {
      const discountedWebPrice = isDiscounted
        ? card.webPrice * (1 - card.discount)
        : card.webPrice;
      return accumulator + discountedWebPrice;
    }, 0);

    const extrasCalculation = (numLangs + numPages) * pricePerExtra;

    setTotalPrice(webPriceCalculation + extrasCalculation);
  }, [cardOptions, isDiscounted, numLangs, numPages]);

  return (
    <PriceContext.Provider
      value={{
        totalPrice,
        webPrice,
        cardOptions,
        userInfo,
        isDiscounted,
        numPages,
        numLangs,
        updateWebPrice,
        updateCardOptions,
        updateUserInfo,
        updateIsDiscounted,
        updateNumPages,
        updateNumLangs,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
