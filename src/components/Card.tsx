import { ChangeEvent } from "react";
import { usePriceContext } from "../context/PriceContext";

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
  const { totalPrice, updatePrice } = usePriceContext();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      updatePrice(price);
    } else {
      updatePrice(-price);
    }
    console.log(totalPrice);
  };

  return (
    <div className="shadow-lg rounded-2xl p-10 flex flex-col justify-center items-center text-center m-auto gap-10 md:text-left md:flex-row md:justify-between md:w-2/3 ">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="font-bold text-3xl">{price}€</div>
      <div className="flex items-center gap-2">
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          name="checkbox"
          id={`checkbox-${id}`}
        />
        <label htmlFor={`checkbox-${id}`}>Afegir</label>
      </div>
    </div>
  );
};

export default Card;
