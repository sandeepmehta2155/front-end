import { useEffect } from "react"
import { useNavigate } from "react-router"

export const About = () => {
    useEffect(()=>{
        
        callAboutPage();

},[])

    const navigate = useNavigate()

    const callAboutPage = async () => {

    try {
        const resp = await fetch("/auth/about" , {
            method : "GET" , 
            headers : {
                Accept : "application/json" , 
                "Content-type"  :   "application/json" 
            } , 
            credentials : "include"
        })

        const data  = await resp.json();

        console.log(data)

        if(resp.status !== 200){
            const error = new Error(resp.error);

            throw error;

        }

    } catch (error) {
        console.log(error); 
        navigate("/signin");
    }

}

   
    return <>
    <h1> THis is about page </h1>
     </>
}