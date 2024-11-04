import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Card from "./components/Card";
import PriceCount from "./components/PriceCount";
import options from "./data/options.json";

function App() {
  return (
    <main className="mx-20 my-8">
      <Navbar />
      <Header />

      {options &&
        options.map(
          (option: { title: string; description: string; price: number }) => (
            <Card
              title={option.title}
              description={option.description}
              price={option.price}
            />
          )
        )}

      <PriceCount />
    </main>
  );
}

export default App;
