const NumberInput = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="rounded-full w-4 h-4 text-xs border border-slate-500 text-slate-500 flex items-center justify-center pb-0.5">
        +
      </button>
      <input
        className="w-10 text-center border rounded border-slate-500 outline-none"
        type="number"
      />
      <button className="rounded-full w-4 h-4 text-xs border border-slate-500 text-slate-500 flex items-center justify-center pb-0.5">
        -
      </button>
    </div>
  );
};

export default NumberInput;
