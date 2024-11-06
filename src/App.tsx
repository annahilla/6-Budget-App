import { PriceProvider } from "./context/PriceContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Card from "./components/Card";
import PriceCount from "./components/PriceCount";
import options from "./data/options.json";

function App() {
  return (
    <PriceProvider>
      <main className="mx-10 my-8 md:mx-20">
        <Navbar />
        <Header />

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
      </main>
    </PriceProvider>
  );
}

export default App;
