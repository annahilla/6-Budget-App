import WebOptionsCard from "../components/WebOptionsCard";
import Header from "../components/Header";
import PriceCount from "../components/PriceCount";
import options from "../data/options.json";
import FormCard from "../components/FormCard";
import ToggleButton from "../components/ui/ToggleButton";
import { PriceProvider, usePriceContext } from "../context/PriceContext";

const BudgetPage = () => {
  const { totalPrice } = usePriceContext();

  return (
    <PriceProvider>
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
              <WebOptionsCard
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
      {totalPrice > 0 && <FormCard />}
    </PriceProvider>
  );
};

export default BudgetPage;
