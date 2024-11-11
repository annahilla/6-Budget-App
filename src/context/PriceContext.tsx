import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  totalExtrasPrice: number;
  cardOptions: CardOptions[];
  userInfo: User[];
  updateWebPrice: (amount: number) => void;
  updateCardOptions: (props: CardOptions) => void;
  selectedCards: number[];
  addSelectedCard: (id: number) => void;
  removeSelectedCard: (id: number) => void;
  updateUserInfo: (props: User) => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  totalExtrasPrice: 0,
  cardOptions: [],
  userInfo: [],
  updateWebPrice: () => {},
  updateCardOptions: () => {},
  selectedCards: [],
  addSelectedCard: () => {},
  removeSelectedCard: () => {},
  updateUserInfo: () => {},
});

export const usePriceContext = () => {
  return useContext(PriceContext);
};

interface Props {
  children?: ReactNode;
}

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
  numPages: number;
  numLanguages: number;
  extrasPrice: number;
  remove: boolean;
}

export const PriceProvider = ({ children }: Props) => {
  const [cardOptions, setCardOptions] = useState<CardOptions[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const updateWebPrice = (amount: number) => {
    setWebPrice((prevPrice) => prevPrice + amount);
  };

  const updateCardOptions = (props: CardOptions) => {
    const { id, title, numPages, numLanguages, extrasPrice, remove } = props;
    setCardOptions((prev) => {
      if (remove) {
        return prev.filter((option) => option.id !== id);
      }
      const existingItem = prev.find((item) => item.title === title);
      if (existingItem) {
        if (
          existingItem.numPages !== numPages ||
          existingItem.numLanguages !== numLanguages
        ) {
          return prev.map((item) =>
            item.title === title
              ? { ...item, numPages, numLanguages, extrasPrice }
              : item
          );
        } else {
          return prev;
        }
      } else {
        return [
          ...prev,
          { id, title, numPages, numLanguages, extrasPrice, remove },
        ];
      }
    });
  };

  const updateUserInfo = (props: User) => {
    const { id, name, phone, email, cardOptions, date } = props;
    setUserInfo((prev) => [...prev, { id, name, phone, email, cardOptions, totalPrice, date }]);
  };

  useEffect(() => {
    setTotalExtrasPrice(
      cardOptions.reduce(
        (accumulator, card) => accumulator + card.extrasPrice,
        0
      )
    );
    setTotalPrice(webPrice + totalExtrasPrice);
  }, [cardOptions, webPrice, totalExtrasPrice]);

  const addSelectedCard = (id: number) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(id) ? prevSelected : [...prevSelected, id]
    );
  };

  const removeSelectedCard = (id: number) => {
    setSelectedCards((prevSelected) =>
      prevSelected.filter((cardId) => cardId !== id)
    );
  };

  return (
    <PriceContext.Provider
      value={{
        totalPrice,
        webPrice,
        totalExtrasPrice,
        cardOptions,
        selectedCards,
        userInfo,
        updateWebPrice,
        updateCardOptions,
        addSelectedCard,
        removeSelectedCard,
        updateUserInfo,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
