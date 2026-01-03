import React ,{useState,useRef,useEffect }from 'react'
import './ResDash.css'
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
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
    
    //"Suggestions from OpenCage:", data.results);
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
  item.formatted ? (
    <li
      key={i}
      onClick={() => handleSuggestionClick(item)}
      style={{ padding: "6px", cursor: "pointer" }}
    >
      {item.formatted}
    </li>
  ) : null
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
function ResDash() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [position, setPosition] = useState(null);
            const [addressInput, setAddressInput] = useState("");
    useEffect(()=>{
          if(!localStorage.getItem('authId') || localStorage.getItem('authId')!=id){
            navigate('/')
          }
        },[])
    const message = useRef(null)
    const message2 = useRef(null)
    const message3 = useRef(null)
    const message4 = useRef(null)
    const message5 = useRef(null)
    const message6 = useRef(null)
    const message7 = useRef(null)
    const message8 = useRef(null)
        const [ordersPerMonth,setOrdersPerMonth] = useState(null)
    
    const [bestsellermeals,setbestsellermeals]=useState(null)
    const [time, setTime] = useState("");
    const [mealId,setMealId] = useState(null)
    const [ticketId,setTicketId] = useState(null)
    const [meals2, setMeals2] = useState(null);
    const [errorTicket, setErrorTicket] = useState(false);
    const [messageTicket,setMessageTicket] = useState('')
    const [messagesTickets,setMessagesTickets] = useState(false)
    const [messages,setMessages] = useState(false)
    const [orders,setOrders] = useState(null)
    const handleMessageChange = (e)=>{
      if(e.target.value!==""){
        setErrorTicket(false)
      }else{
        setErrorTicket(true)
      }
      setMessageTicket(e.target.value)
    }

    const createTicket = async ()=>{
      const payload = {
          message: messageTicket,
          id:uniqId,
          isResto:1
        };
        //(payload)
        if(!errorTicket){
        try {
          const res = await fetch("https://soc-net.info/foody/createTicket.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await res.json(); // assuming backend echoes JSON
          //(result);

          if (result.status === 1) {
            setSuccess6(true);
            message6.current && message6.current.classList.remove("message");
            message6.current &&  void message6.current.offsetWidth;
            message6.current && message6.current.classList.add("message");
            setOverlay(false)
            setAddTicketPopUp(false)
            fetchTickets()
            setMessageTicket('')
            document.body.style.overflow= 'unset'
          }
        } catch (error) {
          console.error("Upload error:", error);
        }
    }}


    const getOrders = async ()=>{
      const payload = {
          id:id
        };
        //(payload)
        if(!errorTicket){
        try {
          const res = await fetch("https://soc-net.info/foody/getOrdersRes.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await res.json(); // assuming backend echoes JSON
          setOrders(result.orders)
          //if (result.status === 1) {
           
          //}
        } catch (error) {
          console.error("Upload error:", error);
        }
    }}

    useState(()=>{
      getOrders()
    },[])

   
    const addMessageToTicket = async (e)=>{
      let elm = e.target.parentElement.parentElement.children[1]
      if(messageTicket===''){
        setErrorTicket(true)
      }
      const payload = {
          message: messageTicket,
          id:ticketId,
          id_user:uniqId
        };
        if(!errorTicket){
        try {
          const res = await fetch("https://soc-net.info/foody/addMessageToTicket.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await res.json(); // assuming backend echoes JSON
          //(result);
          getTicketMessages(payload.id)
          setMessageTicket('')
          elm.scrollTop=elm.scrollHeight
          /*if (result.status === 1) {
            setSuccess6(true);
            message6.current && message6.current.classList.remove("message");
            message6.current &&  void message6.current.offsetWidth;
            message6.current && message6.current.classList.add("message");
            setOverlay(false)
            setAddTicketPopUp(false)
            fetchTickets()
            setMessageTicket('')
            document.body.style.overflow= 'unset'
          }*/
        } catch (error) {
          console.error("Upload error:", error);
        }
    }
  
  }

    const getTicketMessages = async (ticketId)=>{
      const payload = {
          ticketId: ticketId
        };
        try {
          const res = await fetch("https://soc-net.info/foody/getTicketMessages.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await res.json(); // assuming backend echoes JSON
          //result)
          setMessages(result.messages)
        } catch (error) {
          console.error("Upload error:", error);
    }}


    const closeTicket = async (ticketId)=>{
      const payload = {
          ticketId:ticketId
        };
        
        try {
          const res = await fetch("https://soc-net.info/foody/closeTicket.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await res.json(); // assuming backend echoes JSON
          //(result);

          if (result.status === 1) {
            setSuccess7(true);
            message7.current && message7.current.classList.remove("message");
            message7.current &&  void message7.current.offsetWidth;
            message7.current && message7.current.classList.add("message");
            fetchTickets()
          }
        } catch (error) {
          console.error("Upload error:", error);
        }
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      const targetElement = document.querySelector('#lala');
      if (targetElement) {
        //('Element appeared in the DOM!');
          targetElement.scrollTop = targetElement.scrollHeight;

        // Do something with the element
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Stop observing once found
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });


    const showTicketMessages = (id)=>{
      setMessagesTickets(true)
      setOverlay(true)
      setTicketId(id)
      getTicketMessages(id)
      setMessageTicket("")
      document.body.style.overflow='hidden'
    }
    const [time2, setTime2] = useState("");
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewUrl2, setPreviewUrl2] = useState(null);
    const [success,setSuccess] = useState(false)
    const [success2,setSuccess2] = useState(false)
    const [success3,setSuccess3] = useState(false)
    const [success5,setSuccess5] = useState(false)
    const [success6,setSuccess6] = useState(false)
    const [success7,setSuccess7] = useState(false)
    const [success8,setSuccess8] = useState(false)
    const [errorEmail,setErrorEmail] = useState(false)
    const [fail,setFail] = useState(false)
    const [password,setPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [email,setEmail] = useState('')
    const [selectedCategory,setSelectedCategory] = useState("")
    const [overlay,setOverlay] = useState(false)
    const [addMealPopUp,setAddMealPopUp] = useState(false)
    const [addTicket,setAddTicketPopUp] = useState(false)

    const [updateMealPopUp,setUpdateMealPopUp] = useState(false)

    const [categories,setCategories] = useState("")
    const [mealName,setMealName] = useState("")
    const [ingredients,setIngredients] = useState("")
    const [price,setPrice] = useState("")
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(false)
    const [error4,setError4] = useState(false)
    const [error5,setError5] = useState(false)
    
    const handleMealNameChange = (e)=>{
        setMealName(e.target.value)
        if(e.target.value!=""){
          setError2(false)
        }else{
          setError2(true)
        }
    }
    const handlePriceChange = (e)=>{
        setPrice(e.target.value)
        if(e.target.value!=""){
          setError5(false)
        }else{
          setError5(true)
        }
    }
    const handleIngredientsChange = (e)=>{  
        setIngredients(e.target.value)
        if(e.target.value!=""){
          setError4(false)
        }else{
          setError4(true)
        }
    }

    
    const showAddMealPopUp = ()=>{
      setOverlay(true)
      setAddMealPopUp(true)
      document.body.style.overflow='hidden';
    }

    const showAddTicketPopUp = ()=>{
      setOverlay(true)
      setAddTicketPopUp(true)
      document.body.style.overflow='hidden';
      setMessageTicket('')
    }

    const showUpdateMealPopUp = (index)=>{
      setOverlay(true)
      setMealId(meals2[index].id)
      setSrc2(`https://soc-net.info/foody/${meals2[index].photo}`)
      setUpdateMealPopUp(true)
      setMealName(meals2[index].name)
      setSelectedCategory(categories[parseInt(meals2[index].category)-1].id)
      setIngredients(meals2[index].ingredients)
      document.body.style.overflow='hidden'; 
      setPrice(meals2[index].price)
    }

    const handlePasswordChange = (e)=>{
      setPassword(e.target.value)
    }
    const handleNewPasswordChange = (e)=>{
      setNewPassword(e.target.value)
    }
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    const handleEmailChange = (e)=>{
      if(e.target.value==='' || !validateEmail(e.target.value) ){
        setErrorEmail(true)
      }else{
        setErrorEmail(false)
      }
      setEmail(e.target.value)
    }
    const handleUpdate = async ()=>{
      const payload = {
    password: password,
    newPassword: newPassword,
    email: email,
    id:id,
  };
  //(payload)
  if(!errorEmail && password!=="" && newPassword!==""){
  try {
    const res = await fetch("https://soc-net.info/foody/updateResInfo3.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json(); // assuming backend echoes JSON
    //(result);

    if (result.status === 1) {
      setSuccess(true);
      message.current && message.current.classList.remove("message");
      message.current &&  void message.current.offsetWidth;
      message.current && message.current.classList.add("message");
    }else{
      setFail(true);
      message2.current && message2.current.classList.remove("message");
      message2.current &&  void message2.current.offsetWidth;
      message2.current && message2.current.classList.add("message");
    }
  } catch (error) {
    console.error("Upload error:", error);
  }}else{
    alert('Fill all fields !')
  }
    }


    const handleTimeChange = (e) => {
      setTime(e.target.value);
    };
    const handleTimeChange2 = (e) => {
      setTime2(e.target.value);
    };
    const [name,setName]=useState("")
    const [location,setLocation]=useState("")
    const handleNameChange = (e)=>{
      setName(e.target.value)
    }
    const [phone,setPhone] = useState("")
    const handlePhoneChange = (e)=>{
      setPhone(e.target.value)
    }
    const handleLocationChange = (e)=>{
      setLocation(e.target.value)
    }
    useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (!auth) {
      navigate('/');
    }
  }, [navigate]); // <-- include navigate in dependencies
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
     const canvasRef = useRef(null);
     const canvasRef2 = useRef(null);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  
    const [analytics,setAnalytics] = useState(true)
    const [uniqId,setUniqId] = useState("")
    const fetchData= async()=>{
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
        //result); // { success: true, message: "..." }
        setName(result.userData.restaurantName)
        setPhone(result.userData.phone)
        setAddressInput(result.userData.restaurantLocation)
        setRange(result.userData.serviceRange)
        setTime(result.userData.serviceStarts)
        const latRes = result.userData.latitude 
        const lngRes = result.userData.longitude 
        setPosition({
          lat:latRes,lng:lngRes
        })
        setTime2(result.userData.serviceEnds)
        setEmail(result.userData.email)
        setUniqId(result.userData.restoOwnerId)
        setNameee(result.userData.restaurantName)
        if(result.userData.logo!==null)
          setSrc(`https://soc-net.info/foody/${result.userData.logo}`)
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const fetchData2= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getCategories.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        //(result);
        setCategories(result.cate) 
      } catch (error) {
        console.error("Error:", error);
      }
    }


    const deleteMeal= async (id)=>{
      try {
        const response = await fetch("https://soc-net.info/foody/deleteMeal.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ id: id })
        });

        const result = await response.json();
        //(result);
        if (result.status === 1) {
        setSuccess5(true);
        message5.current && message5.current.classList.remove("message");
        message5.current &&  void message5.current.offsetWidth;
        message5.current && message5.current.classList.add("message");
      }
        fetchMeals()
      } catch (error) {
        console.error("Error:", error);
      }
    }


   const fetchMeals = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getMeals.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id })
    });

    const data = await response.json();
    setMeals2(data.meals)
    //("Meals:", data.meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

const fetchTickets = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getTickets.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uniqId})
    });

    const data = await response.json();
    //data)
    setTicketsMessages(data.tickets)
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};
const [commentsOnMeals,setCommentsOnMeals] = useState(null)

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
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};



  useEffect(()=>{
    fetchData()
    fetchData2()
    fetchMeals()
    fetchTickets()
    fetchComments()
  },[uniqId])
  useEffect(() => {
    // Only run when analytics is available AND canvas is mounted
    if (!analytics || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    // Destroy old chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2010', '2011', '2012', '2013', '2014'],
        datasets: [
          {
            label: 'Acquisitions by year',
            data: [10, 20, 15, 25, 22],
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }, [analytics]); // ← re-run when `analytics` changes

function donut(data){
  let labels = [];
  let num_orders = [];
   if (!analytics || !canvasRef2.current) return;

    const ctx = canvasRef2.current.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    // Destroy old chart if exists
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    data && data.forEach(element => {
    labels.push(element.meal_name);
    num_orders.push(element.times_ordered);
  });

  const backgroundColors = [];
  for (let i = 0; i < num_orders.length; i++) {
    // Generate a random pastel color
    const hue = Math.floor((360 / num_orders.length) * i);
    backgroundColors.push(`hsl(${hue}, 70%, 70%)`);
  }

    // Create new chart
    chartRef2.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: '',
            data: num_orders,
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
}
 useEffect(() => {
    // Only run when analytics is available AND canvas is mounted
   donut(bestsellermeals)
  }, [bestsellermeals,analytics]); // ← re-run when `analytics` changes

  const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleImageClick2 = () => {
        fileInputRef2.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith("image/")) {
          setFile(selectedFile);
          setPreviewUrl(URL.createObjectURL(selectedFile)); // for image preview
        }
      };
    const handleFileChange2 = (e) => {
        const selectedFile = e.target.files[0];
        //(selectedFile)
        if (selectedFile && selectedFile.type.startsWith("image/")) {
          setFile2(selectedFile);
          setPreviewUrl2(URL.createObjectURL(selectedFile)); // for image preview
          setError1(false)
        }
      };
    const [range,setRange] = useState(10)
    const [profile,setProfile] = useState(false)
    const [meals,setMeals] = useState(false)
    const [comments,setComments] = useState(false)
    const [tickets,setTickets] = useState(false)
    const [ticketsMessages,setTicketsMessages] = useState(false)
    const [credentials,setCredentials] = useState(false)
    const [order,setOrder] = useState(false)
        const handleRangeChange = (e)=>{
            setRange(e.target.value)
        }
    const [src,setSrc]=useState('https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png')

    
    const [src2,setSrc2]=useState('https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png')
    const saveChanges = async ()=>{
      if (!position || !addressInput) {
      alert("Please select a location from the map or search.");
      return;
    }
      const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("location", addressInput);
    formData.append("id", id)
    formData.append("lat", position.lat)
    formData.append("lng", position.lng)
    

    try {
      const res = await fetch("https://soc-net.info/foody/updateResInfo.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      //(result);
      if(result.status===1){
        setSuccess(true)
            message.current.classList.remove("message");
            void message.current.offsetWidth;

    message.current.classList.add("message");

      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    }


    const saveChanges2 = async () => {
  const payload = {
    starts: time,
    ends: time2,
    range: range,
    id: id,
  };

  try {
    const res = await fetch("https://soc-net.info/foody/updateResInfo2.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json(); // assuming backend echoes JSON
    //(result);

    if (result.status === 1) {
      setSuccess(true);
      message.current && message.current.classList.remove("message");
      message.current &&  void message.current.offsetWidth;
      message.current && message.current.classList.add("message");
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};
const updateMeal = async ()=>{
  
  if(mealName===""){
    setError2(true)
  }else{
    setError2(false)
  }
  if(selectedCategory===""){
    setError3(true)
  }else{
    setError3(false)
  }
  if(ingredients===""){
    setError4(true)
  }else{
    setError4(false)
  }
  if(price===""){
    setError5(true)
  }else{
    setError5(false)
  }
const formData = new FormData();
    if(file2!==null)
      formData.append("file", file2);
    formData.append("mealName", mealName);
    formData.append("mealCategory", selectedCategory);
    formData.append("mealIngredients", ingredients);
    formData.append("mealPrice", price);
    formData.append("mealId",mealId)
    formData.append("id",id)
    //for (const [key, value] of formData.entries()) {
      ////`${key}: ${value}`);
    //}
if(!error1 && !error2 && !error3 && !error4 && !error5){
    try {
      const res = await fetch("https://soc-net.info/foody/updateMeal.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      //result);
      if (result.status === 1) {
        setSuccess3(true);
        message4.current && message4.current.classList.remove("message");
        message4.current &&  void message4.current.offsetWidth;
        message4.current && message4.current.classList.add("message");
        fetchMeals()
        setPreviewUrl2(null)
        setMealName("")
        setSelectedCategory("")
        setIngredients('')
        setPrice("")
        setOverlay(false)
        setUpdateMealPopUp(false)
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
}}
const addMeal= async ()=>{
  if(file2===null){
    setError1(true)
  }else{
    setError1(false)
  }
  if(mealName===""){
    setError2(true)
  }else{
    setError2(false)
  }
  if(selectedCategory===""){
    setError3(true)
  }else{
    setError3(false)
  }
  if(ingredients===""){
    setError4(true)
  }else{
    setError4(false)
  }
  if(price===""){
    setError5(true)
  }else{
    setError5(false)
  }
const formData = new FormData();
    formData.append("file", file2);
    formData.append("mealName", mealName);
    formData.append("mealCategory", selectedCategory);
    formData.append("mealIngredients", ingredients);
    formData.append("mealPrice", price);
    formData.append("id", id);
if(!error1 && !error2 && !error3 && !error4 && !error5){
    try {
      const res = await fetch("https://soc-net.info/foody/addMeal.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      //(result);
      if (result.status === 1) {
        setSuccess2(true);
        message3.current && message3.current.classList.remove("message");
        message3.current &&  void message3.current.offsetWidth;
        message3.current && message3.current.classList.add("message");
        fetchMeals()
        setPreviewUrl2(null)
        setMealName("")
        setSelectedCategory("")
        setIngredients('')
        setPrice("")
        setOverlay(false)
        setAddMealPopUp(false)
        document.body.style.overflow='unset'
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
}
}
  const [updateOrder,setUpdateOrder] = useState(false)
  const [orderId,setOrderId] = useState(null)
  const [status,setStatus] = useState(null)
  const setSelectedStatus = (e)=>{
    setStatus(e.target.value)
  }

  const [customerId,setCustomerId] = useState(null)
const changeOrderStatus = async (orderId,orderStatus,customerIdd)=>{
  setStatus(orderStatus)
  setOverlay(true)
  setUpdateOrder(true)
  setOrderId(orderId)
  setCustomerId(customerIdd)
}

const changeStatus =async ()=>{
const payload = {
     orderId: orderId,
     status:status,
     customerId:customerId,
     restoName:nameee
  };

  try {
    const res = await fetch("https://soc-net.info/foody/updateOrderStatus.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json(); // assuming backend echoes JSON
    //result);

    if (result.status === 1) {
      setSuccess8(true);
      message8.current && message8.current.classList.remove("message");
      message8.current &&  void message8.current.offsetWidth;
      message8.current && message8.current.classList.add("message");
      getOrders()
      setOverlay(false)
      setUpdateOrder(false)
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
}
const [addCommentPopUp,setAddCommentPopUp] = useState(false)
const [reply,setReply] = useState("")
const [errorReply,setErrorReply] = useState(false)
const handleReplyChange = (e)=>{
  if(e.target.value==="")
    setErrorReply(false)
  setReply(e.target.value)
}
const [namee,setNamee] = useState("")
const [nameee,setNameee] = useState("")
const [comment,setComment] = useState("")
const [photo,setPhoto] = useState("")
const [dateComment,setDateComment] = useState("")
const [idComment,setIdComment] = useState(null)
const [commentIndex,setCommentIndex] = useState(null)
const showPopUpReply = (commentIndexx,id,name,comment,photo,dateComment)=>{
  setReply('')
  setCommentIndex(commentIndexx)
  setNamee(name)
  setIdComment(id)
  setPhoto(photo)
  setDateComment(dateComment)
  setComment(comment)
  setAddCommentPopUp(true)
  setOverlay(true)
}
const createReply = async (id_customer) =>{
        
      try {
        const response = await fetch("https://soc-net.info/foody/reply.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              idComment:idComment,
              reply:reply,
              id:id,
              restoName:nameee,
              customerId:id_customer
            }
          ),
        });
        
        const result = await response.json();
        //result)
        if(result.status===1){
            setOverlay(false)
            setAddCommentPopUp(false)
            document.body.style.overflow = "unset"
            fetchComments()
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const [totalEarnedMoney,settotalEarnedMoney]=useState(null)
    const [total_orders,settotal_orders]=useState(null)
    const [total_unique_customers,settotal_unique_customers]=useState(null)
    const getStats= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/statsResto.php", {
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
        //result); // { success: true, message: "..." }
        settotalEarnedMoney(result.totalEarnedMoney)
        settotal_orders(result.total_orders)
        settotal_unique_customers(result.total_unique_customers)
        setbestsellermeals(result.best_seller_meals)
        setOrdersPerMonth(result.orders_per_month)
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
    useEffect(()=>{
        getStats()
      },[])
function barreaux(data){
      let labels = [];
      let num_orders = [];
    if (!analytics || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    // Destroy old chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    data && data.forEach(element => {
    labels.push(element.month_name+ " "+element.year);
    num_orders.push(element.orders_count);
  });

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:labels,
        datasets: [
          {
            label: 'Number of orders per month',
            data: num_orders,
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
      useEffect(() => {
          // Only run when analytics is available AND canvas is mounted
          barreaux(ordersPerMonth)
        }, [ordersPerMonth,analytics]); // ← re-run when `analytics` changes
        const menu = useRef(null)
        const handleClick = ()=>{
      const menuref= menu.current
      if(menuref.style.display!='block'){
        menuref.style.display = 'block'
        document.body.style.overflowY = 'unset'
      }else{
        menuref.style.display = "none"     
     }
    }

    const handleClick2 = ()=>{
      const menuref= menu.current
      if(menuref.style.display=='block'){
        menuref.style.display = 'none'
        document.body.style.overflowY = 'unset'
      }else{
        menuref.style.display = "block"     
     }
    }
  return (
    <div>
      <i onClick={handleClick} id='fd' class="fa-solid fa-bars"></i>
      {success8 && <p ref={message8} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Order status successfully updated!</p>}
      {overlay && <div className='overlay'></div>}
      {updateOrder && <div className='updateOrderpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Change order status</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setUpdateOrder(false)}} className="fa-solid fa-xmark"></i></div>  
        <div style={{margin:'50px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{width:'100%'}}>
              <select
              style={{
                width: '100%',
                padding: '10px',
                border: error3 ? '2px dashed red' : '2px solid #fb9300'
              }}
              value={status}
              onChange={(e) => {
                setSelectedStatus(e);

                if (e.target.value === "") {
                  setError3(true);
                } else {
                  setError3(false);
                }
              }}
              >
              <option value="">Choose an option...</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cooking">Cooking</option>
        </select>
          </div>
        </div>
        
        <div className='nv'><span onClick={changeStatus} >Change</span></div>
      </div>}


      {addMealPopUp && <div className='addmealpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Add a meal</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setAddMealPopUp(false)}} className="fa-solid fa-xmark"></i></div>  
        <h2 style={{margin:'20px 0'}}>Photo</h2>
        {!previewUrl2 && <img onClick={handleImageClick2} style={{padding:'2px', cursor: 'pointer',border:error1? '2px dashed red':'2px dashed #ccc', borderRadius: '10px'}} width='120' src={src2} alt="Click to upload"/>}
        <input
            type="file"
            ref={fileInputRef2}
            onChange={handleFileChange2}
            style={{ display: 'none' }}
        />            
        {previewUrl2 && <img onClick={handleImageClick2} src={previewUrl2} alt="Preview" width="120" style={{padding:'2px', cursor: 'pointer',border: '2px dashed #ccc', borderRadius: '10px'}} />}
        
        <div id='mp'>
          <div style={{width:'100%',marginRight:'20px'}}>
              <label>Name</label>
              <input value={mealName} onChange={handleMealNameChange} style={{border:error2? '2px dashed red':'#fb9300',width:'100%'}} placeholder='Type here...' type='text'/>
          </div>
          <div style={{width:'100%'}}>
              <label>Category</label><br/>
              <select style={{ width: '100%', padding: '10px',border:error3? '2px dashed red':'#fb9300' }} value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value);

              if(e.target.value==="")
              {
                  setError3(true)
              }else{
                  setError3(false)
              }
              }}>
                <option value="">Choose an option...</option>
                {categories && categories.map((elm, index) => (
                  <option key={index} value={elm.id}>{elm.name}</option>
                ))}
              </select>
          </div>
        </div>
        <div id='ing'>
          <div style={{width:'100%',marginRight:'20px'}}>
              <label>Ingredients</label>
              <input value={ingredients} style={{border:error4? '2px dashed red':'#fb9300'}} onChange={handleIngredientsChange} placeholder='Type here...' type='text'/>
          </div>
          <div style={{width:'100%'}}>
              <label>Price ($)</label>
              <input value={price} onChange={handlePriceChange} style={{border:error5? '2px dashed red':'#fb9300'}} placeholder='Type here...' type='number'/>
          </div>
        </div>
        <div className='kolo'><span onClick={addMeal}>Add</span></div>
      </div>}


      {addTicket && <div className='addticketpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Create a ticket</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setAddTicketPopUp(false)}} className="fa-solid fa-xmark"></i></div>  
        <h2 style={{margin:'20px 0'}}>Message</h2>
        <textarea value={messageTicket} onChange={handleMessageChange} placeholder='Type here...' style={{marginBottom:'70px',border:errorTicket?"1px solid red":"1px solid #fb9300",outline:'none',fontSize:'1.3em',padding:'10px',width:'100%',height:'30%'}}></textarea>
        <div style={{marginTop:'20px'}}><span onClick={createTicket} style={{cursor:'pointer',position:'absolute',bottom:'50px',right:'50px',color:'white',backgroundColor:'#fb9300',padding:'10px 20px'}}>Create</span></div>
      </div>}


      {addCommentPopUp && <div className='addticketpopupp'>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                      <h1>Reply to comment</h1>
                      <i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setAddCommentPopUp(false)}} className="fa-solid fa-xmark"></i>
                  </div>  
        

<div style={{wordBreak:'break-word',display:'flex',marginTop:'10px',fontSize:'0.8em'}}>
         <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover',margin:'0px 20px 20px 0'}} src={photo?`https://soc-net.info/foody/${photo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png'} alt={`${photo}`} />
            <div>
              <p style={{fontWeight:'bold',fontSize:'1.3em'}}>{namee}</p>
              <p style={{wwordBreak: 'break-word',color:'gray',fontSize:'0.9em'}}>{comment}</p>
              <p style={{color:'gray',fontSize:'0.7em'}}><i style={{fontSize:'0.8em'}} className="fa-solid fa-circle-xmark"></i>{' '}
                {new Date(dateComment).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }).replace(', ', ',')}</p>
                            </div>
                          </div>

        {
          commentsOnMeals && commentsOnMeals[commentIndex].commentcontent.length==2 &&
          <>
          <div style={{wordBreak:'break-word',display:'flex',fontSize:'0.8em'}}>
         <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover',margin:'0px 20px 20px 0'}} src={src} alt={`${commentIndex}`} />
            <div>
              <p style={{fontWeight:'bold',fontSize:'1.3em'}}>{name}</p>
              <p style={{wwordBreak: 'break-word',color:'gray',fontSize:'0.9em'}}>{commentsOnMeals[commentIndex].commentcontent[1].comment}</p>
              <p style={{color:'gray',fontSize:'0.7em'}}><i style={{fontSize:'0.8em'}} className="fa-solid fa-circle-xmark"></i>{' '}
                {new Date(commentsOnMeals[commentIndex].commentcontent[1].dateComment).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }).replace(', ', ',')}</p>
                            </div>
                          </div>
                        </>
        }
        
        
        {commentsOnMeals && commentsOnMeals[commentIndex].commentcontent.length!=2 && <><textarea value={reply} onChange={handleReplyChange} placeholder='Type here...' style={{marginBottom:'70px',border:errorReply?"1px solid red":"1px solid #fb9300",outline:'none',fontSize:'1.3em',padding:'10px',width:'100%',height:'30%'}}></textarea>
        <div style={{marginTop:'20px'}}>
            <span onClick={()=>{createReply(commentsOnMeals[commentIndex].commentcontent[0].id_user)}} style={{cursor:'pointer',position:'absolute',bottom:'50px',right:'50px',color:'white',backgroundColor:'#fb9300',padding:'10px 20px'}}>Reply</span>
        </div></>}
        
        
      </div>}



      {messagesTickets && <div className='addticketpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Ticket messages</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setMessagesTickets(false)}} className="fa-solid fa-xmark"></i></div> 
        <div id='lala'>
        {messages && messages.map((elm,index)=>(
          <div key={index}  style={{wordBreak:'break-word',display:'flex',fontSize:'0.8em'}}>
          <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover',margin:'0px 20px 20px 0'}} src={elm.info.isAdmin==0?elm.userInfo.logo ?`https://soc-net.info/foody/${elm.userInfo.logo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png':"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=64,f=auto,dpr=1,fit=contain/f1646061270754x888289544466858600/Component%203%20%282%29%20%281%29.png"} alt={`${index}`}  />
            <div>
              <p style={{fontWeight:'bold',fontSize:'1.3em'}}>{elm.info.isAdmin==0 ? elm.userInfo.name :"Admin"}</p>
              <p style={{wwordBreak: 'break-word',color:'gray',fontSize:'0.9em'}}>{elm.info.content}</p>
              <p style={{color:'gray',fontSize:'0.7em'}}><i style={{fontSize:'0.8em'}} className="fa-solid fa-circle-xmark"></i>{' '}
                {new Date(elm.info.dateMessage).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }).replace(', ', ',')}</p>
                            </div>
                          </div>
                        ))}
                </div>
        <textarea value={messageTicket} onChange={handleMessageChange} placeholder='Type your message here...' className='ggf' style={{border:errorTicket?"1px solid red":"1px solid #fb9300"}}></textarea>
        <div id='ll'><span onClick={addMessageToTicket} className='sh'>Send</span></div>
      </div>}


      {updateMealPopUp && <div className='addmealpopup'>
   
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Update a meal</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{setPreviewUrl2(null);
        setMealName("");
        setSelectedCategory("");
        setIngredients('');
        setPreviewUrl2(null);
        setPreviewUrl(null);
        setFile2(null);document.body.style.overflow='unset';
        setSrc2("https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png")
        setPrice("");document.body.style.overflow='unset';setOverlay(false);setUpdateMealPopUp(false)}} className="fa-solid fa-xmark"></i></div>  
        <h2 style={{margin:'20px 0'}}>Photo</h2>
        {!previewUrl2 && <img onClick={handleImageClick2} style={{padding:'2px', cursor: 'pointer',border:error1? '2px dashed red':'2px dashed #ccc', borderRadius: '10px'}} width='120' src={src2} alt="Click to upload"/>}
        <input
            type="file"
            ref={fileInputRef2}
            onChange={handleFileChange2}
            style={{ display: 'none' }}
        />            
        {previewUrl2 && <img onClick={handleImageClick2} src={previewUrl2} alt="Preview" width="120" style={{padding:'2px', cursor: 'pointer',border: '2px dashed #ccc', borderRadius: '10px'}} />}
        <div id='hama'>
          <div style={{width:'100%',marginRight:'20px'}}>
              <label>Name</label>
              <input value={mealName} onChange={handleMealNameChange} style={{border:error2? '2px dashed red':'#fb9300',width:'100%'}} placeholder='Type here...' type='text'/>
          </div>
          <div style={{width:'100%'}}>
              <label>Category</label><br/>
              <select style={{ width: '100%', padding: '10px',border:error3? '2px dashed red':'#fb9300' }} value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value);

              if(e.target.value==="")
              {
                  setError3(true)
              }else{
                  setError3(false)
              }
              }}>
                <option value="">Choose an option...</option>
                {categories && categories.map((elm, index) => (
                  <option key={index} value={elm.id}>{elm.name}</option>
                ))}
              </select>
          </div>
        </div>
        <div id='haha'>
          <div style={{width:'100%',marginRight:'20px'}}>
              <label>Ingredients</label>
              <input value={ingredients} style={{border:error4? '2px dashed red':'#fb9300'}} onChange={handleIngredientsChange} placeholder='Type here...' type='text'/>
          </div>
          <div style={{width:'100%'}}>
              <label>Price ($)</label>
              <input value={price} onChange={handlePriceChange} style={{border:error5? '2px dashed red':'#fb9300'}} placeholder='Type here...' type='number'/>
          </div>
        </div>
        <div className='kolo'><span onClick={()=>updateMeal()} >Update</span></div>
      </div>}



      

{success6 && <p ref={message6} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>A new ticket successfully created!</p>}


{success7 && <p ref={message7} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Success!</p>}
      
      {success2 && <p ref={message3} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Meal successfully added to your menu!!</p>}
      {success3 && <p ref={message4} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Meal successfully updated to your menu!!</p>}


      {success5 && <p ref={message5} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Meal successfully deleted!!</p>}

      {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Changes are successfully saved!</p>}
      {fail && <p ref={message2} className='message' style={{textAlign:'center',zIndex:'50000',position:'fixed',top:'0',width:'100%',backgroundColor:'rgba(255,0,0,0.5)',border:'1px solid red'}}>Changes were not successfully saved!</p>}
      <div ref={menu} id='mn'>
            <img width='150' style={{margin:'0 20px 20px 20px'}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
            <i onClick={handleClick2} className="closed fa-solid fa-xmark"></i>
            <div style={{display:'flex',width:'70%',marginTop:'30px',justifyContent:'space-around',alignItems:'center'}}>
                <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover'}} src={src} alt="logo"/>
                <div>
                    <p>{nameee}</p>
                    <span id='profile' onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(false);setTickets(false);setComments(false);setProfile(true);setMeals(false);}}>Edit profile</span>
                </div>
            </div>
            <div id='links' style={{width:'100%',textAlign:'left',fontSize:'1.3em',display:'flex',flexDirection:'column'}}>
                <p onClick={()=>{setAnalytics(true);setOrder(false);setCredentials(false);setTickets(false);setComments(false);setProfile(false);setMeals(false);}} style={{marginTop:'50px',display:'flex',alignItems:'center',width:'100%',backgroundColor:analytics?'#ffecd1':"",color:analytics?"#fb9300":""}}><i className="fa-solid fa-chart-simple"></i> Analytics</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:order?'#ffecd1':"",color:order?"#fb9300":""}} onClick={()=>{setAnalytics(false);setOrder(true);setCredentials(false);setTickets(false);setComments(false);setProfile(false);setMeals(false);}}><i className="fa-solid fa-clipboard-list"></i> Order</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:meals?'#ffecd1':"",color:meals?"#fb9300":""}} onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(false);setTickets(false);setComments(false);setProfile(false);setMeals(true);}}><i className="fa-solid fa-bars"></i> Menu</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:comments?'#ffecd1':"",color:comments?"#fb9300":""}} onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(false);setTickets(false);setComments(true);setProfile(false);setMeals(false);}}><i className="fa-solid fa-comment"></i> Comments</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:tickets?'#ffecd1':"",color:tickets?"#fb9300":""}} onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(false);setTickets(true);setComments(false);setProfile(false);setMeals(false);}}><i className="fa-solid fa-ticket"></i> Support</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:credentials?'#ffecd1':"",color:credentials?"#fb9300":""}} onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(true);setTickets(false);setComments(false);setProfile(false);setMeals(false);}}><i className="fa-solid fa-key"></i>  Credentials</p>
                <Link to="/"><p onClick={()=>{
                                  if(Cookies.get('stayLogged')){
                                      Cookies.remove('stayLogged');
                                  }
                                }}><i className="fa-solid fa-right-from-bracket"></i> Sign out</p></Link>
            </div>
      </div>
      <div id='jk'>
        {profile && <div>
            <h2 className='gh'>Restaurant Profile</h2>
            <div id='gf'>
                <div id='loo'>
                    <h3>General</h3>
                    <h5 style={{margin:'20px 0'}}>Logo</h5>
                    {!previewUrl && <img onClick={handleImageClick} style={{padding:'2px', cursor: 'pointer',border: '2px dashed #ccc', borderRadius: '10px'}} width='120' src={src} alt="Click to upload"/>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {previewUrl && <img onClick={handleImageClick} src={previewUrl} alt="Preview" width="120" style={{padding:'2px', cursor: 'pointer',border: '2px dashed #ccc', borderRadius: '10px'}} />}
                    <h5 style={{margin:'10px 0'}}>Name</h5>
                    <input value={name} onChange={handleNameChange} type="text"/>
                      <h5 style={{margin:'10px 0'}}>Phone</h5>
                    <input value={phone} onChange={handlePhoneChange} type="text"/>
                    <h5 style={{margin:'10px 0'}}>Location</h5>
                    <SelectLocationMap
                position={position}
                setPosition={setPosition}
                addressInput={addressInput}
                setAddressInput={setAddressInput}
              />
                    <input type="submit" onClick={saveChanges} style={{color:'white',boxShadow:'0 0 5px #fb9300',cursor:'pointer',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none'}} value='Save Changes'/>
                </div>
                <div id='io'>
                    <h3>Service</h3>
                    <h5 style={{margin:'10px 0'}}>Service Time Starts</h5>
                    <input value={time} onChange={handleTimeChange} type="time"/>
                    <h5 style={{margin:'10px 0'}}>Service Time Ends</h5>
                    <input value={time2} onChange={handleTimeChange2} type="time"/>
                    <h5 style={{margin:'10px 0'}}>Restaurant distance range ({range} km)</h5>
                    <input style={{margin:'0px 0 10px'}} value={range} onChange={handleRangeChange} type="range" min="0" max="100" className="slider" id="myRange"/>
                    <input onClick={saveChanges2} type="submit" style={{color:'white',boxShadow:'0 0 5px #fb9300',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none',cursor:'pointer'}} value='Save Changes'/>
                </div>
            </div>
        </div>}

        {meals && <div>
            <h2 className='gh'>Organize Menu</h2>
            <div onClick={showAddMealPopUp} id='add'>Add A Meal <i style={{padding:'3px',borderRadius:'2px',backgroundColor:'#fb9300',color:'white'}} className="fa-solid fa-plus"></i></div>
            <div id='fg'>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>Meal</td>
                    <td className='hii' style={{ borderBottom: '1px solid #ddd' }}>Ingredients</td>
                    <td className='hii' style={{ borderBottom: '1px solid #ddd' }}>Category</td>
                    <td className='hii' style={{ borderBottom: '1px solid #ddd' }}>Price</td>
                    <td style={{ borderBottom: '1px solid #ddd' }}></td>
                </tr>
                </thead>
                <tbody>
                
                  {meals2 && meals2.map((elm,index) => (
                    <tr key={elm.id} style={{ backgroundColor: '#fff' }}>
                      <td style={{display:'flex',alignItems:'center',padding: '40px 20px' }}><img width='100' height='100' style={{borderRadius:'50%',objectFit:'cover',marginRight:'10px'}} src={`https://soc-net.info/foody/${elm.photo}`} alt={`meal${index+1}`}/> {elm.name}</td>
                      <td className='hii'>{elm.ingredients.split(" ").join(",")}</td>
                      <td className='hii'><span style={{padding:'5px 25px',borderRadius:'15px',backgroundColor: categories[parseInt(elm.category)-1]?.color }}>{categories[parseInt(elm.category)-1]?.name}</span></td>
                      <td className='hii'>${elm.price}</td>
                      <td>
                        <i
                          onClick={()=>showUpdateMealPopUp(index)}
                          style={{ cursor:'pointer',marginRight: '10px', display: 'inline-block', color: '#00aec8' }}
                          className="fa-solid fa-pen-to-square"
                        ></i>
                        <i
                          onClick={()=>{deleteMeal(elm.id)}}
                          style={{ color: 'red',cursor:'pointer' }}
                          className="fa-solid fa-trash"
                        ></i>
                      </td>
                    </tr>
                  ))}

                </tbody>
               </table>
            </div>
        </div>}

        {comments && <div>
            <h2 className='gh'>Reply comments</h2>
            <div id='pol'>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td className='comment' style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>Related Order ID</td>
                    <td className='comment' style={{padding:'40px 20px', borderBottom: '1px solid #ddd' }}>From</td>
                    <td style={{padding:'40px 20px', borderBottom: '1px solid #ddd' }}>Comment</td>
                    <td className='comment' style={{padding:'40px 20px', borderBottom: '1px solid #ddd' }}>Status</td>
                    <td style={{padding:'40px 20px', borderBottom: '1px solid #ddd' }}></td>
                </tr>
                </thead>
                <tbody>
                {commentsOnMeals && commentsOnMeals.map((elm,index)=>(
                    <tr key={index} style={{backgroundColor:'#fff',padding:'10px'}}>
                      <td className='comment' style={{padding:'40px 20px'}}>#{elm.comment.id_order}</td>
                      <td className='comment' style={{padding:'40px 20px'}}>{elm.user.name}</td>
                      <td style={{padding:'40px 20px'}}>{elm.commentcontent[0].comment}</td>
                      {elm.comment.repliedByRes==1?<td className='comment' style={{padding:'40px 20px',color:'green'}}>Replied</td>:<td className='comment' style={{padding:'40px 20px',color:'red'}}>Not replied</td>}
                      
                      <td onClick={()=>{showPopUpReply(index,elm.comment.id,elm.user.name,elm.commentcontent[0].comment,elm.user.photo,elm.commentcontent[0].dateComment)}} style={{padding:'40px 20px',cursor:'pointer'}}><i className="fa-solid fa-comment"></i></td>
                    </tr>
                ))}
                
                </tbody>
               </table>
            </div>
        </div>}

{tickets && <div>
  
            <h2 className='gh'>Tickets</h2>
            <div onClick={showAddTicketPopUp} id='add'>Create A Ticket <i style={{padding:'3px',borderRadius:'2px',backgroundColor:'#fb9300',color:'white'}} className="fa-solid fa-plus"></i></div>
            <div id='ooo'>
              {ticketsMessages && ticketsMessages.map((elm,index)=>(
                  <div key={elm.info.id} className='gj' style={{backgroundColor:elm.stateTicket==='Closed'?'#9cffcc':elm.stateTicket==='Pending'?'#ffecd1':'#bdf6ff'}}>
                    <div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{fontWeight:'500',fontSize:'1.7em',}}>Ticket #{elm.info.id}</span>
                        <span>{elm.stateTicket}</span>
                    </div>
                    <div style={{color:'#999',fontSize:'0.8em'}}>
                        <i style={{fontSize:'0.8em'}} className="fa-solid fa-circle-xmark"></i>{' '}
{new Date(elm.dateTicket).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}).replace(', ', ',')}
                    </div>
                    </div>
                    <div>{elm.info.content && elm.info.content.length > 60 
                    ? elm.info.content.substr(0, 50) + "..." 
                    : elm.info.content}</div>
                    {(elm.stateTicket !=='Closed') && <div onClick={()=>closeTicket(elm.info.id_ticket)} style={{padding:'5px 10px',cursor:'pointer',borderRadius:'7px',position:'absolute',color:elm.stateTicket==='Closed'?'#00a650':elm.stateTicket==='Pending'?'#fb9300':'#00aec8',left:'0px',bottom:'15px',textAlign:'right'}}>Close this ticket</div>}
                    <div onClick={()=>showTicketMessages(elm.info.id_ticket)} style={{padding:'5px 25px',cursor:'pointer',borderRadius:'7px',backgroundColor:elm.stateTicket==='Closed'?'#00a650':elm.stateTicket==='Pending'?'#fb9300':'#00aec8',position:'absolute',color:'#fff',right:'15px',bottom:'15px',textAlign:'right'}}>Show</div>
               </div>

              ))}
                              
            </div>
        </div>}

        {credentials && <div>
            <h2 className='gh'>User Credentials</h2>
            <div style={{display:'flex'}}>
                <div id='gd'>
                    <h5 style={{margin:'10px 0'}}>Current Password</h5>
                    <input value={password} onChange={handlePasswordChange} placeholder='Type old password here...' type="password"/>
                    <h5 style={{margin:'10px 0'}}>New Email</h5>
                    <input style={{border:errorEmail?"1px solid red":""}} value={email} onChange={handleEmailChange} placeholder='Type here...' type="email"/>
                    <h5 style={{margin:'10px 0'}}>New Password</h5>
                    <input value={newPassword} onChange={handleNewPasswordChange} placeholder='Type new password here...' style={{margin:'0px 0 20px 0px'}} type="password"/>
                    <input onClick={handleUpdate} type="submit" style={{color:'white',boxShadow:'0 0 5px #fb9300',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none'}} value='Update credentials'/>
                </div>
            </div>
        </div>}

        {order && <div>
            <h2 className='gh'>Manage Orders</h2>
            <div id='ord'>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td className='fr'>Order ID</td>
                    <td className='fr'>From</td>
                    <td style={{padding:'20px', borderBottom: '1px solid #ddd' }}>Meals</td>
                    <td className='fr'>Price</td>
                    <td style={{padding:'20px', borderBottom: '1px solid #ddd' }}>Status</td>
                    <td className='fr'>Date</td>
                    <td className='fr'></td>
                </tr>
                </thead>
                <tbody>
                  {orders && orders.map((elm,index) => (
                    <tr key={elm.order.order_id} style={{ backgroundColor: '#fff' }}>
                      <td className='fra'>#{elm.order.order_id}</td>
                      <td id='ch'>{elm.customer?.name}</td>
                      <td >{elm.order.meal_names}</td>
                      <td className='fra'>${elm.order.total_amount}</td>
                      <td ><span style={{padding:'5px',borderRadius:'15px',color:'white',backgroundColor:(elm.order.status=="Ready" || elm.order.status=='Delivered')?"green":elm.order.status=='Pending'?'#02aec7':elm.order.status=='Rejected'?"red":elm.order.status=='Active'?"green":'#f5b253'}}>{elm.order.status}</span></td>
                      <td className='fra'>
                        {new Date(elm.order.dateOrder.replace(' ', 'T')).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')}
                      </td>
                      <td>{(elm.order.status!=='Delivered' && elm.order.status!=='Rejected')  && <i style={{padding: '10px 10px',color:'#02aec7',cursor:'pointer'}} className="fa-solid fa-pen-to-square" onClick={()=>changeOrderStatus(elm.order.order_id,elm.order.status,elm.customer?.id)}></i> }</td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>
        </div>}


        {analytics && <div>
            <h2 className='gh'>Analytics</h2>
            <div id='ak'>
               <div id='dio'>
                    <div style={{}}>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-dollar-sign"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Earned Money</span>
                            <span style={{fontSize:'1.9em'}}>${totalEarnedMoney==null?'0':totalEarnedMoney}</span>
                        </div>
                    </div>
                    <div style={{}}>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-shop"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Orders</span>
                            <span style={{fontSize:'1.9em'}}>{total_orders}</span>
                        </div>
                    </div>
                    <div style={{}}>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}} className="fa-solid fa-user"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Unique Customer</span>
                            <span style={{fontSize:'1.9em'}}>{total_unique_customers}</span>
                        </div>
                    </div>
               </div>
               <div id='lapa'>
                   <div id='kakp'>
                        <h3>Order Graph</h3>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                    <div id='klp'>
                        <h3>Best Seller Meals</h3>
                        <div style={{textAlign:'center'}}>
                        <canvas ref={canvasRef2}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>}

        
      </div>
    </div>
  )
}

export default ResDash
