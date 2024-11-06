const Input = ({ placeholder } : { placeholder: string }) => {
    return (
        <input className="border border-slate-300 rounded color px-3 py-2 outline-none w-2/3 md:grow" type="text" placeholder={placeholder} />
    )
}

export default Input;