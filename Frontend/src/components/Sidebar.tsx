import { BrainLogo, TwitterLogo, YoutubeLogo } from "./ShareIcon"
import { SidebarContent } from "./SidebarInfo"
// import { brain } from "../assets/brain.png"

export const Sidebar = () => {
    return <div className="w-72 border-r bg-yellow-600 fixed h-screen">
        <div className="flex items-center text-2xl text-yellow-200 font-bold pl-5 pt-5 cursor-pointer">
            
            
            <div className="pr-2">
            <BrainLogo/>
                <img src="../assets/brain.png" alt="" />
            </div>
            BRAINLY
        </div>
        <div className="pt-5  pl-7">
            <SidebarContent icon={<YoutubeLogo/>} text={"Youtube"}/>
            <SidebarContent icon={<TwitterLogo/>} text={"Twitter"}/>
        </div>

    </div>
}