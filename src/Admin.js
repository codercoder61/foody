import React ,{useState,useRef,useEffect }from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Admin() {
    const navigate = useNavigate();
  const menu = useRef(null)
  useEffect(()=>{
          if(localStorage.getItem('authId')){
            navigate('/')
          }
        },[])
    const message = useRef(null)
    const message2 = useRef(null)
    const message6 = useRef(null)
    const messageDelete = useRef(null)
    const message7 = useRef(null)
    const [time, setTime] = useState("");
function isValidPhoneNumber(phone) {
      const cleaned = phone.replace(/[\s()-]/g, ''); // Remove spaces, hyphens, parentheses
      const regex = /^\+?\d{10,15}$/; // Optional +, 10-15 digits
      return regex.test(cleaned);
    }

    const [ordersPerMonth,setOrdersPerMonth] = useState(null)
        
        const [userpermonth,setuserpermonth]=useState(null)

    const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }); // "Aug"
  const hours = date.getHours().toString().padStart(2, '0');       // "14"
  const minutes = date.getMinutes().toString().padStart(2, '0');   // "05"

  return `${day} ${month} ${hours}:${minutes}`;
};

    const [users, setUsers] = useState(false);
    const [usersInfo, setUsersInfo] = useState(null);

    const [order1, setOrder1] = useState(false);
    const [reports, setReports] = useState(false);
    const [settings, setSettings] = useState(false);


    const [restaurantsOwners, setRestaurantsOwners] = useState(false);

    const [courriers, setCourriers] = useState(false);

    const [customers, setCustomers] = useState(true);



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
          message: messageTicket
        };
        if(!errorTicket){
        try {
          const res = await fetch("https://soc-net.info/foody/createTicketAdmin.php", {
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
          id:ticketId
        };
        if(!errorTicket){
        try {
          const res = await fetch("https://soc-net.info/foody/addMessageToTicketAdmin.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const result = await res.json(); // assuming backend echoes JSON
          getTicketMessages(payload.id)
          fetchTickets()
          setMessageTicket('')
          elm.scrollTop=elm.scrollHeight
       
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
    const [error6,setError6] = useState(false)
    
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
    email: emailAdmin,
  };
  //payload)
  if(!errorEmail && password!=="" && newPassword!==""){
  try {
    const res = await fetch("https://soc-net.info/foody/updateAdminInfo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json(); // assuming backend echoes JSON
    //result);

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
    const response = await fetch("https://soc-net.info/foody/getAllTickets.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    //data)
    setTicketsMessages(data.tickets)
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

const [reportedComments,setReportedComments] = useState(null)
const fetchReportedComments = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getReportedComments.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    //data)
    setReportedComments(data.reportedComments)
    
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};
useEffect(()=>{
  fetchReportedComments()
},[])


const [allOrders,setAllOrders] = useState(null)

const fetchAllOrders = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getAllOrders.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    //data)
    setAllOrders(data.orders)
    setFilteredOrders(data.orders)
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getUsers.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    //console.log(data)
    setUsersInfo(data.users)
    
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

useEffect(()=>{
  fetchAllUsers()
},[])

const [admin,setAdmin] = useState(null)
const getAdminInfo = async () => {
  try {
    const response = await fetch("https://soc-net.info/foody/getAdminInfo.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    //data)
    setAdmin(data.adminInfo)
     setRange(data.adminInfo.appCommission)
      setRange2(data.adminInfo.courrierFee)
      setTwitterAdmin(data.adminInfo.twitter)
      setEmailAdmin(data.adminInfo.email)
      setFacebookAdmin(data.adminInfo.facebook)
      setPhoneAdmin(data.adminInfo.phone)
      setLinkedInAdmin(data.adminInfo.linkedin)
      setInstagramAdmin(data.adminInfo.instagram)
   
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

 
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


 useEffect(() => {
    // Only run when analytics is available AND canvas is mounted
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

    // Create new chart
    chartRef2.current = new Chart(ctx, {
      type: 'doughnut',
      data:{
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
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
  }, [analytics]); // ← re-run when `analytics` changes

 

    
    const [range,setRange] = useState(10)
    const [range2,setRange2] = useState(5)

   
    const [tickets,setTickets] = useState(false)
    const [ticketsMessages,setTicketsMessages] = useState(false)
    const [credentials,setCredentials] = useState(false)
    const [order,setOrder] = useState(false)
        const handleRangeChange = (e)=>{
            setRange(e.target.value)
        }
        const handleRangeChange2 = (e)=>{
            setRange2(e.target.value)
        }
    const [src,setSrc]=useState('https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png')
    const [src2,setSrc2]=useState('https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png')
    const saveChanges1 = async ()=>{
      
    try {
      const res = await fetch("https://soc-net.info/foody/updateAppCommissionInfo.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({range:range}),
    });

      const result = await res.json();
      //result);
      if(result.status===1){
        getAdminInfo()

    setRange(admin.appCommission)
            setSuccess(true)
            message.current && message.current.classList.remove("message");
            message.current && void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    }
    const [successDelete,setSuccessDelete]=useState(false)
 const deleteComment = async(id)=>{
  try {
      const res = await fetch("https://soc-net.info/foody/deleteComment.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:id}),
    });

      const result = await res.json();
      //result);
      if(result.status===1){
            fetchReportedComments()
            setSuccessDelete(true)
            messageDelete.current && messageDelete.current.classList.remove("message");
            messageDelete.current && void messageDelete.current.offsetWidth;
            messageDelete.current && messageDelete.current.classList.add("message");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
 }

   const saveChanges2 = async ()=>{
      
    try {
      const res = await fetch("https://soc-net.info/foody/updateCourrierCommissionInfo.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({range:range2}),
    });

      const result = await res.json();
      //result);
      if(result.status===1){
            getAdminInfo()
            setRange2(admin.courrierFee)
            setSuccess(true)
            message.current && message.current.classList.remove("message");
            message.current && void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    }
    const [emailAdmin,setEmailAdmin] = useState('')
    const handleEmailAdminChange = (e)=>{
      if(e.target.value==='' || !validateEmail(e.target.value)){
        setError1(true)
      }else{
        setError1(false)
      }
      setEmailAdmin(e.target.value)
    }
    const [facebookAdmin,setFacebookAdmin] = useState('')
    const handleFacebookAdminChange = (e)=>{
      if(e.target.value===''){
        setError2(true)
      }else{
        setError2(false)
      }
      setFacebookAdmin(e.target.value)
    }
    const [twitterAdmin,setTwitterAdmin] = useState('')
    const handleTwitterAdminChange = (e)=>{
      if(e.target.value===''){
        setError3(true)
      }else{
        setError3(false)
      }
      setTwitterAdmin(e.target.value)
    }
    const [phoneAdmin,setPhoneAdmin] = useState('')
    const handlePhoneAdminChange = (e)=>{
      if(e.target.value==='' || !isValidPhoneNumber(e.target.value)){
        setError4(true)
      }else{
        setError4(false)
      }
      setPhoneAdmin(e.target.value)
    }
    const [instagramAdmin,setInstagramAdmin] = useState('')
    const handleInstagramAdminChange = (e)=>{
      if(e.target.value===''){
        setError5(true)
      }else{
        setError5(false)
      }
      setInstagramAdmin(e.target.value)
    }
    const [linkedinAdmin,setLinkedInAdmin] = useState('')
    const handleLinkedinAdminChange = (e)=>{
      if(e.target.value===''){
        setError6(true)
      }else{
        setError6(false)
      }
      setLinkedInAdmin(e.target.value)
    }
    const saveChanges3 = async ()=>{
      if(emailAdmin===""){
        setError1(true)
      }

      if(facebookAdmin===""){
        setError2(true)

      }

      if(twitterAdmin===""){
        setError3(true)

      }

      if(phoneAdmin===""){
        setError4(true)

      }

      if(instagramAdmin===""){
        setError5(true)

      }

      if(linkedinAdmin===""){
        setError6(true)

      }
      if(emailAdmin!=="" && facebookAdmin!=="" && twitterAdmin!=="" && phoneAdmin!=="" && instagramAdmin!=="" && linkedinAdmin!==""){
    try {
      const res = await fetch("https://soc-net.info/foody/updateCompanyInfo.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          emailAdmin:emailAdmin,
          instagramAdmin:instagramAdmin,
          twitterAdmin:twitterAdmin,
          phoneAdmin:phoneAdmin,
          linkedinAdmin:linkedinAdmin,
          facebookAdmin:facebookAdmin
      }),
    });

      const result = await res.json();
      //result);
      if(result.status===1){
        getAdminInfo()
        
    
            setSuccess(true)
            message.current && message.current.classList.remove("message");
            message.current && void message.current.offsetWidth;
            message.current && message.current.classList.add("message");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }}else{
      alert('Fill all fields!')
    }
    }

    const [surname,setSurName] = useState('')
    const handleSurnameChange = (e)=>{
        setSurName(e.target.value)
    }

    useEffect(()=>{
      fetchTickets()
      getAdminInfo()
      fetchAllOrders()
  },[])

  const [id_customer,setIdCustomer] = useState(null)
  const [orderId,setOrderId] = useState("")
  const [RestaurantId,setRestaurantId] = useState(null)
  const [lastUpdate,setLastUpdate] = useState(null)
          const [review,setReview] = useState(false)
    const [courrier,setCourrier] = useState("")
    const [totalPrice,setTotalPrice] = useState("")
    const [status,setStatus] = useState("")
    const [restaurant,setRestaurant] = useState("")
    const [form,setForm] = useState(false)
    const [customerName,setCustomerName] = useState("")

const setReviewInfo = (id_customer,orderId,id_restaurant)=>{
        setIdCustomer(id_customer)
        setOrderId(orderId)
        setRestaurantId(id_restaurant)
        setOverlay(true)
        setReview(true)
    }
  const setOrderInfo = (index)=>{
        setCourrier(allOrders[index].orders.courrier)
        setTotalPrice(allOrders[index].orders.total_amount)
        setOrderId(allOrders[index].orders.order_id)
        setStatus(allOrders[index].orders.status)
        setRestaurant(allOrders[index].orders.restaurantName)
        setOverlay(true)
        setCustomerName(allOrders[index].customerInfo.name.includes(allOrders[index].customerInfo.surname)?allOrders[index].customerInfo.name:allOrders[index].customerInfo.name +" " +allOrders[index].customerInfo.surname)
        setForm(true)
        setLastUpdate(allOrders[index].orders.lastUpdate)
    }
  
    const [search,setSearch] = useState('')
    const [filteredOrders,setFilteredOrders] = useState([])

    const handleSearchChange = (e)=>{
      setFilteredOrders([])
      setSearch(e.target.value)
     allOrders.map((elm,index)=>{
      if(elm.orders.order_id.includes(e.target.value)){
        setFilteredOrders(prevItems => [...prevItems, elm]);
      }
     })
    }

    const blockCustomer = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/blockCustomer.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });

      const result = await res.json();
      //result);
      fetchAllUsers()
    } catch (error) {
      console.error("Upload error:", error);
    }
    }

    const blockResto = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/blockResto.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });

      const result = await res.json();
      //result);
      fetchAllUsers()
    } catch (error) {
      console.error("Upload error:", error);
    }
    }

    const blockCourrier = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/blockCourrier.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });

      const result = await res.json();
      //result);
      fetchAllUsers()
    } catch (error) {
      console.error("Upload error:", error);
    }
    }

    const unBlockCustomer = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/unBlockCustomer.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });

      const result = await res.json();
      //result);
      fetchAllUsers()
    } catch (error) {
      console.error("Upload error:", error);
    }
    }

const unBlockCourrier = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/unBlockCourrier.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });

      const result = await res.json();
      //result);
      fetchAllUsers()
    } catch (error) {
      console.error("Upload error:", error);
    }
    }

    const unBlockResto = async (id)=>{
try {
      const res = await fetch("https://soc-net.info/foody/unBlockResto.php",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id:id
      }),
    });
fetchAllUsers()
      const result = await res.json();
      //result);
      
    } catch (error) {
      console.error("Upload error:", error);
    }
    }
    const [number_customers,setnumber_customers]=useState(null)
        const [number_restaurants,setnumber_restaurants]=useState(null)
        const [number_courrier,setnumber_courrier]=useState(null)
        const [topRestaurants,settopRestaurants]=useState(null)
        const [mostpopularRestaurants,setmostpopularRestaurants]=useState(null)
        const [mostUsers,setmostUsers]=useState(null)
        const [mostCourriers,setMostCourriers]=useState(null)

const getStats= async()=>{
      try {
        const response = await fetch("https://soc-net.info/foody/statsAdmin.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        const result = await response.json();
        //console.log(result); // { success: true, message: "..." }
        setnumber_customers(result.number_customers)
        setnumber_restaurants(result.number_restaurants)
        setnumber_courrier(result.number_courriers)
        setuserpermonth(result.users_per_month)
        setOrdersPerMonth(result.orders_per_month)
        settopRestaurants(result.topRestaurants)
        setmostpopularRestaurants(result.mostPopular)
        setmostUsers(result.mostUsers)
        setMostCourriers(result.mostCourriers)
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

          

const orders_per_month = [];

if (data) {
  for (let i = 0; i < data.length; i++) {
    const label = `${data[i].month_name} ${data[i].year}`;

    if (!orders_per_month.some(entry => entry[0] === label)) {
      let total = data[i].orders_count;

      for (let j = 0; j < data.length; j++) {
        if (j !== i && `${data[j].month_name} ${data[j].year}` === label) {
          total += data[j].orders_count;
        }
      }

      orders_per_month.push([label, total]);
    }
  }

  //orders_per_month);
}

orders_per_month && orders_per_month.forEach(element => {
  const label = `${element[0]}`;
  labels.push(label);
  num_orders.push(element[1]);
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

              function barreaux2(data){
                const monthOrder = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};
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
          data && data.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return monthOrder[a.month_name] - monthOrder[b.month_name];
          })

          data && data.forEach(element => {
          labels.push(element.month_name+ " "+element.year);
          num_orders.push(element.users_count);
        });
      
          // Create new chart
          chartRef2.current = new Chart(ctx, {
            type: 'bar',
            data: {
              labels:labels,
              datasets: [
                {
                  label: 'Number of subscriptions per month',
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
                 barreaux2(userpermonth)
                }, [userpermonth,analytics]); // ← re-run when `analytics` changes
              
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
      {form && <div className='form23'>
        <div>
           <h1>Order Details</h1>  
           <i onClick={()=>{setForm(false);setOverlay(false);}} style={{position:'absolute',right:'20px',top:'20px',cursor:'pointer'}} className="fa-solid fa-xmark"></i>
        </div>
           <p><span style={{fontWeight:'bold'}}>Order ID: </span><span> #{orderId}</span></p>
           <p><span style={{fontWeight:'bold'}}>Restaurant: </span><span> {restaurant}</span></p>
          <p><span style={{fontWeight:'bold'}}>Customer name:</span><span> {customerName}</span></p>
           <p><span style={{fontWeight:'bold'}}>Courier:</span><span> {courrier}</span></p>
           <p><span style={{fontWeight:'bold'}}>Status:</span><span> {status}</span></p>
            <p><span style={{fontWeight:'bold'}}>Last update: </span><span> {formatDate(lastUpdate)}</span></p>
           <p><span style={{fontWeight:'bold'}}>Delivery Fee:</span><span> $10</span></p>
           <p><span style={{fontWeight:'bold'}}>Total Price: </span><span> ${totalPrice+10}</span></p>
          
        </div>}
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
          <img width='70' height='70' style={{borderRadius:'50%',objectFit:'cover',margin:'0px 20px 20px 0'}} src={elm.info.isAdmin==0?elm.userInfo.photo ?`https://soc-net.info/foody/${elm.userInfo.photo}`:elm.userInfo.logo ?`https://soc-net.info/foody/${elm.userInfo.logo}`:'https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png':"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=64,h=64,f=auto,dpr=1,fit=contain/f1646061270754x888289544466858600/Component%203%20%282%29%20%281%29.png"} alt={`${index}`} />
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
        <textarea value={messageTicket} onChange={handleMessageChange} placeholder='Type your message here...' style={{border:errorTicket?"1px solid red":"1px solid #fb9300"}}></textarea>
        <div style={{marginTop:'30px'}}><span onClick={addMessageToTicket} className='sn'>Send</span></div>
      </div>}
{success6 && <p ref={message6} className='message' style={{textAlign:'center',zIndex:'5',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>A new ticket successfully created!</p>}

{successDelete && <p ref={messageDelete} className='message' style={{textAlign:'center',zIndex:'5',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Comment successfully deleted!</p>}
{success7 && <p ref={message7} className='message' style={{textAlign:'center',zIndex:'5',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Success!</p>}
      {success && <p ref={message} className='message' style={{textAlign:'center',zIndex:'5',position:'fixed',top:'0',width:'100%',backgroundColor:'#bfe9d3',border:'1px solid #008d00'}}>Changes are successfully saved!</p>}
      {fail && <p ref={message2} className='message' style={{textAlign:'center',zIndex:'5',position:'fixed',top:'0',width:'100%',backgroundColor:'rgba(255,0,0,0.5)',border:'1px solid red'}}>Changes were not successfully saved!</p>}
      <div ref={menu} id='porte'>
             <img width='150' id='lopp' src="https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1646061273072x552344553851359800/Component%202%20%282%29%20%281%29.png" alt="logo"/>
            <div id='links' style={{width:'100%',textAlign:'left',fontSize:'1.3em',display:'flex',flexDirection:'column'}}>

              <i onClick={handleClick2} className="closed fa-solid fa-xmark"></i>
               
                <p onClick={()=>{setAnalytics(true);setUsers(false);setCredentials(false);setTickets(false);setReports(false);setOrder1(false);setSettings(false);}} style={{marginTop:'50px',display:'flex',alignItems:'center',width:'100%',backgroundColor:analytics?'#ffecd1':"",color:analytics?"#fb9300":""}}><i className="fa-solid fa-chart-simple"></i> Analytics</p>


<p onClick={()=>{setAnalytics(false);setUsers(true);setCredentials(false);setTickets(false);setReports(false);setOrder1(false);setSettings(false);}} style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:users?'#ffecd1':"",color:users?"#fb9300":""}}><i className="fa-solid fa-user"></i> Users</p>



<p onClick={()=>{setAnalytics(false);setUsers(false);setCredentials(false);setTickets(false);setReports(false);setOrder1(true);setSettings(false);}} style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:order1?'#ffecd1':"",color:order1?"#fb9300":""}}><i className="fa-brands fa-jedi-order"></i> Order</p>

<p onClick={()=>{setAnalytics(false);setUsers(false);setCredentials(false);setTickets(false);setReports(true);setOrder1(false);setSettings(false);}} style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:reports?'#ffecd1':"",color:reports?"#fb9300":""}}><i className="fa-solid fa-flag"></i> Reports</p>

                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:tickets?'#ffecd1':"",color:tickets?"#fb9300":""}} onClick={()=>{setAnalytics(false);setUsers(false);setCredentials(false);setTickets(true);setReports(false);setOrder1(false);setSettings(false);}}><i className="fa-solid fa-ticket"></i>Tickets</p>
                

                 <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:settings?'#ffecd1':"",color:settings?"#fb9300":""}} onClick={()=>{setAnalytics(false);setUsers(false);setCredentials(false);setTickets(false);setReports(false);setOrder1(false);setSettings(true)}}><i className="fa-solid fa-gear"></i> Settings</p>
                
                
                <p style={{display:'flex',alignItems:'center',width:'100%',backgroundColor:credentials?'#ffecd1':"",color:credentials?"#fb9300":""}} onClick={()=>{setAnalytics(false);setUsers(false);setCredentials(true);setTickets(false);setReports(false);setOrder1(false);setSettings(false)}}><i className="fa-solid fa-key"></i>  Credentials</p>
               
                <Link to="/"><p onClick={()=>{
                                  if(Cookies.get('stayLogged')){
                                      Cookies.remove('stayLogged');
                                  }
                                }}><i className="fa-solid fa-right-from-bracket"></i> Sign out</p></Link>
            </div>
      </div>
      <div id='ma'>
       
       
{order1 &&  <div id='has'>
                <div id='his'>
                  <h1 style={{fontSize:'1.3em'}}>Order History</h1>
                  <input placeholder='Search by order ID' style={{marginRight:'30px',width:'unset'}}type='text' value={search} onChange={handleSearchChange}/>
                </div>
               <div style={{marginTop:'40px',width:'100%',paddingRight:'30px'}}>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Order ID</td>

                    <td className='pi'>Restaurant</td>
                    <td className='pi'>Customer</td>
                    <td className='pi'>Status</td>
                    <td className='pi'>Date</td>
                    <td style={{  padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</td>
                </tr>
                </thead>
                <tbody>
                
                  {filteredOrders && filteredOrders.map((elm,index) => (
                    <tr key={elm.orders.order_id} style={{ backgroundColor: '#fff' }}>
                      <td style={{padding: '10px', display:'flex',alignItems:'center',padding: '10px 10px' }}>{elm.orders.order_id}</td>
                      <td className='pi'>{elm.orders.restaurantName}</td>
                      <td className='pi' >{elm.customerInfo.name}</td>
                      <td className='pi' ><span style={{padding:'5px',borderRadius:'15px',color:'white',backgroundColor:(elm.orders.status=="Ready" || elm.orders.status=='Delivered')?"green":elm.orders.status=='Pending'?'#02aec7':elm.orders.status=='Rejected'?"red":elm.orders.status=='Active'?"green":'#f5b253'}}>{elm.orders.status}</span></td>
                      <td className='pi'> {formatDate(elm.orders.dateOrder)}
                          
                        </td>
                      
                      <td style={{padding: '10px',cursor:'pointer',color:'#999'}}>
                      <i onClick={()=>setOrderInfo(index)} style={{marginRight:'5px'}} className="fa-solid fa-circle-info"></i>
                      </td>
                    </tr>
                  ))}

                </tbody>
               </table>
            </div>

            </div>}



            {users &&  <div id='pod'>
                <div id="ju">
                  <h1 style={{fontSize:'1.3em',marginBottom:'10px'}}>Users</h1>
                  <div id='lm'>
                            <span onClick={()=>{setCustomers(true);setRestaurantsOwners(false);setCourriers(false);}} style={{color:customers?'#5b696e':''}}>Customers</span>
                            <span onClick={()=>{setCustomers(false);setRestaurantsOwners(true);setCourriers(false);}} style={{color:restaurantsOwners?'#5b696e':''}}>Restauarants</span>
                            <span onClick={()=>{setCustomers(false);setRestaurantsOwners(false);setCourriers(true);}} style={{color:courriers?'#5b696e':''}}>Courriers</span>
                    </div>
                </div>
               <div id='lk'>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td className='hid' >Profile</td>

                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</td>
                    <td className='hid' style={{ padding: '10px', borderBottom: '1px solid #ddd' }} >Phone</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }} >Block</td>
                </tr>
                </thead>
                <tbody>
                
                  {customers && usersInfo.customers.map((elm,index) => (
                    <tr key={elm.id} style={{ backgroundColor: '#fff' }}>
                      <td className='hi'>{elm.name.includes(elm.surname)?elm.name:elm.name+ " "+elm.surname}</td>
                      <td  style={{padding: '10px'}}>{elm.email}</td>
                      {elm.phone ? <td className='hdi'>{elm.phone}</td> : <td className='hdi'>-</td>}
                      <td style={{padding: '10px'}}>
                        {elm.blocked===1?
                            <i onClick={()=>{unBlockCustomer(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid red',color:'red'}} className="close fa-solid fa-xmark"></i>
                                :
                            <i onClick={()=>{blockCustomer(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid black',color:'black'}} className="close fa-solid fa-xmark"></i>
                        }
                        </td>
                    </tr>
                  ))}

                  {courriers && usersInfo.courriers.map((elm,index) => (
                    <tr key={elm.id} style={{ backgroundColor: '#fff' }}>
                      <td className='fb'>{elm.name} {elm.surname}</td>
                      <td style={{padding: '10px'}}>{elm.email}</td>
                      {elm.phone ? <td className='hidd' >{elm.phone}</td> : <td className='hidd'>-</td>}
                      <td style={{padding: '10px'}}>{elm.blocked===1?<i onClick={()=>{unBlockCourrier(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid red',color:'red'}} className="close fa-solid fa-xmark"></i>:<i onClick={()=>{blockCourrier(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid black',color:'black'}} className="close fa-solid fa-xmark"></i>}</td>
                    </tr>
                  ))}

                  {restaurantsOwners && usersInfo.restoOwners.map((elm,index) => (
                    <tr key={elm.id} style={{ backgroundColor: '#fff' }}>
                      <td className='hidd'>{elm.restaurantName}</td>
                      <td style={{padding: '10px'}}>{elm.email}</td>
                      {elm.phone ? <td className='hidd' >{elm.phone}</td> : <td className='hidd'>-</td>}
                      <td style={{padding: '10px'}}>{elm.blocked===1?<i onClick={()=>{unBlockResto(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid red',color:'red'}} className="close fa-solid fa-xmark"></i>:<i onClick={()=>{blockResto(elm.id)}} style={{cursor:'pointer',borderRadius:'50%',padding:'5px',border:'1px solid black',color:'black'}} className="close fa-solid fa-xmark"></i>}</td>
                    </tr>
                  ))}

                </tbody>
               </table>
            </div>

            </div>}


          {reports &&  <div id='cool'>
                
                  <h1 style={{fontSize:'1.3em'}}>Review Reports</h1>
                 
               <div style={{marginTop:'40px',width:'100%',paddingRight:'30px'}}>
               <table>
                <thead>
                <tr style={{padding:'10px'}}>
                    <td className='pi' >Related Order ID</td>

                    <td className='pi' >From</td>
                    <td style={{  padding: '10px', borderBottom: '1px solid #ddd' }}>Comment</td>
                    <td style={{ padding: '10px',  borderBottom: '1px solid #ddd' }}>Delete Comment</td>
                    
                </tr>
                </thead>
                <tbody>
                
                  {reportedComments && reportedComments.map((elm,index) => (
                    <tr key={elm.commentContent.id} style={{ backgroundColor: '#fff' }}>
                      <td className='pis' >{elm.commentInfo.order_id}</td>
                      <td className='pi' style={{ padding: '10px' }}>
  {elm.userInfo.restaurantName || elm.userInfo.name}
</td>

                      <td style={{padding: '10px'}}>{elm.commentContent.comment}</td>
                      <td style={{padding: '10px',textAlign:'center'}}><i
                          onClick={()=>deleteComment(elm.commentContent.id)}
                          style={{ color: 'red',cursor:'pointer' }}
                          className="fa-solid fa-trash"
                        ></i></td>
                    </tr>
                  ))}

                </tbody>
               </table>
            </div>

            </div>}
        

            {tickets && <div>
  
            <h2>Tickets</h2>
            
            <div style={{display:'flex',flexWrap:'wrap',marginTop:'40px',width:'100%',paddingRight:'30px'}}>
              {ticketsMessages && ticketsMessages.map((elm,index)=>(
                  <div key={elm.info.id} className='ti' style={{backgroundColor:elm.stateTicket==='Closed'?'#9cffcc':elm.stateTicket==='Pending'?'#ffecd1':'#bdf6ff'}}>
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
                    <div onClick={()=>showTicketMessages(elm.info.id_ticket)} style={{padding:'5px 25px',cursor:'pointer',zIndex:'500',borderRadius:'7px',backgroundColor:elm.stateTicket==='Closed'?'#00a650':elm.stateTicket==='Pending'?'#fb9300':'#00aec8',position:'absolute',color:'#fff',right:'15px',bottom:'15px',textAlign:'right'}}>Show</div>
               </div>

              ))}
                              
            </div>
        </div>}

        {credentials && <div>
            <h2>User Credentials</h2>
            <div style={{display:'flex'}}>
                <div style={{border:'1px solid #ddd',outline:'none',paddingLeft:'20px',margin:'30px 20px 0 0',padding:'20px',backgroundColor:'white',width:'90%'}}>
                    <h5 style={{margin:'10px 0'}}>Current Password</h5>
                    <input value={password} onChange={handlePasswordChange} placeholder='Type old password here...' type="password"/>
                    <h5 style={{margin:'10px 0'}}>New Email</h5>
                    <input style={{border:errorEmail?"1px solid red":""}} value={emailAdmin} onChange={handleEmailAdminChange} placeholder='Type here...' type="email"/>
                    <h5 style={{margin:'10px 0'}}>New Password</h5>
                    <input value={newPassword} onChange={handleNewPasswordChange} placeholder='Type new password here...' style={{margin:'0px 0 20px 0px'}} type="password"/>
                    <input onClick={handleUpdate} type="submit" style={{color:'white',boxShadow:'0 0 5px #fb9300',fontSize:'1.2em',padding:'15px 10px',backgroundColor:'#fb9300',borderRadius:'5px',border:'none',outline:'none'}} value='Update credentials'/>
                </div>
            </div>
        </div>}
          {settings && <div id='lk'>
              <h2>Settings</h2>
              <div id='sett'>
                <div className='name'>
                  <div style={{marginBottom:'30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><h2>App Commission</h2><span>{range}% per order</span></div>
                  <input value={range} onChange={handleRangeChange} type="range" min="0" max="50" className="slider" id="myRange"/>
                  <div style={{display:'flex',justifyContent:'flex-end',marginTop:'20px'}}>
                  <span onClick={saveChanges1} style={{backgroundColor:'#fb9300',color:'#fff',padding:'10px',borderRadius:'15px',boxShadow:'0px 0px 6px #aaa',cursor:'pointer'}}>Save Changes</span>
                  </div>
                </div>
                <div className='name'>
                  <div style={{marginBottom:'30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><h2>Courier Fee</h2><span>${range2} per kilometer</span></div>
                  <input value={range2} onChange={handleRangeChange2} type="range" min="1" max="20" className="slider" id="myRange"/>
                  <div style={{display:'flex',justifyContent:'flex-end',marginTop:'20px'}}>
                  <span onClick={saveChanges2} style={{backgroundColor:'#fb9300',color:'#fff',padding:'10px',borderRadius:'15px',boxShadow:'0px 0px 6px #aaa',cursor:'pointer'}}>Save Changes</span>
                  </div>
                </div>
              </div>
              <div>

              </div>
              <div>
              <div style={{backgroundColor:'#fff',border:'1px solid #ddd',padding:'20px',margin:'20px',width:'fit-content'}}>
            
                 <h2>Company Info</h2>
               <div className='ef'>
                  <div className='fe'>
                    <label>Email</label>
                    <input style={{border:error1?'1px dashed red':''}} value={emailAdmin} onChange={handleEmailAdminChange} type="text"/>
                    <label>Facebook</label>
                    <input style={{border:error2?'1px dashed red':''}} value={facebookAdmin} onChange={handleFacebookAdminChange} type="text"/>
                    <label>Twitter</label>
                    <input style={{border:error3?'1px dashed red':''}} value={twitterAdmin} onChange={handleTwitterAdminChange} type="text"/>
                  </div>
                  <div className='fe'>
                    <label>Phone</label>
                    <input style={{border:error4?'1px dashed red':''}} value={phoneAdmin} onChange={handlePhoneAdminChange} type="text"/>
                    <label>Instagram</label>
                    <input style={{border:error5?'1px dashed red':''}} value={instagramAdmin} onChange={handleInstagramAdminChange} type="text"/>
                    <label>LinkedIn</label>
                    <input style={{border:error6?'1px dashed red':''}} value={linkedinAdmin} onChange={handleLinkedinAdminChange} type="text"/>
                  </div>
              </div>    









                  <div style={{display:'flex',justifyContent:'flex-end',marginTop:'20px'}}>
                  <span onClick={saveChanges3} style={{backgroundColor:'#fb9300',color:'#fff',padding:'10px',borderRadius:'15px',boxShadow:'0px 0px 6px #aaa',cursor:'pointer'}}>Save Changes</span>
                  </div>
                </div>
               
              
              </div>
            </div>}
       


        {analytics && <div>
            <h2>Analytics</h2>
            <div id='kop'>
               <div id='lop'>
                    <div>
                        <i style={{borderRadius:'10px',fontSize:'2.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-dollar-sign"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Customers</span>
                            <span style={{fontSize:'1.9em'}}>{number_customers}</span>
                        </div>
                    </div>
                    <div>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}}
                        className="fa-solid fa-shop"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Restaurants</span>
                            <span style={{fontSize:'1.9em'}}>{number_restaurants}</span>
                        </div>
                    </div>
                    <div>
                        <i style={{borderRadius:'10px',fontSize:'1.2em',padding:'20px',backgroundColor:'#ffecd1'}} className="fa-solid fa-suitcase"></i>
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                            <span style={{color:'#bbb'}}>Total Couriers</span>
                            <span style={{fontSize:'1.9em'}}>{number_courrier}</span>
                        </div>
                    </div>
               </div>
               <div id='ok'>
                    <div id='canvas1'>
                        <h3>Order Graph</h3>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                    <div id='canvas2'>
                        <h3>Users</h3>
                        <div style={{textAlign:'center'}}>
                        <canvas ref={canvasRef2}></canvas>
                        </div>
                    </div>
                </div>
                <div id='top'>
                  <div className='sau'>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h3>Top Restaurants</h3>
                      <span style={{color:'#888',fontSize:'0.8'}}>By Orders</span>
                    </div>
                    {topRestaurants && topRestaurants.map((elm,index)=>(
                      <div key={index} style={{display:'flex',marginTop:'10px',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center'}}><img height='40' width='40' style={{borderRadius:'50%',objectFit:'cover',marginRight:'5px'}} src={elm.restoInfo.logo!=null?`https://soc-net.info/foody/${elm.restoInfo.logo}`:"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=48,h=48,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png"}/><span>{elm.restoInfo.restaurantName}</span></div>
                      <span style={{color:'#888',fontSize:'0.8'}}>{elm.orderInfo.times_ordered}</span>
                    </div>
                    ))}
                  </div>
                  <div className='sau'>
                     <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h3>Most Popular</h3>
                      <span style={{color:'#888',fontSize:'0.8'}}>By Favorites</span>
                    </div>
                    {mostpopularRestaurants && mostpopularRestaurants.map((elm,index)=>(
                      <div key={index} style={{display:'flex',marginTop:'10px',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center'}}><img height='40' width='40' style={{borderRadius:'50%',objectFit:'cover',marginRight:'5px'}} src={elm.restoInfo.logo!=null?`https://soc-net.info/foody/${elm.restoInfo.logo}`:"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=48,h=48,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png"}/><span>{elm.restoInfo.restaurantName}</span></div>
                      <span style={{color:'#888',fontSize:'0.8'}}>{elm.mostPopularInfo.number_favorites}</span>
                    </div>
                    ))}
                  </div>
                  <div className='sau'>
                     <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h3>Top Users</h3>
                      <span style={{color:'#888',fontSize:'0.8'}}>By Orders</span>
                    </div>
                     {mostUsers && mostUsers.map((elm,index)=>(
                      <div key={index} style={{display:'flex',marginTop:'10px',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center'}}><img height='40' width='40' style={{borderRadius:'50%',objectFit:'cover',marginRight:'5px'}} src={elm.userInfo.photo!=null?`https://soc-net.info/foody/${elm.userInfo.photo}`:"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=48,h=48,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png"}/><span>
  {(elm.userInfo.name).trim()}
</span>
</div>
                      <span style={{color:'#888',fontSize:'0.8'}}>{elm.mostUsersInfo.number_orders}</span>
                    </div>
                    ))}
                  </div>
                </div>
                <div id='courrier'> <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h3>Top Courriers</h3>
                      <span style={{color:'#888',fontSize:'0.8'}}>By Delivery</span>
                    </div>
                     {mostCourriers && mostCourriers.map((elm,index)=>(
                      <div key={index} style={{display:'flex',marginTop:'10px',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center'}}><img height='40' width='40' style={{borderRadius:'50%',objectFit:'cover',marginRight:'5px'}} src={elm.userInfo.photo!=null?`https://soc-net.info/foody/${elm.userInfo.photo}`:"https://21985162c3f6de69b3a2fa38c4458a89.cdn.bubble.io/cdn-cgi/image/w=48,h=48,f=auto,dpr=1,fit=contain/f1643645120337x435152378012765760/chefauchef-01%2B%281%29.png"}/><span>{elm.userInfo.name} {elm.userInfo.surname}</span></div>
                      <span style={{color:'#888',fontSize:'0.8'}}>{elm.mostCourriersInfo.number_orders}</span>
                    </div>
                    ))}</div>
            </div>
        </div>}


        

        
      </div>
    </div>
  )
}

export default Admin
