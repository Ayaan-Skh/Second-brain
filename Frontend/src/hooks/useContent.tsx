import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

export function useContent(){
    const [contents,setContent]=useState([]);
    function refresh(){
        axios.get(`${BACKEND_URL}/api/vi/content`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then((response)=>{
                setContent(response.data.content)
            })
            .catch((e)=>{
                // alert("Error in connecting the database")
                console.log("Error is: ",e)
                return
            })


    }
    useEffect(()=>{
        refresh()
        let interval=setInterval(()=>{
            refresh()
        },3*1000)

        return()=>{
            clearInterval(interval)
        }
            },[])

    return {contents,refresh};
}