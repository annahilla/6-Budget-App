import { ChangeEvent, useEffect, useState } from "react";
import { usePriceContext } from "../context/PriceContext";
import ExtrasConfig from "./ExtrasConfig";
import Card from "./Card";
import { useSearchParams } from "react-router-dom";

const WebTypeCard = ({
  id,
  title,
  description,
  price,
  discount,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [numLanguages, setNumLanguages] = useState(0);
  const {
    updateWebPrice,
    updateCardOptions,
    addSelectedCard,
    removeSelectedCard,
    cardOptions,
    isDiscounted,
  } = usePriceContext();

  const [searchParams, setSearchParams] = useSearchParams({});

  const updateSearchParams = (param: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value !== "0") {
        newParams.set(param, value);
      } else {
        newParams.delete(param);
      }
      return newParams;
    });
  };

  const removeSearchParam = (param: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(param);
      return newParams;
    });
  };

  useEffect(() => {
    if (isDiscounted) {
      setCurrentPrice(price * (1 - discount));
    } else {
      setCurrentPrice(price);
    }
  }, [isDiscounted, cardOptions]);

  useEffect(() => {
    const isCheckedFromUrl = searchParams.get(title) === "true";
    const pagesFromUrl = Number(searchParams.get(`${title}_pages`));
    const languagesFromUrl = Number(searchParams.get(`${title}_lang`));

    console.log("isCheckedFromUrl:", isCheckedFromUrl);
    console.log("pagesFromUrl:", pagesFromUrl);
    console.log("languagesFromUrl:", languagesFromUrl);

    setIsChecked(isCheckedFromUrl);
    setNumPages(pagesFromUrl);
    setNumLanguages(languagesFromUrl);

    console.log(pagesFromUrl, languagesFromUrl);

    if (isCheckedFromUrl) {
      updateCardOptions({
        id: id,
        title: title,
        numPages: pagesFromUrl,
        numLanguages: languagesFromUrl,
        extrasPrice: (pagesFromUrl + languagesFromUrl) * 30,
        webPrice: currentPrice,
        totalPrice: currentPrice + (pagesFromUrl + languagesFromUrl) * 30,
        discount: discount,
        remove: false,
      });
    }
  }, [searchParams, title, id, currentPrice, discount, updateCardOptions]);

  useEffect(() => {
    updateCardOptions({
      id: id,
      title: title,
      numPages: isChecked ? numPages : 0,
      numLanguages: isChecked ? numLanguages : 0,
      extrasPrice: isChecked ? (numPages + numLanguages) * 30 : 0,
      webPrice: isChecked ? currentPrice : 0,
      totalPrice: isChecked ? currentPrice + (numPages + numLanguages) * 30 : 0,
      discount: discount,
      remove: !isChecked,
    });
  }, [numPages, numLanguages, isDiscounted, isChecked, currentPrice]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    if (checked) {
      updateSearchParams(title, "true");
      if (numPages > 0)
        updateSearchParams(`${title}_pages`, numPages.toString());
      if (numLanguages > 0)
        updateSearchParams(`${title}_lang`, numLanguages.toString());
      updateWebPrice(price, discount);
      addSelectedCard(id);
    } else {
      removeSearchParam(title);
      removeSearchParam(`${title}_pages`);
      removeSearchParam(`${title}_lang`);
      updateWebPrice(-price, discount);
      removeSelectedCard(id);
    }
  };

  const handleNumPagesChange = (inputValue: number) => {
    setNumPages(inputValue);
    if (isChecked) {
      updateSearchParams(`${title}_pages`, inputValue.toString());
    }
  };

  const handleNumLanguagesChange = (inputValue: number) => {
    setNumLanguages(inputValue);
    if (isChecked) {
      updateSearchParams(`${title}_lang`, inputValue.toString());
    }
  };

  const checkedStyles =
    isChecked && "border-2 border-green justify-start md:h-fit";

  return (
    <Card styles={checkedStyles}>
      <div className="flex flex-col justify-start gap-10 items-center w-100 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p className="md:w-72">{description}</p>
        </div>
        <div className="font-bold text-3xl flex flex-col items-center justify-center gap-2">
          {isDiscounted && (
            <p className="text-xl text-yellow-500">Estalvia un 20%</p>
          )}
          <span className="font-extrabold text-4xl">{currentPrice}€</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              id={`checkbox-${id}`}
              className="accent-green"
            />
            <label htmlFor={`checkbox-${id}`}>Afegir</label>
          </div>
        </div>
      </div>
      <div className="self-end">
        {isChecked && (
          <ExtrasConfig
            updateNumPages={handleNumPagesChange}
            updateNumLanguages={handleNumLanguagesChange}
            initialPages={numPages}
            initialLanguages={numLanguages}
          />
        )}
      </div>
    </Card>
  );
};

export default WebTypeCard;
