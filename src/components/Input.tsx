import { ChangeEvent } from "react";

const Input = ({
  placeholder,
  value,
  name,
  type,
  onChangeInput,
}: {
  placeholder: string;
  value: string | number;
  name: string;
  type: string;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="border text-gray-500 rounded color px-3 py-2 outline-none w-2/3 md:grow"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChangeInput}
      required
    />
  );
};

export default Input;
