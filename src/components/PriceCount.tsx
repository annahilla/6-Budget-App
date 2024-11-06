import { usePriceContext } from "../context/PriceContext";

const PriceCount = () => {
  const { totalPrice } = usePriceContext();

  return (
    <div className="font-bold text-2xl my-20 m-auto flex flex-col items-center justify-center gap-2 lg:justify-end md:w-2/3 md:flex-row md:items-end">
      <p>Preu pressupostat: </p>
      <p className="font-extrabold text-4xl">
        {totalPrice} <span>€</span>
      </p>
    </div>
  );
};

export default PriceCount;
