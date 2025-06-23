import React, {useState,useEffect} from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
function Forgot() {
   
    const [email,setEmail] = useState("")
    const [error,setError] = useState(false)
    const {id,type} = useParams()
const navigate = useNavigate();
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(false)
useEffect(()=>{
          if(localStorage.getItem('authId')){
            navigate('/')
          }
        },[])
         useEffect(()=>{
      if(!localStorage.getItem('authReset')){
        navigate('/')
      }
    },[])
    const [password,setPassowrd] = useState("")
    const [confPassword,setConfPassword] = useState("")
    const handlePasswordChange = (e)=>{
        setPassowrd(e.target.value)
        if(e.target.value!==""){
            setError1(false)
        }
    }
    const handleConfPassChange = (e)=>{
        setConfPassword(e.target.value)
        if(e.target.value!==""){
            setError2(false)
        }
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setError(false);
        } else {
            setError(true);
        }
        if(e.target.value!==""){
            setError3(false)
        }
    }
    //
    const handleClick = async ()=>{
      
        if(password===""){
            setError1(true)
        }
        if(confPassword===""){
            setError2(true)
        }
        if(email===""){
            setError3(true)
        }
        if(password!="" && confPassword!="" && email!=""){
          if(password==confPassword){
            try {
        const response = await fetch("https://soc-net.info/foody/resetpassword.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email:email,
              password:password,
              id:id,
              type:type
            }
          ),
        });
        
        const result = await response.json();
        //result)
        if(result.status==1){
          //type,id)
          switch (Number(type)) {
            case 0:
                localStorage.setItem('authId',id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/resdash/${id}`);
                break;
              case 1:
                localStorage.setItem('authId',id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/cusdash/${id}`);
                break;
              case 2:
                localStorage.setItem('authId',id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/courrierdash/${id}`);
                break;
              default:
                //"Just another day");
            }
          }
        
        
      } catch (error) {
        console.error("Error:", error);
      }
          }else{
            alert("Password don't match!")
          }
          
        }
    }
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
   
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'60vh'}}>
      <img width='200' style={{marginBottom:'50px'}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=256,h=79,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
      <div style={{width:'40%',backgroundColor:'white',padding:'20px',border:'1px solid #ddd'}}>
        <p style={{marginBottom:'20px'}}>This page lets you reset your password.</p>
        <input
  value={email}
  onChange={handleEmailChange}
  style={{
    border: error3?'1px solid red':email && error ? '1px solid #fb9300' : '1px solid rgba(251, 147, 0, 0.2)',
    marginBottom: '20px'
  }}
  type='email'
  placeholder='Your email address'
/>
<input
  value={password}
  onChange={handlePasswordChange}
  style={{
    border: error1?'1px solid red':password && error ? '1px solid #fb9300' : '1px solid rgba(251, 147, 0, 0.2)',
    marginBottom: '20px'
  }}
  type='password'
  placeholder='New Passowrd'
/>
<input
  value={confPassword}
  onChange={handleConfPassChange}
  style={{
    border: error2?'1px solid red':confPassword && error ? '1px solid #fb9300' : '1px solid rgba(251, 147, 0, 0.2)',
    marginBottom: '20px'
  }}
  type='password'
  placeholder='Re-type password'
/>
        <input onClick={handleClick} style={{cursor:'pointer',border:'none',color:'#fff',width:'100%',borderRadius:'5px',padding:'15px 0',backgroundColor:confPassword && password && email && error?'#fb9300':'rgba(251, 147, 0,0.2)',marginBottom:'20px'}} type="submit" value="CONFIRM"/><br/>
      </div>
    </div>
  )
}

export default Forgot
