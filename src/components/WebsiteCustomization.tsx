import NumberInput from "./NumberInput";

const WebsiteCustomization = () => {
  return (
    <form className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <label>Nombre de pàgines</label>
        <NumberInput />
      </div>
      <div className="flex gap-4">
        <label>Nombre de llenguatges</label>
        <NumberInput />
      </div>
    </form>
  );
};

export default WebsiteCustomization;
