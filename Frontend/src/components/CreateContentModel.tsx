import { CrosIcon } from "./ShareIcon";
import { Button } from "./Button";
import { Input } from "./Input";


export function CreateContent({open,onClose}:{
    open:boolean,
    onClose:()=> void
}){
    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-70 flex justify-center">
               
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-yellow-600 w-80 opacity-100 p-4 rounded flex justify-center flex-col">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer left-0">
                                <CrosIcon />
                            </div>
                        </div>
                        <div className="flex flex-col text-white">
                            <div className="py-2"><Input type='text' placeholder={"Title"} /></div>
                            <div className="py-2"><Input type='text' placeholder={"Link"} /></div>
                        </div>
                        <div>
                            <h1 className="font-semibold text-yellow-600">Type of url:</h1>
                            <div className="py-2"><Input type='text' placeholder={"Youtube/Twitter link"} /></div>
                            <div className="flex gap-1 justify-center pb-2">
                               
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button variant="primary" text="Submit"/>
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>
}

