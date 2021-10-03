import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignUpComponent = () => {

    const navigate = useNavigate();

    const [user,setUser] = useState({
        username : '',
        role : '',
        password : '',
        cpassword : ''
    })

    let name , value;

    const HandleInput = (e) => {
            name = e.target.name;
            value = e.target.value;

            setUser({ ...user , [name] : value})

    }

    const PostData = async (e) => {

            e.preventDefault();

            const { username  , password , cpassword , role } = user;

            const response = await fetch('/auth/register' ,{
                method :  "POST" , 
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    username , password , cpassword ,role
                })
            })

            const data = await response.json();

            console.log("42",response?.status , data)
            
            if(response?.status === 201){
                window.alert("Successful registration");  
                navigate("/signin");
            }
            else
            window.alert('Invalid registration')

    }

    return <>
    <h1> This is signup component </h1>

    <section className='signup'>
        <div className="container mt-5">
            <div className="signup-content">
                <div className="signup-form"> 
                    <h2 className="form-title">Sign Up</h2>
                        <form method='POST' className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor='username'>
                                <i className="zmdi zmdi-assignment-account material-icons-name"></i>
                                </label>
                                <input type="text" name="username" id="username" placeholder="Your username" value={user.username}
                                autoComplete="off" onChange={HandleInput} />

                            </div>
                           
                            <div className="form-group">
                                <label htmlFor='name'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <select name="role" id="role" onChange={HandleInput}>
                                    <option></option>
                                    <option>Buyer</option>
                                    <option>Seller</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor='name'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" value={user.password} id="password" onChange={(e)=> HandleInput(e)} placeholder="Your password" autoComplete="off"/>

                            </div>
                            <div className="form-group">
                                <label htmlFor='name'>
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={(e)=> HandleInput(e)} placeholder="Confirm your password" autoComplete="off"/>

                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData} />
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </section>
    </>
}