import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../../context/PriceContext";

const NumberInput = ({
  value,
  name
}: {
  value: string | null;
  name: string;
}) => {
  const { updateSearchParams } = usePriceContext();
 
  const [inputValue, setInputValue] = useState(isNaN(Number(value)) ? 0 : Number(value));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams(name, event.target.value);
  };

  const decreaseInputValue = () => {
    let newValue;
    inputValue <= 0 ? newValue = 0 : newValue = inputValue - 1;

    setInputValue(newValue);
    updateSearchParams(name, newValue.toString());
  };

  const increaseInputValue = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    updateSearchParams(name, newValue.toString());
  };

  useEffect(() => {
    setInputValue(Number(value));
  }, [value]);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={decreaseInputValue}
        type="button"
        className="rounded-full w-4 h-4 text-xs border border-gray-400 text-gray-500 flex items-center justify-center pb-0.5"
      >
        -
      </button>
      <input
        className="w-10 text-center border rounded border-gray-400 outline-none"
        type="number"
        onChange={handleChange}
        value={value ? value : "0"}
      />
      <button
        onClick={increaseInputValue}
        type="button"
        className="rounded-full w-4 h-4 text-xs border border-gray-400 text-gray-500 flex items-center justify-center pb-0.5"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
