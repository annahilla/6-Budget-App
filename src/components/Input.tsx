import { ChangeEvent } from "react";

const Input = ({
  placeholder,
  value,
  onChangeInput,
}: {
  placeholder: string;
  value: string | number;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="border text-gray-500 rounded color px-3 py-2 outline-none w-2/3 md:grow"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChangeInput}
    />
  );
};

export default Input;
