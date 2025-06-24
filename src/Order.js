import { computeHeadingLevel } from '@testing-library/dom';
import './Order.css'
import { useState ,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Order() {
      const navigate = useNavigate();
  
  useEffect(()=>{
            if(!localStorage.getItem('authId')){
              navigate('/')
            }
          },[])
    const [toggle,setToggle] = useState(false)
    const [toggle2,setToggle2] = useState(false)
    const [toggle3,setToggle3] = useState(false)
    const [overlay,setOverlay] = useState(false)
    const message = useRef(null)
    const [orderId,setOrderId] = useState("")
    const [status,setStatus] = useState("")
    const [restaurant,setRestaurant] = useState("")
    const [courrier,setCourrier] = useState("")
    const [totalPrice,setTotalPrice] = useState("")
    const [success,setSuccess] = useState(false)
    const [flagNotification,setFlagNotification] = useState(false)
    const [notifications, setNotifications] = useState([]);

    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [phone,setPhone] = useState("")
    const [locations,setLocations] = useState([])
    const [email,setEmail] = useState("")
    const [orders,setOrders] = useState(false)
    const [form,setForm] = useState(false)

   
    const [res,setRes] = useState(false)
    const [categories,setCategories] = useState([])
    
    const profile = useRef(null)
    const notif = useRef(null)
    const cart = useRef(null)
    const [success2,setSuccess2] = useState(false)
    const [success3,setSuccess3] = useState(false)
    const profileOpener = useRef(null)
    const notificationOpener = useRef(null)
    const cartOpener = useRef(null)
    const [cartBuy,setCartBuy]=useState(JSON.parse(localStorage.getItem("cart")) || [])
    const [success34,setSuccess34] = useState(false)
    const message34 = useRef(null)
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
            }
          ),
        });
        const result = await response.json();
        setName(result.userData.name)
        setSurname(result.userData.surname)
        setNameSurname(result.userData.name.includes(result.userData.surname)?result.userData.name:result.userData.name+" "+result.userData.surname)
        setEmailForm(result.userData.email)
        setPhone(result.userData.phone)
        setLocations(result.locations)
        setEmail(result.userData.email)

        if(result.userData.photo!==null)
          setSrc2(`https://soc-net.info/foody/${result.userData.photo}`)
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
              id:localStorage.getItem('userId')
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

     const fetchOrders= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getOrders.php", {
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
        setOrders(result.orders)
        //result)
       
      } catch (error) {
        console.error("Error:", error);
      }
    }
const [contact,setContact] = useState(false)
    const setOrderInfo = (index)=>{
        setCourrier(orders[index].orders.courrier)
        setTotalPrice(orders[index].orders.total_amount)
        setOrderId(orders[index].orders.order_id)
        setStatus(orders[index].orders.status)
        setRestaurant(orders[index].orders.restaurantName)
        setOverlay(true)
        setForm(true)
    }
    const [id_customer,setIdCustomer] = useState(null)
    const [RestaurantId,setRestaurantId] = useState(null)

     const setReviewInfo = (id_customer,orderId,id_restaurant)=>{
        setIdCustomer(id_customer)
        setOrderId(orderId)
        setRestaurantId(id_restaurant)
        setOverlay(true)
        setReview(true)
    }
    
    useEffect(()=>{
        fetchData()
        fetchData2()
        fetchOrders()
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

        const [review,setReview] = useState(false)
const [comment,setComment] = useState("")
const handleCommentChange = (e)=>{
  setComment(e.target.value)
}
const addComment = async()=>{
        setComment('')
      try {
        const response = await fetch("https://soc-net.info/foody/addComment.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:parseInt(localStorage.getItem('userId')),
              comment:comment,
              orderId:orderId,
              idResto:RestaurantId
            }
          ),
        });
        
        const result = await response.json();
        //result)
        if(result.status===1){
            fetchOrders()
            setOverlay(false)
            setReview(false)
            setSuccess(true);
            message.current && message.current.classList.remove("message");
            message.current &&  void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
            document.body.style.overflow = "unset"
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
     const [messageForm,setMessageForm] = useState("")
      const [nameSurname,setNameSurname] = useState(`${name} ${surname}`)
         const [emailForm,setEmailForm] = useState(email)

          const handleEmailChange = (e)=>{
        setEmailForm(e.target.value)
      }
const handleNameSurnameChange = (e)=>{
        setNameSurname(e.target.value)
      }

const handleMessageChangeForm = (e)=>{
        setMessageForm(e.target.value)
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
  return (
    <div id='main'>
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
            <div style={{display:'flex',justifyContent:'flex-end'}}><button onClick={addMessage} style={{cursor:'pointer',backgroundColor:'#fb9300',border:'none',outline:'none',color:'white',padding:'10px 20px',borderRadius:'10px'}}>Submit</button></div>
        </div>}
      {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Thank you for sharing your thoughts!</p>}

      {review && <div className='form'>
            <h1>Your review</h1>
            <i onClick={()=>{document.body.style.overflow='unset';setComment("");setOverlay(false);setReview(false)}} style={{cursor:'pointer',position:'absolute',right:'40px',top:'50px'}} className="fa-solid fa-xmark"></i>
            <h4 style={{marginBottom:'20px'}}>Your comment</h4>
            <input value={comment} onChange={handleCommentChange} type='text' placeholder='Type here...' style={{height:'60px',width:'100%'}}/>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'10px'}}><button onClick={addComment} style={{cursor:'pointer',backgroundColor:'#fb9300',border:'none',outline:'none',color:'white',padding:'10px 20px',borderRadius:'10px'}}>Save</button></div>    
        </div>}
      {overlay && <div className='overlay'></div>}
      {form && <div className='form'>
        <div>
           <h1>Order Details</h1>  
           <i onClick={()=>{setForm(false);setOverlay(false);}} style={{position:'absolute',right:'20px',top:'20px',cursor:'pointer'}} className="fa-solid fa-xmark"></i>
        </div>
           <p><span style={{fontWeight:'bold'}}>Order ID: </span><span> #{orderId}</span></p>
           <p><span style={{fontWeight:'bold'}}>Status:</span><span> {status}</span></p>
           <p><span style={{fontWeight:'bold'}}>Restaurant: </span><span> {restaurant}</span></p>
           <p><span style={{fontWeight:'bold'}}>Courier:</span><span> {courrier}</span></p>
           <p><span style={{fontWeight:'bold'}}>Delivery Fee:</span><span> $10</span></p>
           <p><span style={{fontWeight:'bold'}}>Total Price: </span><span> ${totalPrice+10}</span></p>
        </div>}
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
                  flag(localStorage.getItem('userId'));
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
                <Link to={`/profile/${localStorage.getItem('userId')}`}><span>My Profile</span></Link>
                <span onClick={()=>{document.body.style.overflow='hidden';setContact(true);setOverlay(true)}}>Contact Form</span>
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
                <h1 style={{fontSize:'1.3em'}}>Order History</h1>
               <div id='order'>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Restaurant</td>
                    <td className='hide' style={{ borderBottom: '1px solid #ddd' }}>Meals</td>
                    <td className='hide' style={{ borderBottom: '1px solid #ddd' }}>Price</td>
                    <td className='hide' style={{ borderBottom: '1px solid #ddd' }}>Status</td>
                    <td className='hide' style={{ borderBottom: '1px solid #ddd' }}>Date</td>
                    <td style={{ borderBottom: '1px solid #ddd' }}>Actions</td>
                </tr>
                </thead>
                <tbody>
                
                  {orders && orders.map((elm,index) => (
                    <tr key={elm.orders.order_id} style={{ backgroundColor: '#fff' }}>
                      <td style={{display:'flex',alignItems:'center',padding: '10px 10px' }}>{elm.orders.restaurantName}</td>
                      <td className='hide' >{elm.orders.meal_names}</td>
                      <td className='hide'>${elm.orders.total_amount+10}</td>
                      <td className='hide'><span style={{padding:'5px',borderRadius:'15px',color:'white',backgroundColor:(elm.orders.status=="Ready" || elm.orders.status=='Delivered')?"green":elm.orders.status=='Pending'?'#02aec7':elm.orders.status=='Rejected'?"red":elm.orders.status=='Active'?"green":'#f5b253'}}>{elm.orders.status}</span></td>
                      <td className='hide'> 
                        {new Date(elm.orders.dateOrder.replace(' ', 'T')).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')}
                      </td>
                      <td style={{cursor:'pointer',color:'#999'}}>
                      <i onClick={()=>setOrderInfo(index)} style={{marginRight:'5px'}} className="fa-solid fa-circle-info"></i>
                       {elm.orders.status=="Delivered" && (!elm.info? <i onClick={()=>setReviewInfo(index,elm.orders.order_id,elm.orders.id_restaurant)} className="fa-solid fa-message"></i>:<Link to={`/comments/${elm.info.id_restaurant}`}><i style={{opacity:'0.6'}} className="fa-solid fa-message"></i></Link>)}
                      </td>
                    </tr>
                  ))}

                </tbody>
               </table>
            </div>

            </div>
           
            </div>
    
  );
}

export default Order;
             
             
