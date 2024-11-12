import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import ExtrasConfig from "./ExtrasConfig";
import Card from "./Card";

const WebTypeCard = ({
  id,
  title,
  description,
  price,
  discount,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [numLanguages, setNumLanguages] = useState(0);
  const {
    updateWebPrice,
    updateCardOptions,
    addSelectedCard,
    removeSelectedCard,
    cardOptions,
    isDiscounted,
  } = usePriceContext();

  useEffect(() => {
    if (isDiscounted) {
      setCurrentPrice(price * (1 - discount));
    } else {
      setCurrentPrice(price);
    }
  }, [isDiscounted, cardOptions]);

  useEffect(() => {
    if (isChecked) {
      updateCardOptions({
        id: id,
        title: title,
        numPages: numPages,
        numLanguages: numLanguages,
        extrasPrice: (numPages + numLanguages) * 30,
        webPrice: currentPrice,
        totalPrice: currentPrice + (numPages + numLanguages) * 30,
        discount: discount,
        remove: false,
      });
    } else {
      updateCardOptions({
        id: id,
        title: title,
        numPages: 0,
        numLanguages: 0,
        extrasPrice: 0,
        webPrice: 0,
        totalPrice: 0,
        discount: discount,
        remove: true,
      });
    }
  }, [numPages, numLanguages, isDiscounted, isChecked, currentPrice]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    if (checked) {
      updateWebPrice(price, discount);
      addSelectedCard(id);
    } else {
      updateWebPrice(-price, discount);
      removeSelectedCard(id);
    }
  };

  const handleNumPagesChange = (inputValue: number) => {
    setNumPages(inputValue);
  };

  const handleNumLanguagesChange = (inputValue: number) => {
    setNumLanguages(inputValue);
  };

  const checkedStyles =
    isChecked && "border-2 border-green justify-start md:h-fit";

  return (
    <Card styles={checkedStyles}>
      <div className="flex flex-col justify-start gap-10 items-center w-100 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p className="md:w-72">{description}</p>
        </div>
        <div className="font-bold text-3xl flex flex-col items-center justify-center gap-2">
          {isDiscounted && (
            <p className="text-xl text-yellow-500">Estalvia un 20%</p>
          )}
          <span className="font-extrabold text-4xl">{currentPrice}€</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              id={`checkbox-${id}`}
              className="accent-green"
            />
            <label htmlFor={`checkbox-${id}`}>Afegir</label>
          </div>
        </div>
      </div>
      <div className="self-end">
        {isChecked && (
          <ExtrasConfig
            updateNumPages={handleNumPagesChange}
            updateNumLanguages={handleNumLanguagesChange}
          />
        )}
      </div>
    </Card>
  );
};

export default WebTypeCard;
