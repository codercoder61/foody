import React , {useEffect,useState,useRef} from 'react'
import './AddAddress.css'
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



function AddAddressCus() {
    //const [location, setLocation] = useState(null);
    const navigate = useNavigate();
const [position, setPosition] = useState(null);
const [addressInput, setAddressInput] = useState("");

    const [error2, setError2] = useState(null);
    const [address,setAddress] = useState("")
    const [latitude,setLatitude]=useState("")
    const [longitude,setLongitude]=useState("")
useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
   
    if (!auth || localStorage.getItem('authId')) {
      navigate('/');
    }
  }, []); // <-- include navigate in dependencies
    useEffect(() => {
    // Get user's coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude)
          setLongitude(longitude)
          // Reverse geocoding using Nominatim (OpenStreetMap)
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=79f59e686d9c4881b2478ba24e3b1416`)
            .then(res => res.json())
            .then(data => 
                setAddress(data.results[0].components.suburb+" "+data.results[0].components.road+" "+data.results[0].components.city+" "+data.results[0].components.county+" "+data.results[0].components.region+" "+ data.results[0].components.state_district)        
            );

        }
      );
    }
  }, []);

  
    const [error,setError] = useState(true)
    const handleAddressChange = (e) =>{
        setAddress(e.target.value)
    }
   
  return (
    <div id='main'>
      <header>
        <img width='150' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
        <Link to='/'><span><i className="fa-solid fa-right-to-bracket"></i> Login</span></Link>
      </header>
      <main id='mainn'>
        <div>
            <div style={{textAlign:'center'}}>
            <h1>Step 3:</h1>
            <p style={{fontSize: '1.2em',fontWeight: 'unset',marginBottom:'50px'}}>One last step left</p>
            </div>
            <div style={{ padding: "20px",width:'100%' }}>
  <label>Enter Your address:</label>
             <SelectLocationMap
  position={position}
  setPosition={setPosition}
  addressInput={addressInput}
  setAddressInput={setAddressInput}
/>
            </div>
            <button
  style={{ color: 'white', backgroundColor: '#fb9300', outline: 'none', border: 'none', padding: '10px 5px', fontSize: '1.3em', cursor: 'pointer' }}
  onClick={async () => {
    if (!position || !addressInput) {
      alert("Please select a location from the map or search.");
      return;
    }
      const email = localStorage.getItem('customerEmail')
    const payload = {
      lat: position.lat,
      lng: position.lng,
      address: addressInput,
      id:parseInt(localStorage.getItem('id')),
      email:email
    };

    //payload)

    try {
      const response = await fetch("https://soc-net.info/foody/updateCustomerAddress.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status==1) {
        //"Location saved!");
        localStorage.setItem('authId',localStorage.getItem('id'))
        localStorage.setItem('auth', JSON.stringify(true));
        navigate(`/cusdash/${localStorage.getItem('id')}`);
      } else {
        alert("Error saving location");
      }
      
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not connect to the server.");
    }
  }}
>
  Save Location
</button>
        </div>
      </main>
    </div>
  )
}
//            {location ? <p>Address: {location}</p> : <p>Getting location...</p>}*/

export default AddAddressCus
