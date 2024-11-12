import { ChangeEvent, useEffect, useState } from "react";

const NumberInput = ({
  updateExtras,
  initialValue,
}: {
  updateExtras: (inputValue: number) => void;
  initialValue: number;
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setInputValue(newValue);
    updateExtras(newValue);
  };

  const decreaseInputValue = () => {
    setInputValue((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const increaseInputValue = () => {
    setInputValue((prev) => prev + 1);
  };

  useEffect(() => {
    updateExtras(inputValue);
  }, [inputValue]);

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
