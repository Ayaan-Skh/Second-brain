import { ReactElement } from "react"

interface Buttonprops {
    variant: "primary" | "secondary"
    text: string,
    startIcon?:ReactElement,
    onClick?:()=> void
}

const variantColour={
    "primary":"bg-yellow-200 text-yellow-400",
    "secondary":"bg-yellow-600 text-yellow-200"
}
const defaultStyles="m-4 px-3 flex items-center justify-center py-2 rounded-lg  hover:bg-opacity-80 transition-all duration-300"

export const Button = ({variant,text,startIcon,onClick}: Buttonprops)=>{
    return (
        <button onClick={onClick} className={variantColour[variant] + " "+ defaultStyles}>
            <div className="">
                {startIcon}
            </div>
            {text}
        </button>
    )
}