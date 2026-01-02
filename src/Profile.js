import './CusDash.css'
import { useState ,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
function LocationMarker({ position, setPosition, setAddressInput }) {
  const map = useMap();

 const fetchAddress = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=79f59e686d9c4881b2478ba24e3b1416`
    );
    const data = await res.json();
    const result = data.results[0];
    if (result) {
      setAddressInput(result.formatted); // simple, readable address
    } else {
      setAddressInput("");
    }
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    setAddressInput("");
  }
};


  useMapEvents({
    click(e) {
      const lat = e.latlng.lat.toFixed(6);
      const lng = e.latlng.lng.toFixed(6);
      setPosition({ lat, lng });
      fetchAddress(lat, lng); // update address input on map click
    },
  });

  return position ? (
    <Marker
      position={[position.lat, position.lng]}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          const lat = latlng.lat.toFixed(6);
          const lng = latlng.lng.toFixed(6);
          setPosition({ lat, lng });
          fetchAddress(lat, lng); // also update address on drag
        },
      }}
    />
  ) : null;
}

function FlyToLocation({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo([position.lat, position.lng], 14);
  }
  return null;
}

const SelectLocationMap = ({ position, setPosition, addressInput, setAddressInput }) => {
  const [suggestions, setSuggestions] = useState([]);
  const timeoutRef = useRef(null);

  const handleInputChange = (e) => {
  const query = e.target.value;
  setAddressInput(query);

  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  if (!query || query.length < 2) return setSuggestions([]); // <-- add minimum length check

  timeoutRef.current = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=79f59e686d9c4881b2478ba24e3b1416&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }, 400);
};


  const handleSuggestionClick = (place) => {
    const lat = parseFloat(place.geometry.lat).toFixed(6);
    const lng = parseFloat(place.geometry.lng).toFixed(6);
    setPosition({ lat, lng });
    setAddressInput(place.formatted);
    setSuggestions([]);
  };

  return (
    <>
      <div style={{ marginBottom: "1rem", position: "relative" }}>
        <input
          type="text"
          placeholder="Search address..."
          value={addressInput}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "100%", fontSize: "16px", border: "1px solid #ccc" }}
        />
        {suggestions.length > 0 && (
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "8px",
            border: "1px solid #ddd",
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 81000,
          }}>
            {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              style={{ padding: "6px", cursor: "pointer" }}
            >
              {item.formatted}
            </li>
          ))}
          </ul>
        )}
      </div>

      <MapContainer
        center={[31.63, -7.99]}
        zoom={6}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
  position={position}
  setPosition={setPosition}
  setAddressInput={setAddressInput}
/>

        <FlyToLocation position={position} />
      </MapContainer>

      {position && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Latitude:</strong> {position.lat}, <strong>Longitude:</strong> {position.lng}
        </p>
      )}
    </>
  );
};
function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [flagNotification,setFlagNotification] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [toggle,setToggle] = useState(false)
    const [toggle2,setToggle2] = useState(false)
    const [toggle3,setToggle3] = useState(false)
    const [overlay,setOverlay] = useState(false)
     const [position, setPosition] = useState(null);
    const [addressInput, setAddressInput] = useState("");
    const [search,setSearch] = useState("")
    const handleSearchChange = (e)=>{
      setSearch(e.target.value)
    }
    const navigate = useNavigate();
    const [success34,setSuccess34] = useState(false)
    const message34 = useRef(null)
    const [total,setTotal] =useState(0)
    const [numberOfItems,setNumberOfItems] =useState(null)

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
    const [cartBuy,setCartBuy]=useState(JSON.parse(localStorage.getItem("cart")) || [])
    const [form,setForm] = useState(false)
    const profile = useRef(null)
    const notif = useRef(null)
    const cart = useRef(null)
    const [firstProfile,setFirstProfile] = useState(false)
    const [file2, setFile2] = useState(null);
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [restaurants,setRestaurants] = useState(false)
    const [error3,setError3] = useState(false)
    const [error4,setError4] = useState(false)
    const [error5,setError5] = useState(false)
    const [meals,setMeals] = useState(false)
    function isValidPhoneNumber(phone) {
      const cleaned = phone.replace(/[\s()-]/g, ''); // Remove spaces, hyphens, parentheses
      const regex = /^\+?\d{10,15}$/; // Optional +, 10-15 digits
      return regex.test(cleaned);
    }
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [phone,setPhone] = useState("")

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


    const hanldeNameChange = (e)=>{
      if(e.target.value===""){
        setError2(true)
      }else{
        setError2(false)
      }
        setName(e.target.value)
    }
    const hanldeSurNameChange = (e)=>{
      if(e.target.value===""){
        setError3(true)
      }else{
        setError3(false)
      } 
      setSurname(e.target.value)
    }
    const hanldePhoneChange = (e)=>{
      if(!isValidPhoneNumber(e.target.value) && e.target.value!==""){
        setError4(true)
      }else{
        setError4(false)
      }
      setPhone(e.target.value)
    }



    const message = useRef(null)
    const message2 = useRef(null)
    const message6 = useRef(null)
    const profileOpener = useRef(null)
    const fileInputRef = useRef(null)
    const [error,setError] = useState(false)
    const notificationOpener = useRef(null)
    const cartOpener = useRef(null)
    const [categories,setCategories] = useState([])
    const [success,setSuccess] = useState(false)
    const [success2,setSuccess2] = useState(false)
    const [success6,setSuccess6] = useState(false)
    const [filteredCategories2,setFilterdCategories2] = useState([])
    const [filteredCategories1,setFilterdCategories1] = useState([])
    const [first,setFirst] = useState(true)
    const [locations,setLocations] = useState([])
    const [location,setLocation] = useState([])
    const handleImageClick2 = () => {
        fileInputRef.current.click();
    };
     const handleFileChange2 = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith("image/")) {
          setFile2(selectedFile);
          setPreviewUrl2(URL.createObjectURL(selectedFile)); // for image preview
          setError(false)
        }
      };
    const [previewUrl2, setPreviewUrl2] = useState(null);
    
    const [src2,setSrc2] = useState("https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=192,h=192,f=auto,dpr=1,fit=contain/f1644159799800x841425035363490000/icons8-male-user-100%20%281%29.png")
    const handleLocationChange = (e)=>{
        setLocation(e.target.value)
    }
    const { id } = useParams();
    useEffect(()=>{
          if(localStorage.getItem('authId')!=id){
            navigate('/')
          }
        },[])
    useEffect(()=>{
        fetchData2()
        fetchRestaurants()
        fetchMeals()
        fetchData()
    },[])

const [nameSurname,setNameSurname] = useState(``)
      const [emailForm,setEmailForm] = useState("")
const [messageForm,setMessageForm] = useState("")
const handleNameSurnameChange = (e)=>{
        setNameSurname(e.target.value)
      }

const handleEmailChange = (e)=>{
        setEmailForm(e.target.value)
      }



const handleMessageChangeForm = (e)=>{
        setMessageForm(e.target.value)
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
              id:id
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
              id:localStorage.getItem('userId')
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
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const deleteLocation = async(id)=>{
      const idLocation = id
      try {
        const response = await fetch("https://soc-net.info/foody/deleteCusLocation.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:idLocation
            }
          ),
        });

        const result = await response.json();
        if(result.status===1){
            fetchData()
            setSuccess6(true);
            message6.current && message6.current.classList.remove("message");
            message6.current &&  void message6.current.offsetWidth;
            message6.current && message6.current.classList.add("message");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }


    const addLocation = async()=>{
        setLocation('')
      try {
        const response = await fetch("https://soc-net.info/foody/addLocation.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:localStorage.getItem('userId'),
              location:addressInput,
              lat: position.lat,
              lng: position.lng,
            }
          ),
        });

        const result = await response.json();
        //result)
        if(result.status===1){
            fetchData()
            setOverlay(false)
            setForm(false)
            setSuccess(true);
            message.current && message.current.classList.remove("message");
            message.current &&  void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const [contact,setContact] = useState(false)


    useEffect(()=>{
        fetchData()
    },[])
   const selectCategory = (elm) => {
    const selectedId = elm.target.id;

    // Find selected element
    const selectedCategory = categories.find(cat => cat.id == selectedId);
    if (!selectedCategory) return;

    // Update selectedCategories
    setFilterdCategories2(prev => {
        const alreadySelected = prev.some(cat => cat.id == selectedId);
        if (alreadySelected) return prev;

        return [...prev, selectedCategory];
    });

    // Update filteredCategories to remove the selected one
    setFilterdCategories1(prev =>
        prev.filter(cat => cat.id != selectedId)
    );
};

useEffect(() => {
    fetchRestaurants();
}, [filteredCategories2,search]);

const removeCategory = (elm) => {
    const selectedId = elm.target.id;

    // Find selected element
    const selectedCategory = categories.find(cat => cat.id == selectedId);
    if (!selectedCategory) return;

    // Update selectedCategories
    setFilterdCategories1(prev => {
        const alreadySelected = prev.some(cat => cat.id == selectedId);
        if (alreadySelected) return prev;

        return [...prev, selectedCategory];
    });

    // Update filteredCategories to remove the selected one
    setFilterdCategories2(prev =>
        prev.filter(cat => cat.id != selectedId)
    );
};


    const fetchData2= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getCategories.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setCategories(result.cate)
        setFilterdCategories1(result.cate) 
    } catch (error) {
        console.error("Error:", error);
      }
    }

    const fetchRestaurants= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getRestaurants.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              search:search,
              categories:filteredCategories2
            }
          ),
        });

        const result = await response.json();
        setRestaurants(result.restaurants)
    } catch (error) {
        console.error("Error:", error);
      }
    }

    const fetchMeals= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getAllMeals.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setMeals(result.meals)
        //result.meals)
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
const updateCustomer= async ()=>{
  
  if(name===""){
    setError2(true)
  }else{
    setError2(false)
  }
  if(surname===""){
    setError3(true)
  }else{
    setError3(false)
  }
  if(phone===""){
    setError4(true)
  }else{
    setError4(false)
  }
 
const formData = new FormData();
    formData.append("file", file2);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("phone", phone);
    formData.append("id", localStorage.getItem('userId'));

if(!error2 && !error3 && !error4){
    try {
      const res = await fetch("https://soc-net.info/foody/updateCusInfo.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      //result);
      if (result.status === 1) {
        setSuccess2(true);
        message2.current && message2.current.classList.remove("message");
        message2.current &&  void message2.current.offsetWidth;
        message2.current && message2.current.classList.add("message");
        
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
}}


        
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
            <button onClick={addMessage} style={{cursor:'pointer',position:'absolute',right:'40px',bottom:'10px',backgroundColor:'#fb9300',border:'none',outline:'none',color:'white',padding:'10px 20px',borderRadius:'10px'}}>Submit</button>    
        </div>}
        {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>A new address successfully added!</p>}
            {success2 && <p ref={message2} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Profile successfully updated!</p>}


            {success6 && <p ref={message6} className='message' style={{textAlign:'center',zIndex:'100',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Location successfully deleted!</p>}


        {overlay && <div className='overlay'></div>}
        {form && <div className='form'>
            <h1>Add an address</h1>
            <i onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setForm(false)}} id='close3' className="fa-solid fa-xmark"></i>
            <h4 style={{marginBottom:'20px'}}>Your address</h4>
            
            <div style={{ padding: "20px",width:'100%' }}>
             <SelectLocationMap
                position={position}
                setPosition={setPosition}
                addressInput={addressInput}
                setAddressInput={setAddressInput}
              /></div>
            <button onClick={addLocation} style={{cursor:'pointer',position:'absolute',right:'40px',bottom:'10px',backgroundColor:'#fb9300',border:'none',outline:'none',color:'white',padding:'10px 20px',borderRadius:'10px'}}>Save</button>    
        </div>}
        <header id="header">
            <Link to={`/cusdash/${localStorage.getItem('userId')}`}><img width='120' onClick={()=>{setFirst(true);setFirstProfile(false);}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/></Link>
            <div className='pl'>
                <div ref={cartOpener} onClick={()=>{setIsMenuOpen(!isMenuOpen),setToggle3(!toggle3);setToggle(false);setToggle2(false)}} style={{position:'relative'}}>
                <i className="fa-solid fa-cart-shopping"></i>
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
                <Link to={`/profile/${id}`}><span onClick={()=>{setToggle(false);}}>My Profile</span></Link>
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
                <div style={{position:'relative'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <i onClick={()=>setToggle3(false)} style={{position:'absolute',right:'0px',top:'10px'}} className="fa-solid fa-xmark"></i>
                
              </div>
             {
  cartBuy?.length > 0 ? (
    <>
    <h2>Order Menu</h2>
      {isMenuOpen && cartBuy.map((elm, index) => (
        <div
          key={elm.mealIndex}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
            <img
              width="50"
              height="50"
              style={{ objectFit: 'cover',marginRight:'5px' }}
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
            cursor:'pointer',
            marginRight:'0'
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
        
        
        
       

    
        <div>
        <div style={{padding:'40px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <h1 style={{fontSize:'1.3em'}}>Your profile</h1>
                
            </div>
            <div id='op'>
                <div id='po'>
                    <h3 style={{marginBottom:'10px'}}>Profile Photo</h3>
                    {!previewUrl2 && <img onClick={handleImageClick2} style={{padding:'2px', cursor: 'pointer',border:error1? '2px dashed red':'2px dashed #ccc', borderRadius: '10px'}} width='120' src={src2==null?'':src2} alt="Click to upload"/>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange2}
                        style={{ display: 'none' }}
                    />            
                    {previewUrl2 && <img onClick={handleImageClick2} src={previewUrl2} alt="Preview" width="120" style={{padding:'2px', cursor: 'pointer',border: '2px dashed #ccc', borderRadius: '10px'}} />}
                    
                    <h3>Name</h3>
                    <input style={{cursor: 'pointer',border:error2? '2px dashed red':""}} value={name} onChange={hanldeNameChange} placeholder='Type here...' type='text' />
                    <h3>Surname</h3>
                    <input style={{cursor: 'pointer',border:error3? '2px dashed red':""}} value={surname} onChange={hanldeSurNameChange} placeholder='Type here...' type='text' />
                    <h3>Phone</h3>
                    <input style={{cursor: 'pointer',border:error4? '2px dashed red':""}} value={phone==null?"":phone} onChange={hanldePhoneChange} placeholder='Type here...' type='text' />
                    <button onClick={updateCustomer} style={{marginTop:'15px',cursor:'pointer',padding:'15px 15px',fontSize:'1.4em',borderRadius:'10px',backgroundColor:'#fb9300',color:'white',border:'none',outline:'none'}}>Save Changes</button>
                </div>
                <div id="lo">
                    <div className='lop'>
                        <h3 style={{marginBottom:'15px'}}>Your addresses</h3>
                        <span onClick={()=>{setForm(true);setOverlay(true);document.body.style.overflowY='hidden'}} style={{cursor:'pointer',color:'#fb9300'}}>Modify address</span>    
                    </div>
                    {locations && locations.map((elm,index)=>(
                      <div key={index} style={{margin:'20px 0'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                          <span key={elm.id}>{elm.location}</span>
                          <i onClick={()=>deleteLocation(elm.id)} className="fa-solid fa-trash"></i>
                        </div>
                        {locations.length!==index+1 && <hr style={{margin:'20px 0'}}/>}
                      </div>
                    ))}
                </div>    
            </div>           
        </div>
    </div>
    </div>
  );
}

export default Profile;
