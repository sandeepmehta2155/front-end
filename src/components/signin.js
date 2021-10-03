import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useLogin } from "../login-context/login-provider"

export const SignInComponent = () => {

   
    const { LoginHandler } = useLogin()

    const navigate = useNavigate()

    const [username , setUsername ] = useState()

    const [password , setPassword] = useState()

    const { token } = JSON.parse(localStorage.getItem('token')) || {
        token : ''
    }

    useEffect( () => {
        token ? navigate('/about') : navigate('/signin')
    } ,[])

    const Submit = async(e) => {

        e.preventDefault();

        const resp = await fetch('/auth/signin' , {
            method : "POST" , 
            headers : {
                "Content-type" : "application/json" 
            } ,
            body : JSON.stringify({
                username , password
            })
        })


        const data = await resp.json()
        
        if(data?.message === "user authentication is successful"){
            window.alert('Auth is Successful')

            localStorage.setItem('token' , JSON.stringify({ token : data.token}))

            localStorage.setItem('login' , JSON.stringify({ login : true}))

            setTimeout(()=> navigate('/about') , 1000)

            LoginHandler()
        }
        else 
        window.alert('Invalid auth')

    }

    return <>
    <h1> This is signin component </h1>
  
    <section className='signup'>
        <div className="container mt-5">
            <div className="signup-content">
                <div className="signup-form"> 
                    <h2 className="form-title">Sign In</h2>
                        <form className="register-form" method='POST' id="register-form">
                            <div className="form-group">
                                <label htmlFor='name'>
                                <i class="zmdi zmdi-assignment-account material-icons-name"></i>
                                </label>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="username" id="username" placeholder="Your username" autoComplete="off"/>

                            </div>
                        
                            <div className="form-group">
                                <label htmlFor='name'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Your password" autoComplete="off"/>

                            </div>
                          
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" onClick={Submit} className="form-submit" value="Login"/>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </section>
 
    </>
}