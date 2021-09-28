import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Home} from "./home"
import { SignInComponent } from "./signin";
import { SignUpComponent } from "./signup";
import { About } from "./about";
import { Route, Routes , Link } from "react-router-dom";

export const NavBar = () => {
    return  <>
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href=" ">Navbar</a> */}
            
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
           <Route path="/signin" element={<SignInComponent /> } />
           <Route path="/signup" element={<SignUpComponent />} />
    </Routes>   
</>
}