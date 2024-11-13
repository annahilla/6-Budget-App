import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import ExtrasConfig from "./ExtrasConfig";
import Card from "./ui/Card";

const WebOptionsCard = ({
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
  const [currentPrice, setCurrentPrice] = useState(price);
  const { updateWebPrice, updateCardOptions, cardOptions, isDiscounted } =
    usePriceContext();

  useEffect(() => {
    if (isDiscounted) {
      setCurrentPrice(price * (1 - discount));
    } else {
      setCurrentPrice(price);
    }
  }, [isDiscounted, cardOptions]);

  useEffect(() => {
    updateCardOptions({
      id: id,
      title: title,
      webPrice: isChecked ? currentPrice : 0,
      discount: discount,
      remove: !isChecked,
    });
  }, [isChecked]);

  useEffect(() => {
    const optionExists = cardOptions.some((option) => option.id === id);
    setIsChecked(optionExists);
  }, [cardOptions, id]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    if (checked) {
      updateWebPrice(price, discount);
    } else {
      updateWebPrice(-price, discount);
    }
  };

  const checkedStyles = isChecked && "border-2 border-green justify-start";

  return (
    <Card styles={checkedStyles}>
      <div className="flex flex-col justify-start gap-10 items-center w-100 md:flex-row md:justify-between md:h-fit md:text-left">
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
        {isChecked && id === 3 && <ExtrasConfig />}
      </div>
    </Card>
  );
};

export default WebOptionsCard;
