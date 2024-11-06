const Card = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles: string | boolean;
}) => {
  return (
    <div
      className={`shadow-lg rounded-2xl p-10 flex flex-col text-center gap-7 m-auto lg:w-2/3 ${styles}`}
    >
      {children}
    </div>
  );
};

export default Card;
