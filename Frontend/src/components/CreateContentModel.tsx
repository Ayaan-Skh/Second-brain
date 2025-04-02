import { CrosIcon } from "./ShareIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";
import { BACKEND_URL } from "../pages/config";
import axios from "axios";
import { useContent } from "../hooks/useContent";
import {toast} from "react-hot-toast"

export function CreateContent({ open, onClose }: {
    open: boolean,
    onClose: () => void
}) {
    async function addContent() {
        
        // enum ContentType{
        //     Youtube='youtube',
        //     Twitter='twitter'
        // }
        try {
            const title = titleRef.current?.value
            const type = typeRef.current?.value
            const link = linkRef.current?.value
            if(!link || !title || !type){
                toast.error("Enter all inputs",{
                    position:"top-center"
                })
                return
            }
           
            await axios.post(BACKEND_URL+"/api/vi/content",{
                title,
                link,
                type
            },{
                headers:{
                    "Authorization":localStorage.getItem('token')
                }
            }
            //@ts-ignore
        )
        
        
        toast.success("Content added",{
            position:"top-center"
        })
    } catch (e) {
        console.log("failed to add content" + e);
        toast.error("failed to add content")
        
    }
        onClose()
    }
    const titleRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)

    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-70 flex justify-center">

            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center rounded-2xl">
                <div className="flex flex-col justify-center">
                    <span className="bg-yellow-600 w-80 opacity-100 p-4 rounded flex justify-center flex-col">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer left-0">
                                <CrosIcon />
                            </div>
                        </div>
                        <div className="flex flex-col text-white">
                            <div className="py-2"><Input ref={titleRef} type='text' placeholder={"Title"} /></div>
                            <div className="py-2"><Input ref={typeRef} type='text' placeholder={"Link"} /></div>
                        </div>
                        <div>
                            <h1 className="font-semibold text-yellow-600">Type of url:</h1>
                            <div className="py-2"><Input type='text' ref={linkRef} placeholder={"Youtube/Twitter link"} /></div>
                            <div className="flex gap-1 justify-center pb-2">

                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent}
                             variant="primary" 
                             text="Submit"
                              />
                        </div>
                    </span>
                </div>
            </div>

        </div>}
    </div>
}

