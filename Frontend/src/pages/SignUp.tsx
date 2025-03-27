import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
       try{ 
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value
        console.log(usernameRef.current?.value)
        await axios.post(BACKEND_URL + "/api/vi/signup", {
            username,
            password
        })
        alert("You have signed up!")
        navigate("/signin")
    }
    catch{
        alert("You are not signed in")
    }
    }

    return <div className="h-screen w-screen bg-yellow-200 flex justify-center items-center">
        <div className="rounded-xl flex flex-col bg-yellow-400 gap-4 border min-w-48 p-8">
            <Input type="text" ref={usernameRef} placeholder="Username" />
            <Input type="password" ref={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup}  variant="primary" text="Signup" />
            </div>
        </div>
    </div>
}