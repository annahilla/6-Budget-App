import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PriceContextType {
  totalPrice: number;
  webPrice: number;
  totalExtrasPrice: number;
  cardOptions: CardOptions[];
  userInfo: User[];
  selectedCards: number[];
  isDiscounted: boolean;
  updateWebPrice: (amount: number, discount: number) => void;
  updateCardOptions: (props: CardOptions) => void;
  addSelectedCard: (id: number) => void;
  removeSelectedCard: (id: number) => void;
  updateUserInfo: (props: User) => void;
  updateIsDiscounted: () => void;
}

const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  webPrice: 0,
  totalExtrasPrice: 0,
  cardOptions: [],
  userInfo: [],
  selectedCards: [],
  isDiscounted: false,
  updateWebPrice: () => {},
  updateCardOptions: () => {},
  addSelectedCard: () => {},
  removeSelectedCard: () => {},
  updateUserInfo: () => {},
  updateIsDiscounted: () => {},
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
  webPrice: number;
  discount: number;
  remove: boolean;
}

export const PriceProvider = ({ children }: Props) => {
  const [cardOptions, setCardOptions] = useState<CardOptions[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isDiscounted, setIsDiscounted] = useState(false);

  const updateIsDiscounted = () => {
    setIsDiscounted((prev) => !prev);
  };

  const updateWebPrice = (amount: number, discount: number) => {
    if (isDiscounted) {
      setWebPrice((prevPrice) => prevPrice + amount * (1 - discount));
    } else {
      setWebPrice((prevPrice) => prevPrice + amount);
    }
  };

  const updateCardOptions = (props: CardOptions) => {
    const { id, title, numPages, numLanguages, extrasPrice, webPrice, discount, remove } = props;
    setCardOptions((prev) => {
      if (remove) {
        return prev.filter((option) => option.id !== id);
      }

      const existingItem = prev.find((item) => item.title === title);
      if (existingItem) {
        if (
          existingItem.numPages !== numPages ||
          existingItem.numLanguages !== numLanguages ||
          existingItem.webPrice !== webPrice
        ) {
          return prev.map((item) =>
            item.title === title
              ? { ...item, numPages, numLanguages, extrasPrice, webPrice }
              : item
          );
        } else {
          return prev;
        }
      } else {
        return [
          ...prev,
          { id, title, numPages, numLanguages, extrasPrice, webPrice, discount, remove },
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
    setTotalExtrasPrice(
      cardOptions.reduce(
        (accumulator, card) => accumulator + card.extrasPrice,
        0
      )
    );
    setTotalPrice(webPrice + totalExtrasPrice);


      cardOptions.map(card => setWebPrice(card.webPrice))
    
    console.log(cardOptions)
  }, [cardOptions, webPrice, totalExtrasPrice, isDiscounted]);

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
        isDiscounted,
        updateWebPrice,
        updateCardOptions,
        addSelectedCard,
        removeSelectedCard,
        updateUserInfo,
        updateIsDiscounted,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
