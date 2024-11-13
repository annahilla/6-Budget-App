import { useState } from "react";
import NumberInput from "./ui/NumberInput";
import { MdInfoOutline } from "react-icons/md";
import Modal from "./ui/Modal";
import { usePriceContext } from "../context/PriceContext";

const ExtrasConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { updateNumLangs, updateNumPages, numLangs, numPages } =
    usePriceContext();

  const closeModal = () => setIsModalOpen(false);

  const openLangModal = () => {
    setIsModalOpen(true);
    setTitle("Número de llenguatges");
    setText(
      "Afegeix els llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€."
    );
  };

  const openPageModal = () => {
    setIsModalOpen(true);
    setTitle("Número de pàgines");
    setText(
      "Afegeix les pàgines que necessitis per a dur a terme el teu projecte. El cost de cada pàgina és de 30€."
    );
  };

  return (
    <form className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <label className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={openPageModal}
            className="text-gray-500"
          >
            <MdInfoOutline />
          </button>
          <span>Nombre de pàgines</span>
        </label>
        <NumberInput updateExtras={updateNumPages} value={numPages} />
      </div>
      <div className="flex gap-5">
        <label className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={openLangModal}
            className="text-gray-500"
          >
            <MdInfoOutline />
          </button>
          <span>Nombre de llenguatges</span>
        </label>
        <NumberInput updateExtras={updateNumLangs} value={numLangs} />
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={title}
        text={text}
      />
    </form>
  );
};

export default ExtrasConfig;
