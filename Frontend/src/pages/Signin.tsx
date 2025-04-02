import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "./config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate =useNavigate()
    async function Signin() {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const response=await axios.post(BACKEND_URL + "/api/v1/signup", {
                username: username,
                password: password
        })
        const jwt=response.data.token;
        localStorage.setItem("token",jwt)
        alert("You are signed in")
        navigate('/dashboard')
    }
    return <div className="w-screen h-screen flex justify-center items-center bg-yellow-100 " >

        <div className="bg-yellow-400 flex flex-col justify-center items-center rounded-lg text-yellow-400 w-72  h-64">
            <div className="w-32 h-12 mb-2 flex justify-center">

                <Input ref={usernameRef} type='text' placeholder="Enter email" />
            </div>
            <div className="w-32 h-12 mb-2 flex justify-center">

                <Input ref={passwordRef} type='password' placeholder="Password" />
            </div>
            <Button variant="primary" onClick={Signin} text="Signin" />
        </div>
    </div>

} 