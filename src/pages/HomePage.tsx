import Header from "../components/Header";
import Button from "../components/Button";

const HomePage = () => {
  return (
    <main>
      <Header title="Coneix el pressupost per a la teva pàgina web" />

      <div className="flex flex-col items-center justify-center gap-10 text-center my-10 m-auto md:w-2/3">
        <p className="text-xl font-light">
          La nostra aplicació està pensada perquè puguis personalitzar cada
          detall del teu projecte web. Pots indicar quantes pàgines
          necessitaràs, quants idiomes vols que estiguin disponibles, i
          seleccionar diversos extres opcionals, com ara serveis de SEO,
          campanyes d'Ads o optimitzacions especials. A mesura que modifiques
          aquests paràmetres, el pressupost es calcula automàticament, donant-te
          una visió precisa i actualitzada del cost total segons els serveis que
          has escollit.
        </p>
        <Button link="/budget" text="Comença ara" />
      </div>
    </main>
  );
};

export default HomePage;
