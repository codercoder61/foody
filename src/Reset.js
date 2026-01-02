import React, {useState,useEffect} from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
function Forgot() {
   
    const [error,setError] = useState(false)
    const {token} = useParams()
const navigate = useNavigate();
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(false)

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
    
    //
    const handleClick = async ()=>{
      
        if(password===""){
            setError1(true)
        }
        if(confPassword===""){
            setError2(true)
        }
        
        if(password!="" && confPassword!=""){
          if(password==confPassword){
            try {
        const response = await fetch("https://soc-net.info/foody/resetpassword.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              password:password,
              token:token
            }
          ),
        });
        
        const result = await response.json();
        //result)
        if(result.error){
           alert(result.error)
        }
        if(result.status==1){
          //type,id)
          switch (Number(result.type)) {
            case 0:
                localStorage.setItem('authId',result.id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/resdash/${result.id}`);
                break;
              case 1:
                localStorage.setItem('authId',result.id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/cusdash/${result.id}`);
                break;
              case 2:
                localStorage.setItem('authId',result.id)
                localStorage.setItem('auth',JSON.stringify(true))
                navigate(`/courrierdash/${result.id}`);
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
    
    
   
  return (
    <div id="reset" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh'}}>
      <img width='200' style={{marginBottom:'50px'}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=256,h=79,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
      <div style={{width:'40%',backgroundColor:'white',padding:'20px',border:'1px solid #ddd'}}>
        <p style={{marginBottom:'20px'}}>This page lets you reset your password.</p>
        
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
        <input onClick={handleClick} style={{cursor:'pointer',border:'none',color:'#fff',width:'100%',borderRadius:'5px',padding:'15px 0',backgroundColor:confPassword && password?'#fb9300':'rgba(251, 147, 0,0.2)',marginBottom:'20px'}} type="submit" value="CONFIRM"/><br/>
      </div>
    </div>
  )
}

export default Forgot
