import { useLogin } from "../login-context/login-provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { SvgImg } from "./img";

export function BuyProduct() {
    
    useEffect(() => {
        callUserProducts()
    } )

  const {userLogin , LogOut} = useLogin()

  const [ user, setUser] = useState({ role : '' });

  const [products , setProducts] = useState([])

  const [userProducts , setUserProducts] = useState([])

  const [productQuantity , setProductQunatity] = useState(0)

  const [userProduct , setUserProduct] = useState({
    username : '' , 
    userID : '', 
    productName : '',
    productID : '' ,
    productPrice : 0,
    productQuantity : 0
  })

  const [displayModal , setDisplayModal] = useState('none')

  const navigate = useNavigate()

  useEffect(() => {          
      callAboutPage();

      callProducts();

      if(!userLogin)
      LogOut()
  
  },[])

  const callProductHandler = async () => {

    let resp;

      try {

        const getUserProducts = await axios.get(`/auth/getuserproducts/${user?._id}`);

        if(userProduct.productQuantity >= productQuantity)
         getUserProducts.data.user.products.push({
            productName : userProduct.productName,
            productID : userProduct.productID,
            productPrice : userProduct.productPrice,
            productQuantity : productQuantity
        })

        else
        window.alert(`can't exceed actual product quantity`)

        if(getUserProducts && userProduct.productQuantity >= productQuantity){
            resp = await axios.patch(`/auth/buyproducts/${user?._id}` , {
                username : user?.username ,
                userID : user?._id ,
                products : getUserProducts.data.user.products
            })

            if(resp.status ===  200){
            window.alert('Product Bought Successfully !')

            let requiredProduct = await axios.get(`/auth/getproductwithid/${userProduct?.productID}`)
                
            const updateProductQuantity = await axios.patch(`/auth/updateproduct/${userProduct?.productID}` ,{
                sellerUserName : requiredProduct.data.products.sellerUserName ,
                productName : requiredProduct.data.products.productName ,
                productDescription : requiredProduct.data.products.productDescription ,
                productQuantity : requiredProduct.data.products.productQuantity - productQuantity ,
            })

            const products = await axios.get(`/auth/getuserproducts/${user?._id}`)

            setUserProducts(products.data.user.products)            

            setProducts(updateProductQuantity.data.products)

            }
            else
            window.alert(`Sorry ! can't add your product`)

            setDisplayModal('none')
        }

        throw new Error('invalid access ')
          
      } catch (error) {
          console.log(error)
      }
  }

  const callAboutPage = async () => {

    callUserProducts();

    try {
        const resp = await fetch("/auth/about" , {
            method : "GET" , 
            headers : {
                Accept : "application/json" , 
                "Content-type" : "application/json" 
            } , 
            credentials : "include"
        })

        const data = await resp.json()

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

    const callModal = (id  , productName, productPrice , productQuantity) => {
        setUserProduct({    

            username : user?.username ,
            userID : user?.userID ,
            productID :  id , 
            productName : productName,
            productPrice : productPrice ,
            productQuantity : productQuantity  
        })
    }

    const callProducts = async() => {

      callUserProducts();

        try {
            
                const products = await axios.get('/auth/getproducts')
                

                setProducts(products.data.products)

                if(!products)
                throw new Error(`can't retrive new product`)

        } catch (error) {

            console.log(error)
            
        }
    }

    const callUserProducts = async() => {
        const products = await axios.get(`/auth/getuserproducts/${user?._id}`)

        if(products)
        setUserProducts(products.data.user.products)     
    }


    return <> 
    <h1> Products </h1>

    {user?.role === 'Seller' && <> 
    <h1>You can't Buy products as per your role</h1>
    <SvgImg />
    </>}

    { user?.role === 'Buyer' && <>
    
            { displayModal === 'block' && 
            
            <div className="buyProductModal">

            <h3> Confirm to buy product </h3>
            <input placeholder="Enter product quantity" type="Number" onChange={(e) => setProductQunatity(e.target.value)} /> 

            <button onClick={() => setDisplayModal('none')}> Close </button> <button onClick={() => callProductHandler()}> Proceed to buy </button>
            </div>}
           
            <ul className="products">
                {products.map((key)=>{
                    return <div> 
                    <h3> {key?.productName} </h3> <br/><br/>
                    <h5> {key?.productDescription } </h5>
                    <h4> Price : {key?.productPrice} </h4>
                    <h4> Quantity : {key?.productQuantity} </h4>
                    <h4> Seller : {key?.sellerUserName} </h4> <br/>

                    <button onClick={() =>{ 
                        
                    setDisplayModal('block');
                    callModal(key?._id  ,key?.productName, key?.productPrice , key?.productQuantity)

                    }}> Buy Product </button>
                    </div>
                })}
            </ul> 
            <h1> Products you Bought</h1>
            <ul className="products">
                {userProducts.map((key)=>{
                    return <div> 
                    <h3> {key?.productName} </h3> <br/><br/>
                    <h5> {key?.productDescription } </h5>
                    <h4> Price : {key?.productPrice} </h4>
                    <h4> Quantity : {key?.productQuantity} </h4>
                    <h4> Seller : {key?.sellerUserName} </h4> <br/>
                 </div> 
                })}
            </ul> 
    </>}
    </>
}