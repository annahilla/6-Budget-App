import Card from "./Card";
import Input from "./Input";

const FormCard = () => {
    return (
        <Card conditionalStyles="">
            <h3 className="font-bold text-2xl text-center lg:text-left">Demanar pressupost</h3>
            <form className="flex flex-col items-center justify-between gap-3 lg:flex-row">
                <Input placeholder="Name" />
                <Input placeholder="Telèfon" />
                <Input placeholder="Email" />
                <button className="bg-green p-2 text-white rounded-md cursor-pointer hover:opacity-90 w-2/3 md:grow">Sol·licitar pressupost</button>
            </form>
        </Card>
    )
}

export default FormCard;