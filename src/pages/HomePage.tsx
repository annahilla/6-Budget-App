import Header from "../components/Header";
import Button from "../components/Button";

const HomePage = () => {
    return (
        <>
            <Header title="Coneix el pressupost per a la teva pàgina web" />

            <div className="flex flex-col items-center justify-center gap-10 text-center my-20 m-auto md:w-2/3">
                <h5 className="text-2xl font-semibold">Benvingut a la nostra aplicació de càlcul de pressupost per a la creació de pàgines web</h5>
                <p className="text-xl font-light">
                    Aquesta eina està pensada per ajudar tant professionals del sector com a petites empreses, autònoms i emprenedors que necessiten estimar el cost de construir o renovar la seva presència online de manera fàcil i ràpida.
                </p>
                <Button link='/budget' text="Comença aquí" />
            </div>
        </>
    )
}

export default HomePage;