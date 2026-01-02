import React , {useState} from 'react'
import './RestaurantOwnerSignUp.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CustomerSignUp() {
    const navigate = useNavigate();

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [surname,setSurName] = useState('')
    const [passconfirm,setPassConfirm] = useState('')
    const validatePasswords = ()=>{
        if(passconfirm!==password){
            return true
        }
        else{
            return false
        }
    }
    const [password,setPassword] = useState('')
    const [error, setError] = useState("");
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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

    const handleNameChange = (e) =>{
        setName(e.target.value)
    }

    const handleSurNameChange = (e) =>{
        setSurName(e.target.value)
    }

    const handlePassConfirmChange = (e) =>{
        setPassConfirm(e.target.value)
    }
    const doNothing = () => {};
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name && surname && email && password && passconfirm){
            if(validatePasswords()){
                alert('The two passwords do not match!')
            }else{
                try {
                localStorage.getItem('restaurantOwnerEmail') && localStorage.removeItem('restaurantOwnerEmail');
                localStorage.setItem('restaurantOwnerEmail', email);
                const res = await fetch('https://soc-net.info/foody/addRestaurantOwner.php', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            name:name,
                            surname:surname,
                            email:email,
                            password:password
                        }
                    )
                });

                const result = await res.json();
                //(result);
                localStorage.removeItem('id');
                localStorage.setItem('id',result.id)
                if(result.status===1){
                    localStorage.setItem('auth', JSON.stringify(true));
                    navigate("/addaddressres")
                }
                    if(result.status==="error"){
                    alert(result.message)
                }
                } catch (error) {
                console.error("Error sending data:", error);
                }
            }
            
        }else{
            alert('Fill al fields !')
        }
    };
  return (
    <div id='main'>
      <header>
        <img width='150' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
        <Link to='/'><span><i className="fa-solid fa-right-to-bracket"></i> Login</span></Link>
      </header>
      <main id='mainn'>
        <div>
            <div style={{textAlign:'center'}}>
            <h1>Step 2:</h1>
            <p style={{fontSize: '1.2em',fontWeight: 'unset',marginBottom:'50px'}}>Register to foody</p></div>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br/>
                <input value={name} onChange={handleNameChange} placeholder='Type here...' type="text" /><br/><br/><br/>

                <label>Surname</label><br/>
                <input value={surname}  onChange={handleSurNameChange} placeholder='Type here...' type="text" /><br/><br/><br/>

                <label>Email</label><br/>
                <input value={email} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{border:error?'1px solid red':hovered?'1px solid #fb9300':'1px solid gainsboro'}} onChange={handleEmailChange} placeholder='Type here...' type="email" /><br/><br/><br/>



                <label>Password</label><br/>
                <input value={password} onChange={handlePasswordChange} placeholder='Type here...' type="password" /><br/><br/><br/>

                <label>Password confirmation</label><br/>
                <input value={passconfirm} onChange={handlePassConfirmChange} placeholder='Type here...' type="password" /><br/><br/><br/>

                <div style={{textAlign:'left',color:'gray'}}><span>*By registering, you agree to the privacy policy and terms of use.</span></div><br/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{textAlign:'left'}}><span onClick={()=>{navigate('/signup')}} id='back'>Back</span></div>
                    <div className='forgot'><input id='login' onClick={(name && surname && !error && password && passconfirm)?validatePasswords:doNothing} style={{backgroundColor:(name && surname && password && !error && passconfirm)?'#fb9300':'rgba(251, 147, 0,0.2)',color:(name && surname &&password && !error && passconfirm)?'#fff':'#fff'}} type="submit" value='NEXT' /></div>
                </div>
                </form>
        </div>
      </main>
    </div>
  )
}

export default CustomerSignUp
