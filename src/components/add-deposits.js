import axios from "axios";
import { useState , useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../login-context/login-provider";

export const AddDeposists = () => {

    const navigate = useNavigate();
    
  const {userLogin , LogOut} = useLogin()

  useEffect(() => {          
      callAboutPage();

      if(!userLogin)
      LogOut()
  
  },[])

  const [total ,setTotal] = useState(0)

    function playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0];
        audioEl.play();
      }

      const [ user, setUser] = useState({ username : "" , productName : "" , productPrice: 0 , productDescription : "" ,productQuantity : 0 });

      const [ deposits , setDeposit ] = useState({

        _id : user?._id , 
        products : [],
        deposits : {
            fivecents: 0,
            tencents:  0,
            twentycents : 0,
            fiftycents : 0,
            hundredcents : 0
        } 
      });
            
        useEffect(()=>{

            getUserDeposists(deposits._id);

        } , [deposits])


      async function depositHandler(centtype){

        if(deposits.deposits)
        deposits.deposits[centtype] += 1;

          const response = await axios.patch(`/auth/deposists/${user?._id}` , {
               deposits
          });

          if(response.data.user)
          setDeposit(response.data.user)
        
        //   setDeposit(response.data)
      }

      const totalDepositCalculator = () => {

            const totalAmount = deposits.deposits.fivecents * 5 + deposits.deposits.tencents * 10 + deposits.deposits.twentycents * 20 + deposits.deposits.fiftycents * 50 + deposits.deposits.hundredcents * 100;

        setTotal(totalAmount)

        localStorage.setItem('totalAmount' , JSON.stringify( {totalAmount : deposits.deposits.fivecents * 5 + deposits.deposits.tencents * 10 + deposits.deposits.twentycents * 20 + deposits.deposits.fiftycents * 50 + deposits.deposits.hundredcents * 100}))

      }

      const getUserDeposists = async (id) => {

        const userDeposists = await axios.get(`/auth/getdeposists/${id}`)

        setDeposit(userDeposists.data.user)

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

            if(data)
            getUserDeposists(data?._id);
          
            setUser(data);
    
        } catch (error) {
            console.log(error); 
            navigate("/signin");
        }
    
        }

        
        useEffect(() => {

          console.log('useEffect Called')
                  
          totalDepositCalculator();
            
        },[])
        
    return <>

    <h1> Vending Machine</h1>
    <div className="vedingPackage">

        <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>

        <div className="vendingCoins" onClick={() => {
            playAudio();
            depositHandler('fivecents');
            totalDepositCalculator();
            }}> 

        <h3>5 cents</h3>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">

        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>  
        </div>

        <div className="vendingCoins" onClick={() => {
            playAudio();
            depositHandler('tencents');
            totalDepositCalculator();
            }}>
        <h3>10 cents</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
        </div>

        <div className="vendingCoins" onClick={() => {
            playAudio();
            depositHandler('twentycents');
            totalDepositCalculator();
            }}>
        <h3>20 cents</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
        </div>

        <div className="vendingCoins" onClick={() => {
            playAudio();
            depositHandler('fiftycents');
            totalDepositCalculator();
            }}>
        <h3>50 cents</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
 
       </div>         
       
       <div className="vendingCoins" onClick={() => {
            playAudio();
            depositHandler('hundredcents');
            totalDepositCalculator();
            }}>
        <h3>100 cents</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
        </div>
        </div>
          <h2> Your balance : 
          </h2>
          <h3> 5 cents : {deposits?.deposits?.fivecents}</h3>
          
          <h3> 10 cents : {deposits?.deposits?.tencents}</h3>
          
          <h3> 20 cents : {deposits?.deposits?.twentycents}</h3>
          
          <h3> 50 cents : {deposits?.deposits?.fiftycents}</h3>
          
          <h3> 100 cents : {deposits?.deposits?.hundredcents}</h3>

          <h2> Total Amount : { total || (deposits.deposits.fivecents * 5)+ (deposits.deposits.tencents * 10) + (deposits.deposits.twentycents * 20) + (deposits.deposits.fiftycents * 50) + (deposits.deposits.hundredcents * 100)}</h2>
       
     </>
}