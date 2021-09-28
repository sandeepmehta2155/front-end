import { useState } from "react"

export const SignInComponent = () => {

    const [username,setUsername ] = useState()

    const [password , setPassword] = useState()

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
        
        if(data?.message === "user authentication is successful")
        window.alert('Auth is Successful')
        else 
        window.alert('Invalid auth')

    }

    return <>
    <h1> This is signin component </h1>
    <section className='signup'>
        <div className="container mt-5">
            <div className="signup-content">
                <div className="signup-form"> 
                    <h2 className="form-title">Sign Up</h2>
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