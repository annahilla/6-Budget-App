import Card from "./Card";

const SavedBudgets = () => {
  return (
    <section className="m-auto my-20">
      <h3 className="font-bold text-2xl m-auto my-6 lg:w-2/3">
        Pressupostos en curs:
      </h3>
      <Card styles="flex-row">
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold text-left flex flex-col gap-1">
            <h6 className="font-bold text-3xl">Ona Costa</h6>
            <p className="text-md text-gray-500">ona.costa@gmail.com</p>
            <p className="text-md text-gray-500">643 345 245</p>
          </div>
          <div className="font-bold text-md text-left">
            <p>Serveis contractats:</p>
            <ul className="list-disc px-5">
              <li>Web (4 pàgines, 2 llenguatges)</li>
              <li>Seo</li>
            </ul>
          </div>
          <div className="text-left flex flex-col items-center">
            <p className="font-bold text-xl text-gray-500">Total:</p>
            <p className="text-2xl">
              <span className="font-extrabold text-5xl">760</span> €
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default SavedBudgets;
