import { Link } from "react-router-dom";

const Button = ({ text, link } : {text: string, link: string}) => {
    return (
        <Link to={link} className="bg-orange text-white p-3 font-semibold rounded-lg cursor-pointer hover:opacity-90">
            {text}
        </Link>
    )
}

export default Button;