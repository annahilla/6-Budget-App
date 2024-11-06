import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import WebsiteCustomization from "./WebsiteCustomization";
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
    updateCardOptions({
      title: title,
      numPages: numPages,
      numLanguages: numLanguages,
      extrasPrice: (numPages + numLanguages) * 30,
    });
  }, [numPages, numLanguages]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      updateWebPrice(price);
      addSelectedCard(id);
    } else {
      updateWebPrice(-price);
      removeSelectedCard(id);
      updateCardOptions({
        title: title,
        numPages: 0,
        numLanguages: 0,
        extrasPrice: 0,
      });
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
          <WebsiteCustomization
            updateNumPages={handleNumPagesChange}
            updateNumLanguages={handleNumLanguagesChange}
          />
        )}
      </div>
    </Card>
  );
};

export default WebTypeCard;
