import { usePriceContext } from "../context/PriceContext";

const PriceCount = () => {
  const { totalPrice } = usePriceContext();

  return (
    <div className="font-bold text-2xl my-20 m-auto flex items-center justify-center gap-2 lg:justify-end md:w-2/3">
      <span>Preu pressupostat: </span>
      <span> <span className="font-extrabold text-4xl">{totalPrice}</span> €</span>
    </div>
  );
};

export default PriceCount;
