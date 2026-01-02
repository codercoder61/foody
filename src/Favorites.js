import './RestInfo.css'
import { useState ,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Favorites() {
      const navigate = useNavigate();

  useEffect(()=>{
            if(!localStorage.getItem('authId')){
              navigate('/')
            }
          },[])
    const [toggle,setToggle] = useState(false)
    const [toggle2,setToggle2] = useState(false)
    const [toggle3,setToggle3] = useState(false)
    const [contact,setContact] = useState(false)
    const [messageForm,setMessageForm] = useState("")
    const [success34,setSuccess34] = useState(false)
    const message34 = useRef(null)
    
const [name,setName] = useState("")


const [surname,setSurname] = useState("")

const [phone,setPhone] = useState("")

const [locations,setLocations] = useState([])
    const [meals,setMeals] = useState(false)
    const message = useRef(null)
    const message2 = useRef(null)
    const [nameSurname,setNameSurname] = useState(``)
    const message3 = useRef(null)
    const [res,setRes] = useState(false)
    const [cus,setCus] = useState(false)
    const [categories,setCategories] = useState([])
    const [restaurants,setRestaurants] = useState(false)
const [flagNotification,setFlagNotification] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const handleNameSurnameChange = (e)=>{
        setNameSurname(e.target.value)
      }
      const handleEmailChange = (e)=>{
        setEmailForm(e.target.value)
      }
      const [emailForm,setEmailForm] = useState("")
      const [overlay,setOverlay] = useState(false)
    const handleMessageChangeForm = (e)=>{
        setMessageForm(e.target.value)
      }
      const id = localStorage.getItem('authId');
    const profile = useRef(null)
    const notif = useRef(null)
    const cart = useRef(null)
    const [success,setSuccess] = useState(false)
    const [success2,setSuccess2] = useState(false)
    const [success3,setSuccess3] = useState(false)
    const profileOpener = useRef(null)
    const notificationOpener = useRef(null)
    const cartOpener = useRef(null)
    const [cartBuy,setCartBuy]=useState(JSON.parse(localStorage.getItem("cart")) || [])
    const [total,setTotal] =useState(0)
    const [numberOfItems,setNumberOfItems] =useState(null)
    const [src2,setSrc2] = useState("https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=192,h=192,f=auto,dpr=1,fit=contain/f1644159799800x841425035363490000/icons8-male-user-100%20%281%29.png")
    const fetchData2= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getCategories.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        //(result)
        setCategories(result.cate)
    } catch (error) {
        console.error("Error:", error);
      }
    }
    

    const removeFromCart = (index) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove the item completely (by mealIndex)
  cart = cart.filter(meal => meal.mealIndex !== index);

  localStorage.setItem("cart", JSON.stringify(cart));
  setCartBuy(cart);
  const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
        setTotal(totala)
        let number = 0
        cart.map((elm)=>{
          number+=elm.quantity
        })
        setNumberOfItems(number)
};
   const handleQuantityChange = (e, index) => {
  const rawValue = e.target.value;

  // allow empty input while typing
  if (rawValue === "") {
    updateQuantity(index, "");
    return;
  }

  const value = parseInt(rawValue, 10);

  if (isNaN(value) || value < 0) return;

  updateQuantity(index, value);
};

const updateQuantity = (index, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex(meal => meal.mealIndex === index);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  setCartBuy(cart);

  const total = cart.reduce(
    (acc, item) => acc + item.mealPrice * (item.quantity || 0),
    0
  );
  setTotal(total);

  const number = cart.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  setNumberOfItems(number);
};

 const fetchNotifications= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getNotifications.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:localStorage.getItem('userId')
            }
          ),
        });

        const result = await response.json();
        //result); // { success: true, message: "..." }
        setNotifications(result.notifications)
        result.notifications.map((elm)=>{
          if(elm.flag==1){
            setFlagNotification(true)
          }
        })
      } catch (error) {
        console.error("Error:", error);
      }
    }
useEffect(()=>{
  fetchNotifications()
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
  setTotal(totala)
  let number = 0
  cart.map((elm)=>{
      number+=elm.quantity
   })
  setNumberOfItems(number)
},[])
  
    const fetchData= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getcus.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:localStorage.getItem('userId'),
              restoId:id
            }
          ),
        });
        const result = await response.json();
        //(result)
         setName(result.userData.name)
        setSurname(result.userData.surname)
        setEmailForm(result.userData.email)
        setPhone(result.userData.phone)
setNameSurname(`${result.userData.name} ${result.userData.surname}`);
        setLocations(result.locations)
        if(result.userData.photo!==null)
          setSrc2(`https://soc-net.info/foody/${result.userData.photo}`)
        setCus(result)
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const fetchFavorites= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getFavorites.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:localStorage.getItem('userId')
            }
          ),
        });
        const result = await response.json();
        setRestaurants(result.favorites)
       
      } catch (error) {
        console.error("Error:", error);
      }
    }

   
    useEffect(()=>{
        fetchFavorites()
        fetchData()
        fetchData2()
    },[])
    const flag= async(id)=>{
      try {
        const response = await fetch("https://soc-net.info/foody/flag.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:id
            }
          ),
        });

        const result = await response.text();
       
        fetchNotifications()
        setFlagNotification(false)
        
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const clear= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/clear.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:id
            }
          ),
        });

        const result = await response.json();
        //result)
        fetchNotifications()
        setFlagNotification(false)
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profile && profile.current && !profile.current.contains(e.target) && !profileOpener.current.contains(e.target)) {
            setToggle(false)
            }
            if (notif && notif.current && !notif.current.contains(e.target) && !notificationOpener.current.contains(e.target)) {
            setToggle2(false)
            }
            if (cart && cart.current && !cart.current.contains(e.target) && !cartOpener.current.contains(e.target)) {
            setToggle3(false)
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
        }, [profile]);
const addMessage =async ()=>{
        const payload = {
          name:nameSurname,
          emailFrom:emailForm,
          message:messageForm
        }

          try {
        const response = await fetch("https://soc-net.info/foody/sendMessage.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

        const result = await response.text();
        //result)
        if (Number(result) === 1) {
          document.body.style.overflow='unset';
          setMessageForm("");
          setOverlay(false);
          setContact(false)
        setSuccess34(true);
        message34.current && message34.current.classList.remove("message");
        message34.current &&  void message34.current.offsetWidth;
        message34.current && message34.current.classList.add("message");
        
      }
    } catch (error) {
        console.error("Error:", error);
      }
      }

      
        
  return (
    <div id='main'>
      {success34 && <p ref={message34} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Email sent!</p>}
      {overlay && <div className='overlay'></div>}
       {contact && <div className='formcontact'>
            <h1>Contact form</h1>
            <i onClick={()=>{document.body.style.overflow='unset';setMessageForm("");setOverlay(false);setContact(false)}} style={{cursor:'pointer',position:'absolute',right:'40px',top:'50px'}} className="fa-solid fa-xmark"></i>
            <h4>Name&Surname</h4>
            <input value={nameSurname} onChange={handleNameSurnameChange} type='text' placeholder='Type here...' style={{width:'100%'}}/>
            <h4>Email</h4>
             <input value={emailForm} onChange={handleEmailChange} type='text' placeholder='Type here...' style={{width:'100%'}}/>
            <h4>Message</h4>
            <textarea placeholder='Type here...' style={{width:'100%',height:'100px',marginBottom:'20px'}} value={messageForm} onChange={handleMessageChangeForm}></textarea>
            <button onClick={addMessage} style={{cursor:'pointer',position:'absolute',right:'40px',bottom:'10px',backgroundColor:'#fb9300',border:'none',outline:'none',color:'white',padding:'10px 20px',borderRadius:'10px'}}>Submit</button>    
        </div>}

      {success3 && <p ref={message3} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Meal added to cart!</p>}
        <header id="header">
            <Link to={`/cusdash/${localStorage.getItem('userId')}`}><img width='120' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/></Link>
            <div className='pl'>
            <div ref={cartOpener} onClick={()=>{setToggle3(!toggle3);setToggle(false);setToggle2(false)}} style={{position:'relative'}}>
                <i  className="fa-solid fa-cart-shopping"></i>
                {numberOfItems>0 && <span style={{cursor:'pointer',left:'20px',backgroundColor:'#fb9300',color:'white',boxShadow:'none',textAlign:'center',fontSize:'0.7em',position:'absolute',top:'10px',padding:'5px',borderRadius:'50%',height:'20px',width:'20px'}}>{numberOfItems}</span>}
            </div>
                  <div ref={notificationOpener} onClick={()=>
              {
                setToggle2(!toggle2);
                if(toggle2)
                  flag(id);
                setToggle(false);
                setToggle3(false);
              }} style={{position:'relative'}}>
                <i className="fa-solid fa-bell"></i>
                {flagNotification && <div style={{cursor:'pointer',position:'absolute',bottom:'2px',left:'20px',borderRadius:'50%',width:'12px',height:'12px',backgroundColor:'#f9920b'}}></div>}
            </div>
                <div ref={profileOpener} onClick={()=>{setToggle(!toggle);setToggle2(false);setToggle3(false)}} style={{display:'flex',alignItems:'center',cursor:'pointer'}}><img width='40' height='40' style={{objectFit:'cover',borderRadius:'50%'}} src={src2==null?'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=48,h=48,f=auto,dpr=1,fit=contain/f1644159799800x841425035363490000/icons8-male-user-100%20%281%29.png':src2} alt='person'/>
                <i className="fa-solid fa-caret-down"></i></div>
            </div>
            {toggle && <div ref={profile} id='perso' style={{padding:'10px',backgroundColor:'white',boxShadow:'0 0 5px gray',position:'absolute',right:'50px',top:'65px'}}>
                <Link to='/order'><span>Order History</span></Link>
                <span>Favorite Restaurants</span>
                <Link to={`/profile/${localStorage.getItem('userId')}`}><span onClick={()=>{setToggle(false);}}>My Profile</span></Link>
                <span onClick={()=>{document.body.style.overflow='hidden';setContact(true);setOverlay(true)}}>Contact From</span>
                <Link to='/'><span onClick={()=>{
                                  if(Cookies.get('stayLogged')){
                                      Cookies.remove('stayLogged');
                                  }
                                }} style={{color:'red'}}>Sign Out</span></Link>
            </div>}
              {toggle2 && <div ref={notif} style={{width:'300px',overflowY:'auto',maxHeight:'400px',backgroundColor:'white',boxShadow:'0 0 5px gray',position:'absolute',right:'50px',top:'65px'}}>
              {(notifications && notifications.length>0) && <div style={{display:'flex',justifyContent:'flex-end'}}><span onClick={clear} style={{padding:'0',cursor:'pointer',margin:'10px',fontSize:'0.9em',backgroundColor:'#fff',color:'#f9920b',boxShadow:'none'}}>Clear</span></div>}
            {(notifications && notifications.length>0) ? notifications.map((elm,index)=>(
              <div key={index} style={{display:'flex',backgroundColor:elm.flag==1?'#f2e0c8':'#fff',alignItems:'center'}}>
                <i style={{backgroundColor:'#f9920b',color:'white',padding:'10px',borderRadius:'15px'}}className="fa-solid fa-bell"></i>
                <span key={index} style={{padding:'0',margin:'10px',fontSize:'0.9em',backgroundColor:elm.flag===1?'#f2e0c8':'#fff',color:'black',boxShadow:'none'}}>{elm.notification_text}</span>
              </div>
            )): <div style={{display:'flex',justifyContent:'center'}}><span style={{padding:'0',margin:'10px',fontSize:'0.9em',backgroundColor:'#fff',color:'black',boxShadow:'none'}}>You have no new notifications</span></div>}
            </div>}
            {toggle3 && <div ref={cart} id='ftg'>
                <div style={{position:'relative'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h2>Order Menu</h2>
                <i onClick={()=>setToggle3(false)} style={{position:'absolute',right:'0px',top:'10px'}} className="fa-solid fa-xmark"></i>
                
              </div>
             {
  cartBuy?.length > 0 ? (
    <>
      {cartBuy.map((elm, index) => (
        <div
          key={index}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
            <img
              width="50"
              height="50"
              style={{ objectFit: 'cover',marginRight: '5px'}}
              src={`https://soc-net.info/foody/${elm.mealPhoto}`}
              alt=""
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p>{elm.mealName}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '0px',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    color: '#fb9300',
                    margin: '0',
                  }}
                >
                  x
                </span>
                <input
style={{ border: 'none', outline: 'none', height: '20px', width: '60px', }}
                type="number"
                min="0"
                onChange={(e) => handleQuantityChange(e, elm.mealIndex)}
                value={elm.quantity ?? ""}
              />
              </div>
            </div>
          </div>
          <div>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  padding: '0px',
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  color: '#fb9300',
                  margin: '0',
                }}
              >
                $
              </span>
              <span
                style={{
                  fontSize: '1.6em',
                  padding: '0px',
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  color: '#000',
                }}
              >
                {elm.mealPrice*elm.quantity}
              </span>
            </p>
            <span onClick={() => removeFromCart(elm.mealIndex)} className="remove">
              Remove
            </span>
          </div>
        </div>
      ))}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left', alignSelf: 'flex-start' }}>
          <p>Delivery fee:</p>
          <p>$10</p>
        </div>
       <Link to='/checkout'><span
          style={{
            fontSize: '1.2em',
            backgroundColor: '#fb9300',
            color: '#fff',
            boxShadow:'none',
            padding:'10px',
            marginRight: '0',
            cursor:'pointer'
          }}
        >
          Checkout ${total}
        </span></Link>
      </div>
    </>
  ) : (
    <>
      <img
        width="200"
        alt="empty-cart"
        src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"
      />
      <p style={{ fontSize: '2em' }}>Your Cart is Empty</p>
      <p>Looks like you haven't added</p>
      <p>anything to your cart yet</p>
    </>
  )
}



                </div>   
            </div>}
        </header>
       
        <div style={{marginTop:'70px',padding:'40px'}}>
                <h1 style={{fontSize:'1.3em'}}>Your Favorites 🤩</h1>
                <div id="restaurants">
              {restaurants && restaurants.map((elm,index)=>(
                <div key={index} style={{margin: '20px',width:'400px',aIndex:'10',position:'relative'}}>
                  <img width='100' height='100' style={{left:'50%',transform:'translate(-50%,-40%)',position:'absolute',objectFit:'cover',borderRadius:'50%'}} src={elm.logo!==null?`https://soc-net.info/foody/${elm.logo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png'}/>
                <div  style={{margin:'20px',padding:'50px',display:'flex',flexDirection:'column',backgroundColor:'white',boxShadow:'0 0 2px #ddd',borderRadius:'15px'}}>
                  
                  <span style={{fontSize:'1.6em',fontWeight:'500'}}>{elm.restaurantName}</span>
                  <span style={{fontSize:'0.9em'}}>Delivery Fee:</span>
                  <div  style={{display:'flex',marginTop:'10px',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'2.3em',fontWeight:'500'}}>$10</span>
                  <Link to={`/restoinfo/${elm.id}`}><i style={{fontSize:'1.5em',color:'white',backgroundColor:'#fb9300',padding:'10px',borderRadius:'60%'}} className="check fa-solid fa-caret-right"></i></Link>
                  </div>
                </div>
                </div>
              ))}
              
            </div>
        </div>
    </div>
  );
}

export default Favorites;
             
             
