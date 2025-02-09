import { FaRegCircleXmark } from 'react-icons/fa6'
import { SiTicktick } from "react-icons/si";

const Message = ({ message, isTypeError }) => {
    return isTypeError ? (
        <div className="bg-off-white fixed bottom-3 right-3 shadow-input-shadow px-5 py-5 w-64 z-50 border-l-4 border-red-600 rounded-tr-xl rounded-br-xl select-none flex items-center">
            <FaRegCircleXmark className="mr-2" />
            <p className="text-red-600 text-sm font-inter font-medium">{message}</p>
        </div>
    ) : (
        <div className="bg-off-white fixed bottom-3 right-3 shadow-input-shadow px-5 py-5 w-64 z-50 border-l-4 border-green-600 rounded-tr-xl rounded-br-xl select-none flex items-center">
            <SiTicktick className="mr-2" />
            <p className="text-green-600 text-sm font-inter font-medium">{message}</p>
        </div>
    )
}

export default Message
