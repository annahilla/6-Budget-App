import WebTypeCard from "../components/WebTypeCard";
import Header from "../components/Header";
import PriceCount from "../components/PriceCount";
import { usePriceContext } from "../context/PriceContext";
import options from "../data/options.json";
import FormCard from "../components/FormCard";
import ToggleButton from "../components/ToggleButton";

const BudgetPage = () => {

  const { selectedCards } = usePriceContext();
  
  return (
    <>
      <Header title="Aconsegueix la millor qualitat" />
      <div className="flex items-center justify-center m-auto py-10">
        <ToggleButton />
      </div>
      <div className="flex flex-col gap-4">
        {options &&
          options.map(
            (option: {
              id: number;
              title: string;
              description: string;
              price: number;
              discount: number;
            }) => (
              <WebTypeCard
                key={option.id}
                id={option.id}
                title={option.title}
                description={option.description}
                price={option.price}
                discount={option.discount}
              />
            )
          )}
      </div>
      <PriceCount />
      {selectedCards.length > 0 && <FormCard />}
    </>
  );
};

export default BudgetPage;
