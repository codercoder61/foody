import './CheckOut.css'
import { useState ,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    if(e.target.value==="")
      setError4(true)
    else
      setError4(false)
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
    const [error4,setError4] = useState(false)

  return (
    <>
      <div style={{ marginBottom: "1rem", position: "relative" }}>
        <input
          type="text"
          placeholder="Search address..."
          value={addressInput}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "100%", fontSize: "16px", border:error4?"1px dashed red":"" }}
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
function CheckOut() {
    const [error4,setError4] = useState(false)

    const navigate = useNavigate();
    useEffect(()=>{
            if(!localStorage.getItem('authId')){
              navigate('/')
            }
          },[])
          const [position, setPosition] = useState(null);
                      const [addressInput, setAddressInput] = useState("");
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(false)
    const [from,setFrom] = useState(false)
    const [meals,setMeals] = useState(false)

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const [cus,setCus] = useState(false)
    const [email,setEmail] = useState("")
    const handleEmailChange = (e)=>{
        if(!validateEmail(e.target.value) || e.target.value===""){
            setError1(true)
        }else{
            setError1(false)
        }
        setEmail(e.target.value)
    }
    const [name,setName] = useState("")
    const handleNameChange = (e)=>{
        if(e.target.value===""){
            setError2(true)
        }else{
            setError2(false)
        }
        setName(e.target.value)
    }
    const [phone,setPhone] = useState("")
    const handlePhoneChange = (e)=>{
        if(!isValidPhoneNumber(e.target.value) || e.target.value===""){
            setError3(true)
        }else{
            setError3(false)
        }
        setPhone(e.target.value)
    }
    const [addresse,setAddresse] = useState("")
   // const handleAddresseChange = (e)=>{
     //   if(e.target.value===""){
       //     setError4(true)
        //}else{
          //  setError4(false)
        //}
        //setAddresse(e.target.value)
    //}

    function isValidPhoneNumber(phone) {
      const cleaned = phone.replace(/[\s()-]/g, ''); // Remove spaces, hyphens, parentheses
      const regex = /^\+?\d{10,15}$/; // Optional +, 10-15 digits
      return regex.test(cleaned);
    }
    const [total,setTotal] =useState(0)
    const [cartBuy,setCartBuy]=useState(JSON.parse(localStorage.getItem("cart")) || [])
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
            }
          ),
        });
        const result = await response.json();
        setCus(result)
      } catch (error) {
        console.error("Error:", error);
      }
    }
    useEffect(()=>{
        fetchData()
    },[])


    useEffect(()=>{
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let arrayFrom = []
        let arrayMeals = []
        cart.map(elm=>{
          if(arrayFrom.indexOf(elm.restaurantName)===-1){
            arrayFrom.push(elm.restaurantName)
          }
        })
        cart.map(elm=>{
          if(arrayMeals.indexOf(elm.mealName)===-1){
            arrayMeals.push(elm.mealName)
          }
        })
        setMeals(arrayMeals.join(","))
        setFrom(arrayFrom.join(","))
        const totala = cart.reduce((acc, item) => acc + item.mealPrice * item.quantity, 0);
        setTotal(totala)
        
    },[])
   const handleSubmit = async (e)=>{
        e.preventDefault()
        if(email=="" || !validateEmail(email)){
          setError1(true)
          //11)
        }
        if(name==""){
          setError2(true)
          
        }
        if(phone=="" || !isValidPhoneNumber(phone)){
          setError3(true)
          
        }
        if(addressInput==""){
          setError4(true)
          
        }
        if(email!=="" && name!=="" && phone!=="" && addressInput!=="" ){


         try {
        const response = await fetch("https://soc-net.info/foody/addOrder.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              id:localStorage.getItem('userId'),
              cart:cartBuy,
              email:email,
              name:name,
              addresse:addressInput,
              phone:phone,
              lat:position.lat,
              lng:position.lng
            }
          ),
        });
        

        const result = await response.json();
        if(result.status==1){
          navigate(`/cusdash/${localStorage.getItem('userId')}/1`)
        }
        //result)
      } catch (error) {
        console.error("Error:", error);
      }
    }}

  return (
    <div id='main'>
        <header id="header">
            <Link to={`/cusdash/${localStorage.getItem('userId')}`}><img width='120' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/></Link>
        </header>
        <div style={{marginTop:'70px',padding:'20px 40px'}}>
            <h1 style={{fontSize:'1.3em'}}>Your Order</h1>
            <div style={{color:'#999',fontSize:'1.3em'}}>
                {meals}
            </div>
            <p style={{fontSize:'2.6em'}}>${total+10}.00</p>
            <p style={{color:'#999',fontSize:'1.3em'}}>Order from {from}</p>
        </div>

        <div id='lama'>
              <div className='food'>
                <img width='300' src="https://stripe-camo.global.ssl.fastly.net/20f840aec664bdea54127e8e0b049f32884b5fc230dea3ec20709ef88a8c419d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f617070666f726573745f75662f6631363436303631323733303732783535323334343535333835313335393830302f436f6d706f6e656e742532303225323025323832253239253230253238312532392e706e67/6d65726368616e745f69643d616363745f315069416c554376564665324246336926636c69656e743d5041594d454e545f50414745"/>
              </div>
              <div className='food'>
                <form className='form2' onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input style={{border:error1?"1px dashed red":""}} id="email" type="email" value={email} onChange={handleEmailChange} />
                    <label htmlFor="name">Name</label>
                    <input style={{border:error2?"1px dashed red":""}} id="name" type="text" value={name} onChange={handleNameChange} />
                    <label htmlFor="phone">Phone number</label>
                    <input style={{border:error3?"1px dashed red":""}} id="phone" type="text" value={phone} onChange={handlePhoneChange} />
                    <label htmlFor="addresse">Address</label>
                     <SelectLocationMap
                      position={position}
                      setPosition={setPosition}
                      addressInput={addressInput}
                      setAddressInput={setAddressInput}
                    />
                    <input style={{cursor:'pointer'}} type="submit" value='Save Order'/>
                </form>
              </div>
        </div>
    </div>
  );
}

export default CheckOut;
             
             
