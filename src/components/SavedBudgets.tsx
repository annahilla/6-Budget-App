import Card from "./Card";
import { usePriceContext } from "../context/PriceContext";

const SavedBudgets = () => {
  const { userInfo } = usePriceContext();

  return (
    <section className="m-auto my-20">
      <h3 className="font-bold text-2xl m-auto my-6 lg:w-2/3">
        Pressupostos en curs:
      </h3>
      {
        userInfo.map(user => (
          <Card styles="flex-row">
        <div className="flex flex-col gap-8 justify-center items-center md:flex-row md:justify-between">
          <div className="font-semibold grow text-center flex flex-col gap-1 md:w-20 md:text-left">
            <h6 className="font-bold text-3xl">{user.name}</h6>
            <p className="text-md text-gray-500">{user.email}</p>
            <p className="text-md text-gray-500">{user.phone}</p>
          </div>
          <div className="font-bold grow text-center text-md lg:text-left md:justify-self-start">
            <p className="py-4 md:py-0">Serveis contractats:</p>
            <ul className="px-5 lg:list-disc">
              {
                user.cardOptions.map(option => (
                  <li>{option.title} ({option.numPages} pàgines, {option.numLanguages} llenguatges)</li>
                ))
              }
            </ul>
          </div>
          <div className="text-center flex grow flex-col items-center lg:text-left">
            <p className="font-bold text-xl text-gray-500">Total:</p>
            <p className="text-2xl">
              <span className="font-extrabold text-5xl">{user.totalPrice}</span> €
            </p>
          </div>
        </div>
      </Card>
        ))
      }
    </section>
  );
};

export default SavedBudgets;
