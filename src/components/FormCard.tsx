import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Card from "./Card";
import Input from "./Input";
import { FaArrowRight } from "react-icons/fa";
import { usePriceContext, User } from "../context/PriceContext";
import SavedBudgets from "./SavedBudgets";

const FormCard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showBudget, setShowBudget] = useState(false);
  const { cardOptions, updateUserInfo, totalPrice, userInfo } = usePriceContext();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: User = {
      name,
      phone,
      email,
      cardOptions,
      totalPrice
    }
    updateUserInfo(formData);
    setShowBudget(true);

    setName("");
    setPhone("");
    setEmail("");
  };


  return (
    <>
      <Card styles="px-0 py-10 my-10 lg:p-10">
        <h3 className="font-bold text-2xl text-center lg:text-left">
          Demanar pressupost
        </h3>
        <form
          onSubmit={submitForm}
          className="flex flex-col items-center justify-between gap-3 lg:flex-row"
        >
          <Input type="string" placeholder="Name" value={name} onChangeInput={onChangeName} name="name" />
          <Input type="number"
            placeholder="Telèfon"
            value={phone}
            name="phone"
            onChangeInput={onChangePhone}
          />
          <Input type="string"
            placeholder="Email"
            value={email}
            name="email"
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
      {showBudget && <SavedBudgets/>}
    </>
  );
};

export default FormCard;
