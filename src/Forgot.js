import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Forgot() {
  const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [error,setError] = useState(false)
    const [error3,setError3] = useState(false)
    const [error2,setError2] = useState(false)
    const [code,setcode] = useState(false)
    const [codee,setcodee] = useState("")
    const [code2,setcode2] = useState("")
    const [type,setType] = useState(null)
    const [id,setId] = useState(null)
    const handleCodeChange = (e)=>{
      if(e.target.value==="" || codee!=code2)
        setError2(true)
      else{
        setError2(false)
      }
      setcodee(e.target.value)
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setError(false);
        } else {
            setError(true);
        }
        if(email!==""){
            setError3(false)
        }
    }
    //
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    function generateSixNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

    const handleClick = async ()=>{
        if(email===""){
            setError3(true)
        }
        if(email!==""){
             try {
        const response = await fetch("https://soc-net.info/foody/checkemail.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email:email,
            }
          ),
        })
        alert("if an email exists, a message is sent to it")
        
        
      } catch (error) {
        console.error("Error:", error);
      }
        }else{
          alert('Type your email!')
        }
    }

    const handleClick2 = async ()=>{
      if(code2==codee){
        localStorage.setItem('authReset',JSON.stringify(true))
        navigate(`/reset/${id}/${type}`)
      }else{
        alert('Something went wrong!')
      }
    }
   
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'60vh'}}>
      <img width='200' style={{marginBottom:'50px'}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=256,h=79,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
      <div style={{backgroundColor:'white',padding:'20px',border:'1px solid #ddd'}}>
        {!code && <><p style={{marginBottom:'20px'}}>We will send a link to you via mail</p>
        <input
  value={email}
  onChange={handleEmailChange}
  style={{
    border:error3?'1px solid red': email && error ? '1px solid #fb9300' : '1px solid rgba(251, 147, 0, 0.2)',
    marginBottom: '20px'
  }}
  type='email'
  placeholder='Your email address'
/>
        <input style={{border:'none',outline:'none',cursor:'pointer',color:'#fff',width:'100%',borderRadius:'5px',padding:'15px 0',backgroundColor:email && error?'#fb9300':'rgba(251, 147, 0,0.2)',marginBottom:'20px'}} onClick={handleClick} type="submit" value="SEND"/><br/></>}
        {code && <><p style={{marginBottom:'20px'}}>Type code sent to your email</p>
        <input
  value={codee}
  onChange={handleCodeChange}
  style={{
    border:error3?'1px solid red': codee && error2 ? '1px solid #fb9300' : '1px solid rgba(251, 147, 0, 0.2)',
    marginBottom: '20px'
  }}
  type='text'
  placeholder='Type here..'
/>
        <input style={{cursor:'pointer',border:'none',color:'#fff',width:'100%',borderRadius:'5px',padding:'15px 0',backgroundColor:codee && error2?'#fb9300':'rgba(251, 147, 0,0.2)',marginBottom:'20px'}} onClick={handleClick2} type="submit" value="SEND"/><br/></>}
        <div style={{textAlign:'center'}}><Link style={{cursor:'pointer',color:'#00aec8',fontSize:'1.2em'}} to="/">Go back home <i className="fa-solid fa-arrow-right"></i></Link></div>
      </div>
    </div>
  )
}

export default Forgot
