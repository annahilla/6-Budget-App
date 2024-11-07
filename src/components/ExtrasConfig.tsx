import { useState } from "react";
import NumberInput from "./NumberInput";
import { MdInfoOutline } from "react-icons/md";
import InfoModal from "./InfoModal";

const ExtrasConfig = ({
  updateNumPages,
  updateNumLanguages,
}: {
  updateNumPages: (inputValue: number) => void;
  updateNumLanguages: (inputValue: number) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <form className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <label className="flex items-center justify-center gap-1.5">
          <button type="button" onClick={openModal} className="text-gray-500">
            <MdInfoOutline />
          </button>
          <span>Nombre de pàgines</span>
        </label>
        <NumberInput updateExtras={updateNumPages} />
      </div>
      <div className="flex gap-5">
        <label className="flex items-center justify-center gap-1.5">
          <button type="button" onClick={openModal} className="text-gray-500">
            <MdInfoOutline />
          </button>
          <span>Nombre de llenguatges</span>
        </label>
        <NumberInput updateExtras={updateNumLanguages} />
      </div>
      <InfoModal isOpen={isModalOpen} />
    </form>
  );
};

export default ExtrasConfig;
