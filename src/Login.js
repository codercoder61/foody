import React , {useState,useEffect} from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}
  useEffect(()=>{
    if(Cookies.get('stayLogged')){
        if(!isString(JSON.parse(Cookies.get('stayLogged')))){
        const arrayFromCookie = JSON.parse(Cookies.get('stayLogged'))
       if(Array.isArray(arrayFromCookie)){
        //arrayFromCookie[0],arrayFromCookie[1])
        switch (arrayFromCookie[0]) {
          case 0:
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', arrayFromCookie[1]);
          navigate(`/resdash/${arrayFromCookie[1]}`);
          break;
        case 1:
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', arrayFromCookie[1]);
          navigate(`/cusdash/${arrayFromCookie[1]}`);
          break;
        case 2:
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', arrayFromCookie[1]);
          navigate(`/courrierdash/${arrayFromCookie[1]}`);
          break;
        default:
          alert("Something went wrong!");
            break;
        } 
       }
        }else{
          localStorage.setItem('auth', JSON.stringify(true));
          navigate(`/admin`);
       }
    }
  },[])
    localStorage.setItem('auth', JSON.stringify(false));
    localStorage.removeItem('authId')
    localStorage.removeItem('authReset')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState("");
     const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
      const [isChecked, setIsChecked] = useState(false);
const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
    //"Checked:", event.target.checked);
    if(!event.target.checked){
      Cookies.get('stayLogged') && Cookies.remove('stayLogged');
    }
  };
    const [hovered, setHovered] = useState(false);
    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setError(true);
        } else {
            setError(false);
        }
    }
    
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
    e.preventDefault();
    if(email && password){
    const data = { email, password };

    try {
      const response = await fetch("https://soc-net.info/foody/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      //result); // { success: true, message: "..." }
      if(result.no_approved){
        alert("You're not approved")
      }
          else 
              if(!result.success && !result.blocked){
        alert('We didn’t find an account with those login credentials')
      }else{
        if(!result.blocked){
        if(result.type===0){
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', result.id);
          if(isChecked)
            Cookies.set('stayLogged', JSON.stringify([result.type,result.id]), { expires: 7 }); // 
          else{
            Cookies.get('stayLogged') && Cookies.remove('stayLogged');
          }
          
          navigate(`/resdash/${result.id}`);
        }else if(result.type===1){
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', result.id);
          if(isChecked)
          Cookies.set('stayLogged', JSON.stringify([result.type,result.id]), { expires: 7 }); 
        else{
            Cookies.get('stayLogged') && Cookies.remove('stayLogged');
          }
          navigate(`/cusdash/${result.id}`);
        }else if(result.type===2){
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('authId', result.id);
          if(isChecked)
          Cookies.set('stayLogged', JSON.stringify([result.type,result.id]), { expires: 7 }); else{
            Cookies.get('stayLogged') && Cookies.remove('stayLogged');
          }
          navigate(`/courrierdash/${result.id}`);
        }else{
          if(result.type==3 && result.id=='admin'){
          localStorage.setItem('auth', JSON.stringify(true));
          if(isChecked)
            Cookies.set('stayLogged', 'admin', { expires: 7 }); 
          else{
            Cookies.get('stayLogged') && Cookies.remove('stayLogged');
          }
          
              navigate(`/admin`);
        }else{
          alert('We didn’t find an account with those login credentials')
        }
      }
      }else{
        alert('Your account is blocked!')
      }
    }
    
      
    } catch (error) {
      console.error("Error:", error);
    }
    }else{
      alert('Fill all fields!')
    }
  };
  return (
    <div id='main'>
      <header>
        <img width='150' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
        <Link to='/signup'><span><i className="fa-solid fa-right-to-bracket"></i> Sign up</span></Link>
      </header>
      <main>
        <div>
            <img width='100' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=128,h=128,f=auto,dpr=1,fit=contain/f1646061270754x888289544466858600/Component%203%20%282%29%20%281%29.png" alt="logo"/>
            <p>Log in to your account</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br/>
                <input value={email} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{border:error?'1px solid red':hovered?'1px solid #fb9300':'1px solid gainsboro'}} onChange={handleEmailChange} placeholder='Type here...' type="email" /><br/><br/><br/>
                <label>Password</label><br/>
                <input value={password} onChange={handlePasswordChange} placeholder='Type here...' type="password" /><br/>
                <Link to="/forgot"><div className='forgot'><span>Forgot my password</span></div></Link><br/>
                <input checked={isChecked} onChange={handleCheckBoxChange} id='remember' type="checkbox" />
                <label htmlFor='remember'>Remember me</label>
                <div className='forgot'><input id='login' style={{backgroundColor:(password && !error)?'#fb9300':'rgba(251, 147, 0,0.2)',color:(password && !error)?'#fff':'#fff'}} type="submit" value='Log in' /></div><br/>
                <Link to='/signup'><div className='up'><p>Don't have an account yet? <span>Sign up</span></p></div><br/></Link>
            </form>
        </div>
      </main>
    </div>
  )
}

export default Login
