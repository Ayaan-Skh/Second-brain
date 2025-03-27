import { ReactElement } from "react"


export function SidebarContent({ text, icon }:{
    text:string,
    icon:ReactElement
}) {
    return <div className="mr-4 rounded-lg flex shadow-lg text-yellow-200 cursor-pointer p-2 hover:bg-yellow-200 hover:text-yellow-600  transition-all duration-300 ">
        <div className="pr-2">
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}