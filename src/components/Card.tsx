const Card = ({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: number;
}) => {
  return (
    <div className="shadow-lg rounded-2xl p-10 flex items-center justify-between w-2/3 m-auto">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="font-bold text-3xl">{price}€</div>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Afegir</label>
      </div>
    </div>
  );
};

export default Card;
