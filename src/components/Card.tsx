import { ChangeEvent, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import WebsiteCustomization from "./WebsiteCustomization";

const Card = ({
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
  const { totalPrice, updatePrice } = usePriceContext();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      updatePrice(price);
    } else {
      updatePrice(-price);
    }
    console.log(totalPrice);
  };

  const checkedStyles = isChecked
    ? "border-2 border-green h-60 justify-start"
    : " justify-center";

  return (
    <div
      className={`shadow-lg rounded-2xl p-10 flex flex-col text-center gap-7 m-auto md:w-2/3 ${checkedStyles}`}
    >
      <div className="flex flex-col justify-start items-center gap-10 w-100 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="font-bold text-3xl">{price}€</div>
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
      <div className="self-end">{isChecked && <WebsiteCustomization />}</div>
    </div>
  );
};

export default Card;
