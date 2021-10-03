import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const About = () => {
    const [ user, setUser] = useState({});
   
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

        if(resp.status !== 200){
            const error = new Error(resp.error);

            throw error;

        }
        if(resp.status === 200 )
        setUser(data);

    } catch (error) {
        console.log(error); 
        navigate("/signin");
    }

}

   
    return <>
    <h1> This is about page </h1>

    <h2> Welcome , {user?.username } !</h2>

     </>
}