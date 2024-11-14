import Card from "./ui/Card";
import { usePriceContext } from "../context/PriceContext";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { ChangeEvent, useEffect, useState } from "react";

const SavedBudgets = () => {
  const { userInfo, searchParams } = usePriceContext();
  const [sortedUsers, setSortedUsers] = useState(userInfo);
  const [isAscendingByName, setIsAscendingByName] = useState(false);
  const [isAscendingByDate, setIsAscendingByDate] = useState(false);
  const numPages = Number(searchParams.get("pages"));
  const numLangs = Number(searchParams.get("langs"));

  useEffect(() => {
    setSortedUsers(userInfo);
  }, [userInfo]);

  const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const result = userInfo.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.includes(value)
    );

    setSortedUsers(result);
  };

  const sortByDate = () => {
    const sortedUsers = [...userInfo].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return isAscendingByDate ? dateA - dateB : dateB - dateA;
    });
    setSortedUsers(sortedUsers);
    setIsAscendingByDate((prev) => !prev);
  };

  const resetOrder = () => {
    setSortedUsers(userInfo);
  };

  const sortByName = () => {
    if (isAscendingByName) {
      const sortedUsers = [...userInfo].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSortedUsers(sortedUsers);
    } else {
      const sortedUsers = [...userInfo].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setSortedUsers(sortedUsers);
    }
    setIsAscendingByName((prev) => !prev);
  };

  return (
    <section className="m-auto my-20">
      <div className="m-auto border-t-2 border-dashed border-gray-300 my-10 2xl:w-2/3"></div>
      <h3 className="font-bold pt-4 text-2xl m-auto my-6 text-center 2xl:w-2/3 lg:text-left">
        Pressupostos en curs:
      </h3>
      <div className="flex flex-col font-bold text-lg text-gray-600 m-auto items-center justify-end gap-10 pb-5 2xl:w-2/3 lg:flex-row">
        <div className="justify-self-end align-self-end relative">
          <input
            onChange={searchItem}
            className="border rounded-lg px-4 py-2 outline-none"
            type="text"
          />
          <span className="absolute top-3 right-4 text-gray-500">
            <IoSearch size={22} />
          </span>
        </div>
        <ul className="flex itemx-center justify-between gap-10 lg:gap-5">
          <li className="cursor-pointer hover:text-black active:text-black">
            <button
              onClick={sortByDate}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              Data
              <span className="pt-1">
                {isAscendingByDate ? (
                  <BiUpArrow size={14} />
                ) : (
                  <BiDownArrow size={14} />
                )}
              </span>
            </button>
          </li>
          <li className="hover:text-black active:text-black">
            <button
              onClick={resetOrder}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              Import
              <span className="pt-1">
                <BiDownArrow size={14} />
              </span>
            </button>
          </li>
          <li className="cursor-pointer hover:text-black active:text-black">
            <button
              onClick={sortByName}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              Nom
              <span className="pt-1">
                {isAscendingByName ? (
                  <BiUpArrow size={14} />
                ) : (
                  <BiDownArrow size={14} />
                )}
              </span>
            </button>
          </li>
        </ul>
      </div>
      {sortedUsers.map((user) => (
        <Card key={user.id} styles="flex-row flex-wrap">
          <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:justify-between">
            <div className="font-semibold text-center flex flex-col gap-1 lg:w-1/3 lg:text-left">
              <h6 className="font-bold text-3xl">{user.name}</h6>
              <p className="text-lg text-gray-500">{user.email}</p>
              <p className="text-lg text-gray-500">{user.phone}</p>
            </div>
            <div className="font-bold text-center text-lg lg:text-left lg:justify-self-center lg:flex-1">
              <p className="py-4 lg:py-0">Serveis contractats:</p>
              <ul className="px-5 lg:list-disc">
                {user.cardOptions.map((option) => {
                  let details = "";

                  if (numPages > 0 && numLangs > 0) {
                    details = `${numPages} pàgines, ${numLangs} llenguatges`;
                  } else if (numPages > 0) {
                    details = `${numPages} pàgines`;
                  } else if (numLangs > 0) {
                    details = `${numLangs} llenguatges`;
                  }

                  return (
                    <li key={option.title}>
                      {option.title}
                      {option.id === 3 && ` (${details})`}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="text-center flex flex-col items-center lg:text-left">
              <p className="font-bold text-xl text-gray-500">Total:</p>
              <p className="text-2xl">
                <span className="font-extrabold text-5xl">
                  {user.totalPrice}
                </span>{" "}
                €
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
};

export default SavedBudgets;
