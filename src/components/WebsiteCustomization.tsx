
import NumberInput from "./NumberInput";

const WebsiteCustomization = ({
  updateNumPages,
  updateNumLanguages, 
  numPages, 
  numLanguages
}: {
  updateNumPages: (inputValue: string) => void, 
  updateNumLanguages: (inputValue: string) => void, 
  numPages: number, 
  numLanguages: number
}) => {
  


  return (
    <form className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <label>Nombre de pàgines</label>
        <NumberInput updateExtras={updateNumPages} numExtras={numPages}/>
      </div>
      <div className="flex gap-4">
        <label>Nombre de llenguatges</label>
        <NumberInput updateExtras={updateNumLanguages} numExtras={numLanguages}/>
      </div>
    </form>
  );
};

export default WebsiteCustomization;
