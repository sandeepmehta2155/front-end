import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Home} from "./home"
import { SignInComponent } from "./signin";
import { SignUpComponent } from "./signup";
import { About } from "./about";
import { Route, Routes , Link } from "react-router-dom";
import { AddProduct } from "./add-product";
import { BuyProduct } from "./buy-product"
import { useLogin } from "../login-context/login-provider";
import { AddDeposists } from "./add-deposits";

export const NavBar = () => {

  const { LogOut , LoginHandler } = useLogin()

  const {login} = JSON.parse(localStorage.getItem('login')) || {
    login : false
  }

  function LoginHandlerLocal() {
    
     login ?  LogOut() : LoginHandler()
  }

    return  <>
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-person" viewBox="0 0 16 16" onClick={LoginHandlerLocal}>
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            
          </svg><br/> <br/>
          <label className="bi bi-file" onClick={LoginHandlerLocal}>
              {login ? 'Logout' : 'Login'}
            </label>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
               <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Home</a>
                </li>
                </Link>

                <Link to="/about">
                <li className="nav-item">
                  <a className="nav-link" href=" ">About</a>
                </li>
                </Link>

                <Link to="/addproduct">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Add product</a>
                </li>
                </Link>

                <Link to="/buyproduct">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Buy Product</a>
                </li>
                </Link>

                <Link to="/adddeposits">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Add Deposits</a>
                </li>
                </Link>

                <Link to="/signin">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Signin</a>
                </li>
                </Link>

                <Link to="/signup">
                <li className="nav-item">
                  <a className="nav-link" href=" ">Signup</a>
                </li>
                </Link>
              </ul>

            </div>
          </div>
        </nav>  

        <Routes>
           <Route path="/" element={<Home /> } />
           <Route path="/about" element={<About /> } />
           <Route path="/addproduct" element={<AddProduct />} />
           <Route path="/buyproduct" element={<BuyProduct />} />
           <Route path="/adddeposits" element={<AddDeposists />} />
           <Route path="/signin" element={<SignInComponent /> } />
           <Route path="/signup" element={<SignUpComponent />} />
    </Routes>   
</>
}