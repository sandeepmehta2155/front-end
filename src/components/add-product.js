import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useLogin } from "../login-context/login-provider";
import axios from "axios";
import { SvgImg } from "./img";

export const AddProduct = () => {
  const [ user, setUser] = useState({ username : "" , productName : "" , productPrice: 0 , productDescription : "" ,productQuantity : 0 });

  const [products , setProducts] = useState([])

  const [update , setUpdate] = useState('none')

  const editProducts = async() => {
    try {
        
            const products = await axios.get('/auth/getproducts')

            setProducts(products.data.products)

            if(!products)
            throw new Error(`can't retrive new product`)

    } catch (error) {

        console.log(error)
        
    }
}


  const {userLogin , LogOut} = useLogin()

        useEffect(() => {          
            callAboutPage();

            if(!userLogin)
            LogOut()
        
        },[])

        useEffect( () => {
            editProducts();
        } , [products])

        let name  , value;  

    const HandleInput = (e) => {

            name = e.target.name;
            value = e.target.value;

            setUser({ ...user , [name] : value})

    }

    const navigate = useNavigate()

    const EditHandler = async (key) => {

        try {
            const resp = await axios.patch(`/auth/updateproduct/${key?._id}` , { ...key,
                productName : key?.productName ,
                productDescription : key?.productDescription , 
                productPrice : key?.productPrice ,
                productQuantity : key?.productQuantity,
            })

            if(resp.status === 200){
            window.alert('product updates in database')

            console.log(resp)

            // setProducts()
            }

        } catch (error) {

            console.log(error)
            
        }

    }

    const DeleteHandler = async (id) => {

        try {
            const resp = await axios.delete(`/auth/removeproduct/${id}` , {
              id
            })

            if(resp.status === 200){
            window.alert('product removed from database')

            console.log(resp)

            // setProducts()
            }

        } catch (error) {

            console.log(error)
            
        }

    }

    const callAboutPage = async () => {

    try {
        const resp = await fetch("/auth/about" , {
            method : "GET" , 
            headers : {
                Accept : "application/json" , 
                "Content-type" : "application/json" 
            } , 
            credentials : "include"
        })

        const data  = await resp.json();

        if(resp.status !== 200){

            const error = new Error(resp.error);
            throw error;

        }
        setUser(data);

    } catch (error) {
        console.log(error); 
        navigate("/signin");
    }

}


const PostData = async (e) => {

    e.preventDefault();

    const { username  ,  productName , productDescription , productQuantity , productPrice } = user;

    const response = await fetch('/auth/product' ,{
        method :  "POST" , 
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({
            username , productName , productDescription , productQuantity , productPrice
        })
    })

    const data = await response.json();

    console.log("42",response?.status , data)
    
    if(response?.status === 200){
        window.alert("product added successfully"); 
        
        setUser({...user , productName : "" , productDescription : "" , productQuantity : 0 , productPrice : 0})
    }
    else
    {   window.alert('error while adding product')
        navigate("/signin")
        setUser({...user , productName : "" , productDescription : "" , productQuantity : 0 , productPrice : 0})
    }

}
   
    return <>
    <h1> Add a product </h1>

    <h4> username : {user?.username }</h4>
    <h4> role : {user?.role} </h4>
    <section className='signup'>
        <div className="container mt-5">
            <div className="signup-content">
            {user?.role === 'Seller' &&  
             <div className="signup-form"> 
                    <h2 className="form-title">Add a product</h2>
                            <div className="form-group">
                                <label htmlFor='username'>
                                <i className="zmdi zmdi-assignment-account material-icons-name"></i>
                                </label>
                                <input type="text" name="username" id="username" placeholder="Your username" value={user.username}
                                autoComplete="off" />
                            </div>
                
                            <div className="form-group">
                                <label htmlFor='name'>
                             
                                </label>
                                <input type="productName" name="productName" id="productName" value={user.productName} onChange={(e)=> HandleInput(e)} placeholder="Enter productName " autoComplete="off"/> <br/><br/>

                                <input type="text" name="productDescription" id="productDescription" value={user.productDescription} onChange={(e)=> HandleInput(e)} placeholder="Enter productDescription " autoComplete="off"/> <br/> <br />
                                
                                <input type="text" name="productPrice" id="productPrice" value={user.productPrice} onChange={(e)=> HandleInput(e)} placeholder="Enter productPrice " autoComplete="off"/> <br/> <br />

                                <input type="number" name="productQuantity" id="productQuantity" value={user.productQuantity} onChange={(e)=> HandleInput(e)} placeholder="Enter productQuantity " autoComplete="off"/>

                            </div>
                            {/* <div className="form-group form-button"> */}
                                <button onClick={PostData}>Add</button> <button onClick={() => EditHandler(user)}style={{ display : update }} >Update</button>
                                
                            {/* </div> */}
                  </div>
            }   </div>
        </div>
    </section>

    {user?.role === 'Buyer' && <> 
    <h1>You can't add add products as per your role</h1>
    <SvgImg />
    </>}
    <h1> Products </h1>

    <ul className="products">
        {products.map((key)=>{
            return key?.sellerUserName === user?.username ? 
             <div>
            <h3> {key?.productName} </h3> <br/><br/>
            <h4> {key?.productDescription } </h4>
            <h4> Price : {key?.productPrice} </h4>
            <h4> Quantity : {key?.productQuantity} </h4>
            <h4> Seller : {key?.sellerUserName} </h4> <br/>
            <button onClick={() =>{

                setUser({ ...user,
                    _id : key?._id ,
                    productName : key?.productName ,
                    productDescription : key?.productDescription , 
                    productPrice : key?.productPrice ,
                    productQuantity : key?.productQuantity, 
                  })
        
        
                  setUpdate('block')
            }
                }> Edit </button>  {'  '} <button onClick={() => DeleteHandler(key?._id) }> Delete </button> 
            </div> :  <> </>
        })}
    </ul>
    
     </>
}