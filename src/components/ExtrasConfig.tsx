import NumberInput from "./NumberInput";

const ExtrasConfig = ({
  updateNumPages,
  updateNumLanguages,
}: {
  updateNumPages: (inputValue: number) => void;
  updateNumLanguages: (inputValue: number) => void;
}) => {
  return (
    <form className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <label>Nombre de pàgines</label>
        <NumberInput updateExtras={updateNumPages} />
      </div>
      <div className="flex gap-4">
        <label>Nombre de llenguatges</label>
        <NumberInput updateExtras={updateNumLanguages} />
      </div>
    </form>
  );
};

export default ExtrasConfig;
