import { useState } from "react";
import { usePriceContext } from "../context/PriceContext";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const { updateIsDiscounted } = usePriceContext();

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    updateIsDiscounted();
  };

  return (
    <div className="flex items-center justify-center gap-5 text-md font-semibold">
      <p>Pagament mensual</p>
      <button
        onClick={handleToggle}
        className={`w-16 h-8 flex items-center rounded-full p-1 ${
          isToggled ? "bg-green" : "bg-gray-300"
        } transition-colors duration-300`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
            isToggled ? "translate-x-8" : "translate-x-0"
          } transition-transform duration-300`}
        ></div>
      </button>
      <p>Pagament anual</p>
    </div>
  );
};

export default ToggleButton;
