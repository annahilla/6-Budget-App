import { ChangeEvent, useEffect, useState } from "react";

const NumberInput = ({
  updateExtras,
  value,
}: {
  updateExtras: (inputValue: number) => void;
  value: number;
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setInputValue(newValue);
    updateExtras(newValue);
  };

  const decreaseInputValue = () => {
    const newValue = Math.max(0, inputValue - 1);
    setInputValue(newValue);
    updateExtras(newValue);
  };

  const increaseInputValue = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    updateExtras(newValue);
  };

  useEffect(() => {
    setInputValue(value);
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
        value={inputValue}
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
