import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import ExtrasConfig from "./ExtrasConfig";
import Card from "./Card";

const WebTypeCard = ({
  id,
  title,
  description,
  price,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);
  const {
    updateWebPrice,
    updateCardOptions,
    addSelectedCard,
    removeSelectedCard,
  } = usePriceContext();

  useEffect(() => {
    if (isChecked) {
      updateCardOptions({
        id: id,
        title: title,
        numPages: numPages,
        numLanguages: numLanguages,
        extrasPrice: (numPages + numLanguages) * 30,
        remove: false,
      });
    } else {
      updateCardOptions({
        id: id,
        title: title,
        numPages: 0,
        numLanguages: 0,
        extrasPrice: 0,
        remove: true,
      });
    }
  }, [numPages, numLanguages, isChecked]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      updateWebPrice(price);
      addSelectedCard(id);
    } else {
      updateWebPrice(-price);
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
    isChecked && "border-2 border-green h-100 justify-start md:h-60";

  return (
    <Card styles={checkedStyles}>
      <div className="flex flex-col justify-start items-center gap-10 w-100 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="font-bold text-3xl">
          <span className="font-extrabold text-4xl">{price}</span>€
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              name="checkbox"
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
