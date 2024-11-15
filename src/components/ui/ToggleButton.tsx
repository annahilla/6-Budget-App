import { useState } from "react";
import { usePriceContext } from "../../context/PriceContext";

const ToggleButton = () => {
  const { toggleDiscount, searchParams } = usePriceContext();
  const isDiscounted = searchParams.get("annual");
  const [isToggled, setIsToggled] = useState(
    isDiscounted !== null ? isDiscounted : false
  );

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    toggleDiscount();
  };

  return (
    <div className="flex items-center justify-center text-md gap-2 font-semibold sm:gap-5">
      <p className="text-center">Pagament mensual</p>
      <button
        onClick={handleToggle}
        className={`w-16 h-8 flex flex-shrink-0 items-center rounded-full p-1 ${
          isToggled ? "bg-green" : "bg-gray-300"
        } transition-colors duration-300`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
            isToggled ? "translate-x-8" : "translate-x-0"
          } transition-transform duration-300`}
        ></div>
      </button>
      <p className="text-center">Pagament anual</p>
    </div>
  );
};

export default ToggleButton;
