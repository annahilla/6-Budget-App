import Card from "./Card";
import { usePriceContext } from "../context/PriceContext";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import { useEffect, useState } from "react";

const SavedBudgets = () => {
  const { userInfo } = usePriceContext();
  const [sortedUsers, setSortedUsers] = useState(userInfo);
  const [isAscendingByName, setIsAscendingByName] = useState(false);
  const [isAscendingByDate, setIsAscendingByDate] = useState(false);

  useEffect(() => {
    setSortedUsers(userInfo);
  }, [userInfo])

  const sortByDate = () => {
    if(isAscendingByDate) {
      setSortedUsers(sortedUsers.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        if(dateA < dateB) {
          return -1;
        }
        if(dateB > dateA) {
          return 1;
        }
        return 0;
      }))
    } else {
      setSortedUsers(sortedUsers.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        if(dateA < dateB) {
          return 1;
        }
        if(dateB > dateA) {
          return -1;
        }
        return 0;
      }))
    }
    setIsAscendingByDate(prev => !prev)
  }

  const resetOrder = () => {
    setSortedUsers(userInfo);
  }

  const sortByName = () => {
    if(isAscendingByName) {
      setSortedUsers(sortedUsers.sort((a, b) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }))
    } else {
      setSortedUsers(sortedUsers.sort((a, b) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }))
    }
    setIsAscendingByName(prev => !prev);
  }

  return (
    <section className="m-auto my-20">
      <div className="m-auto border-t-2 border-dashed border-gray-300 my-10 2xl:w-2/3"></div>
      <h3 className="font-bold pt-4 text-2xl m-auto my-6 text-center 2xl:w-2/3 lg:text-left">
        Pressupostos en curs:
      </h3>
      <ul className="flex font-bold text-lg text-gray-600 m-auto items-center justify-end gap-10 2xl:w-2/3">
        <li className="cursor-pointer hover:text-black active:text-black">
          <button onClick={sortByDate} className="flex items-center justify-center gap-1 cursor-pointer">
            Data
            <span className="pt-1">
              {isAscendingByDate ? <BiUpArrow size={14} /> : <BiDownArrow size={14} />}
            </span>
          </button>
        </li>
        <li className="hover:text-black active:text-black">
          <button onClick={resetOrder} className="flex items-center justify-center gap-1 cursor-pointer">
          Import
          <span className="pt-1">
            <BiDownArrow size={14} />
          </span>
          </button>
          
        </li>
        <li className="cursor-pointer hover:text-black active:text-black">
          <button onClick={sortByName} className="flex items-center justify-center gap-1 cursor-pointer">
            Nom
            <span className="pt-1">
              {isAscendingByName ? <BiUpArrow size={14} /> : <BiDownArrow size={14} />}
            </span>
          </button>
        </li>
      </ul>
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

                  if (option.numPages > 0 && option.numLanguages > 0) {
                    details = `${option.numPages} pàgines, ${option.numLanguages} llenguatges`;
                  } else if (option.numPages > 0) {
                    details = `${option.numPages} pàgines`;
                  } else if (option.numLanguages > 0) {
                    details = `${option.numLanguages} llenguatges`;
                  }

                  return (
                    <li key={option.title}>
                      {option.title}
                      {details && ` (${details})`}
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
