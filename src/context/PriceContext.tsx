import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  cardOptions: CardOptions[];
  userInfo: User[];
  isDiscounted: boolean;
  updateWebPrice: (amount: number, discount: number) => void;
  updateCardOptions: (props: CardOptions) => void;
  updateUserInfo: (props: User) => void;
  toggleDiscount: () => void;
  updateSearchParams: (params: string, value: string) => void;
  searchParams: URLSearchParams;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  cardOptions: [],
  userInfo: [],
  isDiscounted: false,
  updateWebPrice: () => {},
  updateCardOptions: () => {},
  updateUserInfo: () => {},
  toggleDiscount: () => {},
  updateSearchParams: () => {},
  searchParams: new URLSearchParams(),
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
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = searchParams.get("pages");
  const langs = searchParams.get("langs");

  const [cardOptions, setCardOptions] = useState<CardOptions[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [webPrice, setWebPrice] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);

  const pricePerExtra = 30;

  const updateSearchParams = (params: string, value: string) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      if (value === "false" || value === "0") {
        updatedParams.delete(params);
      } else {
        updatedParams.set(params, value);
      }
      return updatedParams;
    });
  };

  const toggleDiscount = () => {
    setIsDiscounted((prev) => !prev);
  };

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateCardOptions = (props: CardOptions) => {
    const { id, remove } = props;

    setCardOptions((prev) => {
      let updatedOptions;
      if (remove) {
        updatedOptions = prev.filter((option) => option.id !== id)

      } else {
        updatedOptions = [...prev.filter((option) => option.id !== id), props]
      }
      return updatedOptions;
    });
  };

  const updateUserInfo = (props: User) => {
    const { id, name, phone, email, cardOptions, date } = props;
    setUserInfo((prev) => [
      ...prev,
      { id, name, phone, email, cardOptions, totalPrice, date },
    ]);
  };

  const totalPrice = (() => {
    const webPriceCalculation = cardOptions.reduce((accumulator, card) => {
      const discountedPrice = isDiscounted
        ? card.webPrice * (1 - card.discount)
        : card.webPrice;
      return accumulator + discountedPrice;
    }, 0);

    const extrasCalculation = (Number(langs) + Number(pages)) * pricePerExtra;

    return webPriceCalculation + extrasCalculation;
  })();

  return (
    <PriceContext.Provider
      value={{
        totalPrice,
        webPrice,
        cardOptions,
        userInfo,
        isDiscounted,
        searchParams,
        updateWebPrice,
        updateCardOptions,
        updateUserInfo,
        toggleDiscount,
        updateSearchParams,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
