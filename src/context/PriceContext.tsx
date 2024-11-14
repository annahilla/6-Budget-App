import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import options from "../data/options.json";

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
  toggleDiscount: () => void;
  updateNumPages: (amount: number) => void;
  updateNumLangs: (amount: number) => void;
  updateSearchParams: (params: string, value: string) => void;
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
  toggleDiscount: () => {},
  updateNumPages: () => {},
  updateNumLangs: () => {},
  updateSearchParams: () => {},
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
  const [webPrice, setWebPrice] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [numLangs, setNumLangs] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pages = searchParams.get("pages");
  const langs = searchParams.get("langs");

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

  useEffect(() => {
    if (!isInitialized) {
      const newPages = Number(pages);
      const newLangs = Number(langs);

      setNumPages(newPages);
      setNumLangs(newLangs);

      const initialOptions = options
        .filter((option) => searchParams.get(option.title) === "true")
        .map((option) => ({
          id: option.id,
          title: option.title,
          webPrice: option.price,
          discount: option.discount,
          remove: false,
        }));

      setCardOptions(initialOptions);
      setIsInitialized(true);

      if (pages !== null) {
        updateSearchParams("pages", newPages.toString());
      }
      if (langs !== null) {
        updateSearchParams("langs", newLangs.toString());
      }
    }
  }, [isInitialized]);

  const updateNumPages = (amount: number) => {
    setNumPages(amount);
    updateSearchParams("pages", amount.toString());
  };

  const updateNumLangs = (amount: number) => {
    setNumLangs(amount);
    updateSearchParams("langs", amount.toString());
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
      const updatedOptions = remove
        ? prev.filter((option) => option.id !== id)
        : [...prev.filter((option) => option.id !== id), props];

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

    const extrasCalculation = (numLangs + numPages) * pricePerExtra;

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
        numPages,
        numLangs,
        updateWebPrice,
        updateCardOptions,
        updateUserInfo,
        toggleDiscount,
        updateNumPages,
        updateNumLangs,
        updateSearchParams,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
