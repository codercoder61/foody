import './Comments.css'
import { useState ,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Comments() {
    const [toggle,setToggle] = useState(false)
    const [toggle2,setToggle2] = useState(false)
    const [toggle3,setToggle3] = useState(false)
    const [meals,setMeals] = useState(false)
    const navigate = useNavigate();
    const message = useRef(null)
    const message2 = useRef(null)
    const message3 = useRef(null)
    const message4 = useRef(null)
    const message34 = useRef(null)
    useEffect(()=>{
          if(!localStorage.getItem('authId')){
            navigate('/')
          }
        },[])
        const [success34,setSuccess34] = useState(false)
        const [contact,setContact] = useState(false)
    const [surname,setSurname] = useState("")
    const [locations,setLocations] = useState([])
    const [email,setEmail] = useState("")
      const [emailForm,setEmailForm] = useState(email)
    const [phone,setPhone] = useState("")
      const [nameSurname,setNameSurname] = useState('')
      const [messageForm,setMessageForm] = useState("")
    const [overlay,setOverlay] = useState(false)
    
    const [res,setRes] = useState(false)
    const [cus,setCus] = useState(false)
    const [categories,setCategories] = useState([])
    const { id } = useParams();
    const profile = useRef(null)
    const notif = useRef(null)
    const cart = useRef(null)
    const [flagNotification,setFlagNotification] = useState(false)
    const [notifications, setNotifications] = useState([]);
        const [name,setName] = useState("")
    
    const [success,setSuccess] = useState(false)
    const [success2,setSuccess2] = useState(false)
    const [success3,setSuccess3] = useState(false)
    const [success4,setSuccess4] = useState(false)
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
const [commentsOnMeals,setCommentsOnMeals] = useState(null)
const [comments,setComments] = useState(false)
const [numComments,setNumComments] = useState(false)
    const fetchComments = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getComments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id })
    });

    const data = await response.json();
    //data)
    setCommentsOnMeals(data.comments)
    setNumComments(data.comments.length)
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

useEffect(()=>{
  fetchComments()
},[])
    const addToCart = (index,id_resto) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        //cart)
      if(cart.length===0){
          localStorage.removeItem("allowedResto")
        }
    if(localStorage.getItem("allowedResto")==null){
          localStorage.setItem("allowedResto",id_resto)
          ////localStorage.getItem("allowedResto"),id_resto)
      if(cart.length===0){
        const existingItemIndex = cart.findIndex(meal => meal.mealId === index);

        if (existingItemIndex !== -1) {
            // Meal already in cart, increment quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // New meal, add to cart
            cart.push({
                mealIndex: index,
                mealName: meals[meals.findIndex(meal => meal.id === index)].name,
                mealPhoto: meals[meals.findIndex(meal => meal.id === index)].photo,
                quantity: 1,
                mealPrice: meals[meals.findIndex(meal => meal.id === index)].price,
                mealId: meals[meals.findIndex(meal => meal.id === index)].id,
                restaurantName:res.restaurantName,
                restaurantId:res.id,
            });
        }
        //(cart)
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartBuy(cart)
        setSuccess3(true);
        message3.current && message3.current.classList.remove("message");
        message3.current &&  void message3.current.offsetWidth;
        message3.current && message3.current.classList.add("message");
        let number = 0
        cart.map((elm)=>{
          number+=elm.quantity
        })
        setNumberOfItems(number)
        const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
        setTotal(totala)
        ////cart)
    }}else{
          if(localStorage.getItem('allowedResto')!=id_resto){
          ////localStorage.getItem("allowedResto"),id_resto)
            alert('You can order from only one shop at a time at most!')
          }else{
          ////localStorage.getItem("allowedResto"),id_resto)
            ////)

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItemIndex = cart.findIndex(meal => meal.mealId === index);
            if (existingItemIndex !== -1) {
              cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                mealIndex: index,
                mealName: meals[meals.findIndex(meal => meal.id === index)].name,
                mealPhoto: meals[meals.findIndex(meal => meal.id === index)].photo,
                quantity: 1,
                mealPrice: meals[meals.findIndex(meal => meal.id === index)].price,
                mealId: meals[meals.findIndex(meal => meal.id === index)].id,
                restaurantId:meals[meals.findIndex(meal => meal.id === index)].id_restaurantOwner,
                restaurantName:res.restaurantName
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartBuy(cart)
        setSuccess3(true);
        message3.current && message3.current.classList.remove("message");
        message3.current &&  void message3.current.offsetWidth;
        message3.current && message3.current.classList.add("message");
        let number = 0
        cart.map((elm)=>{
          number+=elm.quantity
        })
        setNumberOfItems(number)
        const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
        setTotal(totala)
          }
        } 
  
  };

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
  const value = parseInt(e.target.value);
  const newQuantity = isNaN(value) || value < 1 ? 1 : value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex(meal => meal.mealIndex === index);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity = newQuantity; // ⬅️ directly set it
  }

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

    const addFavorite = async ()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/addFavorite.php", {
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
        fetchData()
        setSuccess(true);
        message.current && message.current.classList.remove("message");
        message.current &&  void message.current.offsetWidth;
        message.current && message.current.classList.add("message");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const deleteFavorite = async ()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/deleteFavorite.php", {
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
        fetchData()
        setSuccess2(true);
        message2.current && message2.current.classList.remove("message");
        message2.current &&  void message2.current.offsetWidth;
        message2.current && message2.current.classList.add("message");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const fetchData= async()=>{
        //(localStorage.getItem('userId'))
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
         setName(result.userData.name)
        setSurname(result.userData.surname)
        setNameSurname(result.userData.name)
        setEmailForm(result.userData.email)
        setPhone(result.userData.phone)
        setLocations(result.locations)
        setEmail(result.userData.email)
        if(result.userData.photo!==null)
          setSrc2(`https://soc-net.info/foody/${result.userData.photo}`)
        setCus(result)
      } catch (error) {
        console.error("Error:", error);
      }
    }
useEffect(()=>{
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
  setTotal(totala)
  let number = 0
  cart.map((elm)=>{
      number+=elm.quantity
   })
  setNumberOfItems(number)
},[])
    const fetchRes= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getres.php", {
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
        //result.userData)
        setRes(result.userData)
       
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const fetchMeals= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getMeals.php", {
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
        //result.meals)
        setMeals(result.meals)
      } catch (error) {
        console.error("Error:", error);
      }
    }
    useEffect(()=>{
        fetchRes()
        fetchData()
        fetchMeals()
        fetchData2()
        fetchNotifications()
    },[])
   
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
        const report = async (id_comment,idResto,idComment,id_order)=>{
            try {
                    const response = await fetch("https://soc-net.info/foody/report.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                          id_comment:id_comment,
                          idResto:idResto,
                          idComment:idComment,
                          id_order:id_order,
                          id_reporter:localStorage.getItem('userId')
                        }
                    ),
                    });
                    const result = await response.json();
                    //result)
                    if(result.status==1){
                        fetchComments()                        
                        setSuccess4(true);
                        message4.current && message4.current.classList.remove("message");
                        message4.current &&  void message4.current.offsetWidth;
                        message4.current && message4.current.classList.add("message");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
        }
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
        //result.notifications); // { success: true, message: "..." }
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

        const result = await response.json();
        //result)
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
      const handleNameSurnameChange = (e)=>{
        setNameSurname(e.target.value)
      }
      const handleEmailChange = (e)=>{
        setEmailForm(e.target.value)
      }
      const handleMessageChangeForm = (e)=>{
        setMessageForm(e.target.value)
      }
  return (
    <div id='main'>
        {overlay && <div className='overlay'></div>}
 {success34 && <p ref={message34} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Email sent!</p>}
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
      {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Restaurant added to favorites!</p>}

      {success3 && <p ref={message3} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Meal added to cart!</p>}

{success2 && <p ref={message2} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Restaurant removed from favorites!</p>}
{success4 && <p ref={message4} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Comment reported!</p>}
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
                <Link to='/favorites'><span>Favorite Restaurants</span></Link>
                <Link to={`/profile/${localStorage.getItem('userId')}`}><span onClick={()=>{setToggle(false);}}>My Profile</span></Link>
                <span onClick={()=>{document.body.style.overflow='hidden';setContact(true);setOverlay(true)}}>Contact From</span>
                <Link to='/'><span onClick={()=>{
                                  if(Cookies.get('stayLogged')){
                                      Cookies.remove('stayLogged');
                                  }
                                }} style={{color:'red'}}>Sign Out</span></Link>
            </div>}
            {toggle2 && <div ref={notif} style={{width:'300px',overflowY:'auto',maxHeight:'400px',height:'fit-content',backgroundColor:'white',boxShadow:'0 0 5px gray',position:'absolute',right:'50px',top:'65px'}}>
              {(notifications && notifications.length>0) && <div style={{display:'flex',justifyContent:'flex-end'}}><span onClick={clear} style={{padding:'0',cursor:'pointer',margin:'10px',fontSize:'0.9em',backgroundColor:'#fff',color:'#f9920b',boxShadow:'none'}}>Clear</span></div>}
            {(notifications && notifications.length>0) ? notifications.map((elm,index)=>(
              <div style={{display:'flex',backgroundColor:elm.flag==1?'#f2e0c8':'#fff',alignItems:'center'}}>
                <i style={{backgroundColor:'#f9920b',color:'white',padding:'10px',borderRadius:'15px'}}className="fa-solid fa-bell"></i>
                <span key={index} style={{padding:'0',margin:'10px',fontSize:'0.9em',backgroundColor:elm.flag===1?'#f2e0c8':'#fff',color:'black',boxShadow:'none'}}>{elm.notification_text}</span>
              </div>
            )): <div style={{display:'flex',justifyContent:'center'}}><span style={{padding:'0',margin:'10px',fontSize:'0.9em',backgroundColor:'#fff',color:'black',boxShadow:'none'}}>You have no new notifications</span></div>}
            </div>}
            {toggle3 && <div ref={cart} className='cart'>
                <div style={{width:'300px',position:'relative',textAlign:'center'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <i onClick={()=>setToggle3(false)} style={{position:'absolute',right:'0px',top:'10px'}} className="fa-solid fa-xmark"></i>
                
              </div>
             {
  cartBuy?.length > 0 ? (
    <>
    <h2>Order Menu</h2>
      {cartBuy.map((elm, index) => (
        <div
          key={index}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
            <img
              width="50"
              height="50"
              style={{ objectFit: 'cover' }}
              src={`https://soc-net.info/foody/${elm.mealPhoto}`}
              alt=""
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                  onChange={(e) => handleQuantityChange(e, elm.mealIndex)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    height: '20px',
                    width: '60px',
                  }}
                  type="number"
                  value={elm.quantity}
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
            cursor:'pointer'
          }}
        >
          Checkout ${total}
        </span></Link>
      </div>
    </>
  ) : (
   <div id='fall'>
      <img
        id='imgFall'
        alt="empty-cart"
        src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"
      />
      <p style={{ fontSize: '2em' }}>Your Cart is Empty</p>
      <p>Looks like you haven't added</p>
      <p>anything to your cart yet</p>
    </div>
  )
}



                </div>   
            </div>}
        </header>
        <div id='pop'>
            <img style={{marginRight:'20px',borderRadius:'50%',objectFit:'cover'}} width='150' height='150' src={res.logo!==null?`https://soc-net.info/foody/${res.logo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png'}/>
            <h1>{res.restaurantName}</h1>
            <i onClick={cus.flag===0?addFavorite:deleteFavorite} style={{color:cus.flag===0?'black':'red'}} className="heart fa-solid fa-heart"></i>
        </div>
        <div id='com'>
          <Link to={`/restoinfo/${id}`}><span style={{fontSize:'1.3em',marginRight:'40px'}}>Menu</span></Link>
          <Link to={`/comments/${id}`}><span id='codar'>Comments({numComments})</span></Link>
        </div>
            <div className='pad'>
           <h1 id='fo'>Comments From Customers ({numComments})</h1>
            <div style={{marginTop:'20px'}}>
                {commentsOnMeals && commentsOnMeals.length>0 && commentsOnMeals.map((elm,index)=>(
                    <div key={index}>
                    <div className='coo'>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <img width='60' style={{borderRadius:'50%'}} height='60' src={elm.user.photo!=null?`https://soc-net.info/foody/${elm.user.photo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=96,h=96,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png'}/>
                                <div style={{marginLeft:'10px'}}>
                                    <span>{elm.user.name}</span><br/>
                                    <span style={{color:'#888',fontWeight:'400'}}>{elm.commentcontent[0].comment}</span><br/>
                                    <span style={{fontSize:'0.9em',color:'#888',fontWeight:'400'}}>{new Date(elm.commentcontent[0].dateComment.replace(' ', 'T')).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')}</span>
                                </div>
                        </div>
                        {elm.commentcontent[0].reported!=1? <span onClick={()=>report(elm.commentcontent[0].id,elm.comment.id_restaurant,elm.comment.id,elm.comment.id_order)} style={{cursor:'pointer'}}>Report</span>:<span style={{cursor:'pointer'}}>Reported</span>}
                    </div>
                    {elm.commentcontent.length==2 && <div className='pala'>
                        <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                             <div  style={{display:'flex',alignItems:'center'}}><img width='60' style={{borderRadius:'50%'}} height='60' src={res.logo!=null?`https://soc-net.info/foody/${res.logo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=96,h=96,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png'}/>
                                    <div style={{marginLeft:'10px'}}>
                                        <span>{res.restaurantName}</span><br/>
                                        <span style={{color:'#888',fontWeight:'400'}}>{elm.commentcontent[1].comment}</span><br/>
                                        <span style={{fontSize:'0.9em',color:'#888',fontWeight:'400'}}>{new Date(elm.commentcontent[1].dateComment.replace(' ', 'T')).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')}</span>
                                    </div>
                            </div>
                            
                        {elm.commentcontent[1].reported!=1? <span onClick={()=>report(elm.commentcontent[1].id,elm.comment.id_restaurant,elm.comment.id,elm.comment.id_order)} style={{cursor:'pointer'}}>Report</span>:<span style={{cursor:'pointer'}}>Reported</span>}
                            </div>
                    </div>}
                    </div>
                ))}
            </div>

            </div>
            </div>
   
  );
}

export default Comments;
             
             
