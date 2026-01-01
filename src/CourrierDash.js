import React ,{useState,useRef,useEffect }from 'react'
import './CourrierDash.css'
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SimpleMap from './SimpleMap';
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
function CourrierDash() {
  function formatDateDifference(fromDate, toDate = new Date()) {
  const msInDay = 1000 * 60 * 60 * 24;

  let start = new Date(fromDate);
  let end = new Date(toDate);

  // Ensure correct order
  if (start > end) [start, end] = [end, start];

  const totalDays = Math.floor((end - start) / msInDay);
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  let parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);

  return parts.join(', ');
}


  const [position, setPosition] = useState(null);
              const [addressInput, setAddressInput] = useState("");
    const [uniqId,setUniqId] = useState('')
    const [total_orders_per_restaurant,settotal_orders_per_restaurant] = useState(null)
    const [ordersPerMonth,setOrdersPerMonth] = useState(null)
    const navigate = useNavigate();

  const { id } = useParams();
  useEffect(()=>{
        if(localStorage.getItem('authId')!=id){
          navigate('/')
        }
      },[])
    const message = useRef(null)
    const message2 = useRef(null)
    const message6 = useRef(null)
    const message7 = useRef(null)
    const [time, setTime] = useState("");
    const [ticketId,setTicketId] = useState(null)
    const [delivery, setDelivery] = useState(false);
    const [errorTicket, setErrorTicket] = useState(false);
    const [messageTicket,setMessageTicket] = useState('')
    const [messagesTickets,setMessagesTickets] = useState(false)
    const [messages,setMessages] = useState(false)
         const [fileName, setFileName] = useState("Click to upload a file")
            const handleFileChange3 = (e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name)
            };


    const [newOrders,setNewOrders] = useState([])
    const [ready,setReady] = useState([])
    const [active,setActive] = useState([])
    const [delivered,setDelivered] = useState([])


    const [newOrdersFlag,setNewOrdersFlag] = useState(true)
    const [readyFlag,setReadyFlag] = useState(false)
    const [activeFlag,setActiveFlag] = useState(false)
    const [deliveredFlag,setDeliveredFlag] = useState(false)












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
          id:uniqId
        };
        //payload)
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
          getTicketMessages(payload.id)
          setMessageTicket('')
          elm.scrollTop=elm.scrollHeight
       
        } catch (error) {
          console.error("Upload error:", error);
        }
    }
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // in kilometers
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

    const getTicketMessages = async (ticketId)=>{
      const payload = {
          ticketId: ticketId
        };
        try {
          const res = await fetch("https://soc-net.info/foody/getTicketMessages2.php", {
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

      const [openMapIndex, setOpenMapIndex] = useState(null); // index or id
      const [openMapIndex2, setOpenMapIndex2] = useState(null); // index or id


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
    
    
    const showAddTicketPopUp = ()=>{
      setOverlay(true)
      setAddTicketPopUp(true)
      document.body.style.overflow='hidden';
      setMessageTicket('')
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
  //payload)
  if(!errorEmail && password!=="" && newPassword!==""){
  try {
    const res = await fetch("https://soc-net.info/foody/updateCourrierInfo3.php", {
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
    
    
const handleAddressChange = (e)=>{
    setLocation(e.target.value)
}

   

const fetchTickets = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getTickets.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uniqId })
    });
    //uniqId)
    const data = await response.json();
    //data)
    setTicketsMessages(data.tickets)
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};


const pickUp = async (orderId,customerId,restoName) => {
  try {
    const response = await fetch("https://soc-net.info/foody/pickUpOrder.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId:customerId,restoName:restoName,courrierId:id,id: orderId,name:name+" "+surname })
    });

    //orderId)

    const data = await response.json();
    //data)
    fetchOrders()
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

const markAsDelivered = async (orderId,customerId,restoName) => {
  try {
    const response = await fetch("https://soc-net.info/foody/markAsDelivered.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId:customerId,restoName:restoName,id: orderId })
    });

    const data = await response.json();
    //data)
    fetchOrders()
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

  useEffect(()=>{
    fetchTickets()
  },[uniqId])
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

  function donut(data) {
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
    labels.push(element.restoInfo.restaurantName);
    num_orders.push(element.total_orders);
  });

  // Generate dynamic colors array
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
        label: 'Orders per Restaurant',
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
    donut(total_orders_per_restaurant)
  }, [total_orders_per_restaurant,analytics]); // ← re-run when `analytics` changes

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
      const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("id", id);

    try {
      const res = await fetch("https://soc-net.info/foody/updateCourrierInfo.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      //(result);
      if(result.status===1){
        setSuccess(true)
            message.current && message.current.classList.remove("message");
            message.current && void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    }


   

    const saveChanges2 = async () => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("range", range);
  formData.append("location", addressInput);
  formData.append("id", id)
  formData.append("lat", position.lat)
  formData.append("lng", position.lng)

  try {
    const res = await fetch("https://soc-net.info/foody/updateCourrierInfo2.php", {
                    method: 'POST',
                    body: formData
    });

    const result = await res.json(); // assuming backend echoes JSON

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
    const [surname,setSurName] = useState('')
    const handleSurnameChange = (e)=>{
        setSurName(e.target.value)
    }
  const fetchData= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/getCourrier.php", {
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
        setName(result.userData.name)
        setUniqId(result.userData.courrierId)
        setAddressInput(result.userData.address)
        const latRes = result.userData.latitude 
        const lngRes = result.userData.longitude 
        setPosition({
          lat:latRes,lng:lngRes
        })
        setRange(result.userData.serviceRange)
        setEmail(result.userData.email)
        setSurName(result.userData.surname)
        setFileName(result.userData.driverLicence.replace("drivingLicences/", ""))
        if(result.userData.photo!==null)
          setSrc(`https://soc-net.info/foody/${result.userData.photo}`)
      } catch (error) {
        console.error("Error:", error);
      }
    }

function filterCustomersInCourierRange(customers, courier) {
  return customers.filter(customer => {
    const distance = getDistanceKm(
      courier.latitude,
      courier.longitude,
      customer.latitude,
      customer.longitude
    );
    return distance <= courier.serviceRange;
  });
}
  function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isOrderInCourierRange(orderObj, position, range) {
  if (!position || position.lat == null || position.lng == null) {
    return false;
  }

  const distanceToRestaurant = getDistanceKm(
    position.lat,
    position.lng,
    orderObj.restaurant.latitude,
    orderObj.restaurant.longitude
  );

  const distanceToCustomer = getDistanceKm(
    position.lat,
    position.lng,
    orderObj.customer.latitude,
    orderObj.customer.longitude
  );

  return (
    distanceToRestaurant <= range &&
    distanceToCustomer <= range
  );
}
const fetchOrders = async () => {
  try {
    const response = await fetch(
      "https://soc-net.info/foody/getOrdersCour.php",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    const cookingOrders = position
      ? result.orders.filter(elm =>
          elm.order.courrier === null &&
          ["Cooking", "Pending"].includes(elm.order.status) &&
          isOrderInCourierRange(elm, position, range)
        )
      : [];

    setNewOrders(cookingOrders);

    const deliveredOrders = result.orders.filter(
      elm => elm.order.courrierId == id && elm.order.status === "Delivered"
    );
    setDelivered(deliveredOrders);

    const readyOrders = result.orders.filter(
      elm => elm.order.status === "Ready"
    );
    setReady(readyOrders);

    const activeOrders = result.orders.filter(
      elm => elm.order.courrierId == id && elm.order.status === "Active"
    );
    setActive(activeOrders);

  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

    const [days,setDays] = useState(null)
    const [numOrders,setNumOrders] = useState(null)
    const getStats= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/statsCourrier.php", {
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
        setDays(result.days)
        setNumOrders(result.number_orders)
       settotal_orders_per_restaurant(result.total_orders_per_restaurant)
        setOrdersPerMonth(result.orders_per_month)
      } catch (error) {
        console.error("Error:", error);
      }
    }

    useEffect(()=>{
        fetchData()
      if (position) {
        fetchOrders()
      }
        getStats()
    },[position, range])
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
      {overlay && <div className='overlay'></div>}
      {addTicket && <div className='addticketpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Create a ticket</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setAddTicketPopUp(false)}} className="fa-solid fa-xmark"></i></div>  
        <h2 style={{margin:'20px 0'}}>Message</h2>
        <textarea value={messageTicket} onChange={handleMessageChange} placeholder='Type here...' style={{marginBottom:'70px',border:errorTicket?"1px solid red":"1px solid #fb9300",outline:'none',fontSize:'1.3em',padding:'10px',width:'100%',height:'30%'}}></textarea>
        <div style={{marginTop:'20px'}}><span onClick={createTicket} style={{cursor:'pointer',position:'absolute',bottom:'50px',right:'50px',color:'white',backgroundColor:'#fb9300',padding:'10px 20px'}}>Create</span></div>
      </div>}
      {messagesTickets && <div className='addticketpopup'>
      <div style={{display:'flex',justifyContent:'space-between'}}><h1>Ticket messages</h1><i style={{cursor:'pointer',fontSize:'1.2em'}} onClick={()=>{document.body.style.overflow='unset';setOverlay(false);setMessagesTickets(false)}} className="fa-solid fa-xmark"></i></div> 
        <div id='lala' style={{height:'50%',overflowY:'scroll'}}>
        {messages && messages.map((elm,index)=>(
          <div key={index}  style={{wordBreak:'break-word',display:'flex',fontSize:'0.8em'}}>
          <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover',margin:'0px 20px 20px 0'}} src={elm.info.isAdmin==0?elm.userInfo.photo ?`https://soc-net.info/foody/${elm.userInfo.photo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png':"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=64,f=auto,dpr=1,fit=contain/f1646061270754x888289544466858600/Component%203%20%282%29%20%281%29.png"} alt={`${index}`} />
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
        <div className='kolo' style={{marginTop:'30px'}}><span onClick={addMessageToTicket}>Send</span></div>
      </div>}
{success6 && <p ref={message6} className='message' style={{textAlign:'center',zIndex:'10005',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>A new ticket successfully created!</p>}
{success7 && <p ref={message7} className='message' style={{textAlign:'center',zIndex:'10005',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Success!</p>}
      {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'10005',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Changes are successfully saved!</p>}
      {fail && <p ref={message2} className='message' style={{textAlign:'center',zIndex:'10005',position:'fixed',top:'0',width:'100%',backgroundColor:'rgba(255,0,0,0.5)',border:'1px solid red'}}>Changes were not successfully saved!</p>}
      <div ref={menu} id='slam'>
            <img width='150' style={{margin:'0 20px 20px 20px'}} src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
            <i onClick={handleClick2} className="closed fa-solid fa-xmark"></i>
            <div style={{display:'flex',width:'70%',justifyContent:'space-around',alignItems:'center'}}>
                <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover'}} src={src} alt="logo"/>
                <div>
                    <p style={{fontSize:'0.7em'}}>{name} {surname}</p>
                    <span id='profile' onClick={()=>{setAnalytics(false);setOrder(false);setCredentials(false);setTickets(false);setProfile(true);setDelivery(false);}}>Edit profile</span>
                </div>
            </div>
            <div id='links' style={{width:'100%',textAlign:'left',fontSize:'1.3em',display:'flex',flexDirection:'column'}}>
               
                <p onClick={()=>{setAnalytics(true);setDelivery(false);setCredentials(false);setTickets(false);setProfile(false);}} style={{marginTop:'50px',display:'flex',alignItems:'center',width:'100%',backgroundColor:analytics?'#ffecd1':"",color:analytics?"#fb9300":""}}><i className="fa-solid fa-chart-simple"></i> Analytics</p>
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:delivery?'#ffecd1':"",color:order?"#fb9300":""}} onClick={()=>{setAnalytics(false);setDelivery(true);setCredentials(false);setTickets(false);setProfile(false);}}><i className="fa-solid fa-clipboard-list"></i> Delivery</p>
               
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:tickets?'#ffecd1':"",color:meals?"#fb9300":""}} onClick={()=>{setAnalytics(false);setDelivery(false);setCredentials(false);setTickets(true);setProfile(false);}}><i className="fa-solid fa-bars"></i> Support</p>
                
                
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:credentials?'#ffecd1':"",color:credentials?"#fb9300":""}} onClick={()=>{setAnalytics(false);setDelivery(false);setCredentials(true);setTickets(false);setProfile(false);}}><i className="fa-solid fa-key"></i>  Credentials</p>
               
                <Link to="/"><p onClick={()=>{
                                  if(Cookies.get('stayLogged')){
                                      Cookies.remove('stayLogged');
                                  }
                                }}><i className="fa-solid fa-right-from-bracket"></i> Sign out</p></Link>
            </div>
      </div>
      <div id='yui'>
        {profile && <div>
            <h2 className='gh'>Courier Profile</h2>
            <div id='ff'>
                <div id='gen'>
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
                    <h5 style={{margin:'10px 0'}}>Surname</h5>
                    <input value={surname} onChange={handleSurnameChange} style={{margin:'0px 0 10px 0px'}} type="text"/>
                    <input type="submit" onClick={saveChanges} style={{color:'white',boxShadow:'0 0 5px #fb9300',cursor:'pointer',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none'}} value='Save Changes'/>
                </div>
                <div id='jjj'>
                    <h3>Service</h3>
                    <h5 style={{margin:'10px 0'}}>Driver License</h5>
                    <label htmlFor="file-upload" className="customs-file-upload">
                    {fileName}
                    </label>
                    <input name='file' onChange={handleFileChange3} id="file-upload" type="file" /><br/><br/>
                    <input type='file'/>
                    <h5 style={{margin:'10px 0'}}>Address</h5>
                    <SelectLocationMap
                      position={position}
                      setPosition={setPosition}
                      addressInput={addressInput}
                      setAddressInput={setAddressInput}
                    />
                    
                    <h5 style={{margin:'10px 0'}}>Service Range ({range} km)</h5>
                    <input style={{margin:'0px 0 10px'}} value={range} onChange={handleRangeChange} type="range" min="0" max="100" className="slider" id="myRange"/>
                    <input onClick={saveChanges2} type="submit" style={{color:'white',boxShadow:'0 0 5px #fb9300',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none',cursor:'pointer'}} value='Save Changes'/>
                </div>
            </div>
        </div>}

       

        

            {tickets && <div>
  
            <h2 className='gh'>Tickets</h2>
            <div onClick={showAddTicketPopUp} id='add'>Create A Ticket <i style={{padding:'3px',borderRadius:'2px',backgroundColor:'#fb9300',color:'white'}} className="fa-solid fa-plus"></i></div>
            <div id='man'>
              {ticketsMessages && ticketsMessages.map((elm,index)=>(
                  <div key={elm.info.id} className='gj' style={{backgroundColor:elm.stateTicket==='Closed'?'#9cffcc':elm.stateTicket==='Pending'?'#ffecd1':'#bdf6ff',}}>
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
                <div id='fran'>
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

       


        {analytics && <div>
            <h2 className='gh'>Analytics</h2>
            <div id='jj'>
               <div id='haj'>
                    <div className='abc'>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-dollar-sign"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Earned Money</span>
                            <span style={{fontSize:'1.9em'}}>${numOrders*10}</span>
                        </div>
                    </div>
                    <div className='abc' >
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-shop"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Orders</span>
                            <span style={{fontSize:'1.9em'}}>{numOrders}</span>
                        </div> 
                    </div>
                    <div className='abc'>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}} className="fa-solid fa-suitcase"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Worked Days</span>
                            <span style={{fontSize:'1.9em'}}>{days}</span>
                        </div>
                    </div>
               </div>
               <div id='fla'>
                    <div id='ko'>
                        <h3>Order Graph</h3>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                    <div id='kll'>
                        <h3>Restaurants That You Get Most Orders</h3>
                        <div style={{textAlign:'center'}}>
                        <canvas ref={canvasRef2}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>}


          {delivery && <div>
            <h2 className='gh'>New Orders</h2>
            <div id='hfg'>
              <div className='orde'>
                <span onClick={()=>{setActiveFlag(false);setNewOrdersFlag(true);setDeliveredFlag(false);setReadyFlag(false);}} className='span'>New ({newOrders.length})</span>
                <span onClick={()=>{setActiveFlag(false);setNewOrdersFlag(false);setDeliveredFlag(false);setReadyFlag(true);}} className='span'>Ready ({ready.length})</span>
                <span onClick={()=>{setActiveFlag(true);setNewOrdersFlag(false);setDeliveredFlag(false);setReadyFlag(false);}} className='span'>Active ({active.length})</span>
                <span onClick={()=>{setActiveFlag(false);setNewOrdersFlag(false);setDeliveredFlag(true);setReadyFlag(false);}} className='span'>Delivered ({delivered.length})</span>
              </div>
              <div style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
              {
  newOrdersFlag && (newOrders.length > 0 ? newOrders.map((elm, index) => {
    const difference = Math.floor((new Date() - new Date(elm.order.dateOrder)) / (1000 * 60 * 60 * 24));

    return (
      <div key={index} className='deli'>
        <div className='dl'>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.restaurant.restaurantName}</span>
          <span>{elm.restaurant.restaurantLocation}</span>
        </div>
        <div style={{textAlign:'center', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>Distance : {getDistanceFromLatLonInKm(elm.customer.latitude, elm.customer.longitude, elm.restaurant.latitude,elm.restaurant.longitude).toFixed(2)}km</span>
          <span>Delivery Fee : $10</span>
          <hr style={{backgroundColor:'#00aec8',margin:'15px 0',height:'5px',width:'100%'}}/>
          <span>Created: {formatDateDifference(elm.order.dateOrder)} ago</span>
          <span>ID: #{elm.order.order_id}</span>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.customer.name}</span>
          <span>{elm.customer.addresse}</span>
        </div>
      </div>
    );

  }) : <div className='fd'>
          <img src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"/>
          <p style={{fontWeight:'bold'}}>There are no data here yet</p>
          <p style={{color:'#aaa',fontSize:'1.3em'}}>Looks like there are no new things. Please visit again later.</p>
      </div>)
}

{
  readyFlag && (ready.length > 0 ? ready.map((elm, index) => {
    const difference = Math.floor((new Date() - new Date(elm.order.dateOrder)) / (1000 * 60 * 60 * 24));

    return (
      <div key={index} className='deli22'>
      <div key={index} className='dlll'>
      <div style={{ display: 'flex',justifyContent:'space-between',width:'100%', backgroundColor: 'white' }}>
        <div style={{ marginRight: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.restaurant.restaurantName}</span>
          <span>{elm.restaurant.restaurantLocation}</span>
        </div>
        <div style={{textAlign:'center', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>Distance : {getDistanceFromLatLonInKm(elm.customer.latitude, elm.customer.longitude, elm.restaurant.latitude,elm.restaurant.longitude).toFixed(2)}km</span>
          <span>Delivery Fee : $10</span>
          <hr style={{backgroundColor:'#00aec8',margin:'15px 0',height:'5px',width:'100%'}}/>
          <span>Created: {formatDateDifference(elm.order.dateOrder)} ago</span>
          <span>ID: #{elm.order.order_id}</span>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.customer.name}</span>
          <span>{elm.customer.addresse}</span>
        </div>
      </div>
      
      </div>
      <div className='fff'>
        <span  onClick={() =>
              setOpenMapIndex(openMapIndex === index ? null : index)
            } style={{cursor:'pointer',color:'#00aec8',cursor:'pointer'}}>
               {openMapIndex === index ? "Hide the restaurant on the map" : "Show the restaurant on the map"}</span>
        <span onClick={()=>{pickUp(elm.order.order_id,elm.customer.id,elm.restaurant.restaurantName)}} className='pickUp'>I picked up</span>
      </div>
       {openMapIndex === index && (
            <SimpleMap
              latitude={parseFloat(elm.restaurant.latitude)}
              longitude={parseFloat(elm.restaurant.longitude)}
            />
          )}
          
      </div>
    );
  }) : <div className='fd'>
          <img src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"/>
          <p style={{fontWeight:'bold'}}>There are no data here yet</p>
          <p style={{color:'#aaa',fontSize:'1.3em'}}>Looks like there are no new things. Please visit again later.</p>
      </div>)
}

{
  activeFlag && (active.length > 0 ? active.map((elm, index) => {
    const difference = Math.floor((new Date() - new Date(elm.order.dateOrder)) / (1000 * 60 * 60 * 24));

    return (
      <div key={index} className='deli22'>
      <div key={index} className='dlll'>
      <div style={{ display: 'flex',justifyContent:'space-between',width:'100%', backgroundColor: 'white' }}>
        <div style={{ marginRight: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.restaurant.restaurantName}</span>
          <span>{elm.restaurant.restaurantLocation}</span>
        </div>
        <div style={{textAlign:'center', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>Distance : {getDistanceFromLatLonInKm(elm.customer.latitude, elm.customer.longitude, elm.restaurant.latitude,elm.restaurant.longitude).toFixed(2)}km</span>
          <span>Delivery Fee : $10</span>
          <hr style={{backgroundColor:'#00aec8',margin:'15px 0',height:'5px',width:'100%'}}/>
          <span>Created: {formatDateDifference(elm.order.dateOrder)} ago</span>
          <span>ID: #{elm.order.order_id}</span>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.customer.name}</span>
          <span>{elm.customer.addresse}</span>
        </div>
      </div>
      
      </div>
      <div className='fff'>
        <span  onClick={() =>
              setOpenMapIndex2(openMapIndex2 === index ? null : index)
            } style={{color:'#00aec8',cursor:'pointer'}}> {openMapIndex2 === index ? "Hide the customer on the map" : "Show the customer on the map"}</span>
        <span onClick={()=>markAsDelivered(elm.order.order_id,elm.customer.id,elm.restaurant.restaurantName)} className='pickUpp'>Mark as delivered</span>
      </div>
      
       {openMapIndex2 === index && (
            <SimpleMap
              latitude={parseFloat(elm.customer.latitude)}
              longitude={parseFloat(elm.customer.longitude)}
            />
          )}
            
      </div>
    );
  }) : <div className='fd'>
          <img src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"/>
          <p style={{fontWeight:'bold'}}>There are no data here yet</p>
          <p style={{color:'#aaa',fontSize:'1.3em'}}>Looks like there are no new things. Please visit again later.</p>
      </div>)
}

  {
  deliveredFlag && (delivered.length > 0 ? delivered.map((elm, index) => {
    const difference = Math.floor((new Date() - new Date(elm.order.dateOrder)) / (1000 * 60 * 60 * 24));

    return (
      <div key={index} className='deli'>
        <div style={{ marginRight: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.restaurant.restaurantName}</span>
          <span>{elm.restaurant.restaurantLocation}</span>
        </div>
        <div style={{textAlign:'center', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>Distance : {getDistanceFromLatLonInKm(elm.customer.latitude, elm.customer.longitude, elm.restaurant.latitude,elm.restaurant.longitude).toFixed(2)}km</span>
          <span>Delivery Fee : $10</span>
          <hr style={{backgroundColor:'#00aec8',margin:'15px 0',height:'5px',width:'100%'}}/>
          <span>Created: {formatDateDifference(elm.order.dateOrder)} ago</span>
          <span>ID: #{elm.order.order_id}</span>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ color: 'red', fontSize: '3em' }} className="fa-solid fa-location-dot"></i>
          <span style={{color:'#bbb',fontSize:'1.3em'}}>{elm.customer.name}</span>
          <span>{elm.customer.addresse}</span>
        </div>
      </div>
    );

  }) : <div className='fd'>
          <img src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=384,h=384,f=auto,dpr=1,fit=contain/f1645091940786x269735977037557380/compressedcart.png"/>
          <p style={{fontWeight:'bold'}}>There are no data here yet</p>
          <p style={{color:'#aaa',fontSize:'1.3em'}}>Looks like there are no new things. Please visit again later.</p>
      </div>)
}
               </div>
            </div>
        </div>}

        
      </div>
    </div>
  )
}

export default CourrierDash
