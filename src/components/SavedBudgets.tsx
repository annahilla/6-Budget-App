import Card from "./Card";
import { usePriceContext } from "../context/PriceContext";

const SavedBudgets = () => {
  const { userInfo } = usePriceContext();

  return (
    <section className="m-auto my-20">
      <div className="m-auto border-t-2 border-dashed border-gray-300 my-10 2xl:w-2/3"></div>
      <h3 className="font-bold pt-4 text-2xl m-auto my-6 text-center 2xl:w-2/3 lg:text-left">
        Pressupostos en curs:
      </h3>
      {
        userInfo.map(user => (
          <Card styles="flex-row flex-wrap">
        <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:justify-between">
          <div className="font-semibold text-center flex flex-col gap-1 lg:w-20 lg:text-left">
            <h6 className="font-bold text-3xl">{user.name}</h6>
            <p className="text-lg text-gray-500">{user.email}</p>
            <p className="text-lg text-gray-500">{user.phone}</p>
          </div>
          <div className="font-bold text-center text-lg lg:text-left lg:justify-self-start">
            <p className="py-4 lg:py-0">Serveis contractats:</p>
            <ul className="px-5 lg:list-disc">
              {
                user.cardOptions.map(option => (
                  <li>{option.title} ({option.numPages} pàgines, {option.numLanguages} llenguatges)</li>
                ))
              }
            </ul>
          </div>
          <div className="text-center flex flex-col items-center lg:text-left">
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
