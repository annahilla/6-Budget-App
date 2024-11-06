import Card from "../components/Card";
import Header from "../components/Header";
import Button from "../components/Button";
import PriceCount from "../components/PriceCount";
import { PriceProvider } from "../context/PriceContext";
import options from "../data/options.json";

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
                <Card
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
    </PriceProvider>
    )
}

export default BudgetPage;