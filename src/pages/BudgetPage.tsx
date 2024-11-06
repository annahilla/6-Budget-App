import WebTypeCard from "../components/WebTypeCard";
import Header from "../components/Header";
import PriceCount from "../components/PriceCount";
import { PriceProvider } from "../context/PriceContext";
import options from "../data/options.json";
import FormCard from "../components/FormCard";

const BudgetPage = () => {

    return(
        <PriceProvider>
        <Header title="Aconsegueix la millor qualitat" />
        <div className="flex flex-col gap-4">
          {options &&
            options.map(
              (option: {
                id: number;
                title: string;
                description: string;
                price: number;
              }) => (
                <WebTypeCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  price={option.price}
                />
              )
            )}
        </div>
        <PriceCount />
        <FormCard />
    </PriceProvider>
    )
}

export default BudgetPage;