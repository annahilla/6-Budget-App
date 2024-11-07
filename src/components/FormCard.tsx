import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./Card";
import Input from "./Input";
import { FaArrowRight } from "react-icons/fa";
import { usePriceContext } from "../context/PriceContext";
import SavedBudgets from "./SavedBudgets";

const FormCard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { cardOptions, updateUserInfo } = usePriceContext();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserInfo({ name, phone, email, cardOptions });
  };

  return (
    <>
      <Card styles="my-10">
        <h3 className="font-bold text-2xl text-center lg:text-left">
          Demanar pressupost
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between gap-3 lg:flex-row"
        >
          <Input placeholder="Name" value={name} onChangeInput={onChangeName} />
          <Input
            placeholder="Telèfon"
            value={phone}
            onChangeInput={onChangePhone}
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeInput={onChangeEmail}
          />
          <button
            type="submit"
            className="bg-green p-2 text-white rounded-md cursor-pointer flex items-center justify-center gap-2 hover:opacity-90 w-2/3 md:grow"
          >
            <span className="pb-0.5">Sol·licitar pressupost</span>
            <FaArrowRight />
          </button>
        </form>
      </Card>
      <SavedBudgets />
    </>
  );
};

export default FormCard;
