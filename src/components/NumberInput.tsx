import { useEffect, useState } from "react";

const NumberInput = ({ updateExtras } : { updateExtras: (inputValue: number) => void}) => {
  const [inputValue, setInputValue] = useState(0);

  const decreaseInputValue = () => {
    setInputValue(prev => prev - 1);
  }

  const increaseInputValue = () => {
    setInputValue(prev => prev + 1);
  }

  useEffect(() => {
    updateExtras(inputValue);
  }, [inputValue])

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={decreaseInputValue} type="button" className="rounded-full w-4 h-4 text-xs border border-slate-300 text-slate-500 flex items-center justify-center pb-0.5">
        -
      </button>
      <input
        className="w-10 text-center border rounded border-slate-300 outline-none"
        type="number"
        onChange={() => updateExtras(inputValue)}
        value={inputValue}
      />
      <button onClick={increaseInputValue} type="button" className="rounded-full w-4 h-4 text-xs border border-slate-300 text-slate-500 flex items-center justify-center pb-0.5">
        +
      </button>
      
    </div>
  );
};

export default NumberInput;
