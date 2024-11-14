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
  const {
    updateWebPrice,
    updateCardOptions,
    updateSearchParams,
    deleteLangsAndPages,
    isDiscounted,
    searchParams,
  } = usePriceContext();
  const [currentPrice, setCurrentPrice] = useState(price);
  const isChecked = searchParams.get(title) === "true";
  const hasWeb = searchParams.get("Web") === "true";

  useEffect(() => {
    if (isDiscounted) {
      setCurrentPrice(price * (1 - discount));
    } else {
      setCurrentPrice(price);
    }
  }, [isDiscounted]);

  useEffect(() => {
    updateCardOptions({
      id,
      title,
      webPrice: isChecked ? currentPrice : 0,
      discount,
      remove: !isChecked,
    });
  }, [isChecked, currentPrice]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const priceChange = checked ? currentPrice : -currentPrice;

    updateWebPrice(priceChange, discount);
    updateSearchParams(title, checked ? "true" : "false");
  };

  useEffect(() => {
    if (!hasWeb) {
      deleteLangsAndPages();
    }
  }, [searchParams]);

  const checkedStyles = isChecked && "border-2 border-green justify-start";

  return (
    <Card styles={checkedStyles}>
      <div className="flex flex-col justify-start gap-10 items-center md:flex-row md:justify-between md:h-fit md:text-left">
        <div className="flex flex-col gap-2 max-w-72">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p>{description}</p>
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
