import React ,{useState}from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const handleClick1 = () => {
        // Navigate to /about
        navigate('/customersignup');
    };
    const handleClick2 = () => {
        // Navigate to /about
        navigate('/restaurantownersignup');
    };
    const handleClick3 = () => {
        // Navigate to /about
        navigate('/couriersignup');
    };
    const [customer,setCustomer] = useState(false)
    const [restaurantOwner,setRestaurantOwner] = useState(false)
    const [courier,setCourier] = useState(false)

    const function1 = ()=>{
        setCustomer(true)
        setRestaurantOwner(false)
        setCourier(false)
    }
    const function2 = ()=>{
        setCustomer(false)
        setRestaurantOwner(true)
        setCourier(false)
    }
    const function3 = ()=>{
        setCustomer(false)
        setRestaurantOwner(false)
        setCourier(true)
    }
    const doNothing = () => {};

  return (
    <div id='main'>
      <header>
        <img width='150' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
        <Link to='/'><span><i className="fa-solid fa-right-to-bracket"></i> Login</span></Link>
      </header>
      <main id='mainn'>
        <div id='type'>
            <div style={{textAlign:'center'}}>
            <h1>Step 1:</h1>
            <p style={{fontSize: '1.2em',fontWeight: 'unset',marginBottom:'50px'}}>Choose your type</p></div>
            <p onClick={function1} style={{cursor:'pointer',backgroundColor:customer?'#ffecd1':'#fff',borderRadius:'7px',textAlign:'center',width:'250px',padding:'25px 50px',margin:'15px',border:'1px solid black',fontSize: '1.2em',fontWeight: 'unset'}}>I'm a customer</p>
            <p onClick={function3} style={{cursor:'pointer',backgroundColor:courier?'#ffecd1':'#fff',borderRadius:'7px',textAlign:'center',width:'250px',padding:'25px 50px',margin:'15px',border:'1px solid black',fontSize: '1.2em',fontWeight: 'unset'}}>I'm a courier</p>
            <p onClick={function2} style={{cursor:'pointer',backgroundColor:restaurantOwner?'#ffecd1':'#fff',borderRadius:'7px',textAlign:'center',width:'250px',padding:'25px 50px',margin:'15px',border:'1px solid black',fontSize: '1.2em',fontWeight: 'unset'}}>I'm a restaurant owner</p>
            <Link to='/'><div className='up'><p>Do you already have an account? <span>Login</span></p></div><br/></Link>
            <div style={{textAlign: 'right'}}><input onClick={customer?handleClick1:restaurantOwner?handleClick2:courier?handleClick3:doNothing} id='login' style={{backgroundColor:(customer || restaurantOwner || courier )?'rgba(251, 147, 0,1)':'rgba(251, 147, 0,0.2)'}} type="submit" value='NEXT' /></div><br/>
        </div>
      </main>
      <div style={{textAlign:'center'}}>
        <img width='50' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=128,h=128,f=auto,dpr=1,fit=contain/f1646061270754x888289544466858600/Component%203%20%282%29%20%281%29.png" alt="logo"/>
      </div>
    </div>
  )
}

export default SignUp
