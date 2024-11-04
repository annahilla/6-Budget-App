import { usePriceContext } from "../context/PriceContext";

const PriceCount = () => {
  const { totalPrice } = usePriceContext();

  return (
    <div className="font-bold text-2xl my-20  m-auto flex items-center justify-center gap-2 md:justify-end md:w-2/3">
      <span>Preu pressupostat: </span>
      <span> {totalPrice} €</span>
    </div>
  );
};

export default PriceCount;
