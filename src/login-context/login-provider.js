import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext()

export function LoginProvider({children}){

    const navigate = useNavigate();

    const {login} = JSON.parse(localStorage.getItem('login')) || {
        login : false
    }

    const [userLogin , setUserLogin] = useState(login)

    function LoginHandler() {
        if(login)
        LogOut()

        setUserLogin(true)
    }

    function LogOut() {

        setUserLogin(false)
        navigate('/signin')
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        localStorage.removeItem('deposit');
    }

    return <LoginContext.Provider value={{ LogOut , userLogin ,LoginHandler }}>
        {children}
    </LoginContext.Provider>
}

export function useLogin(){
    return useContext(LoginContext)
}