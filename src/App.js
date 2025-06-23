import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import SignUp from './SignUp'
import CustomerSignUp from './CustomerSignUp';
import RestaurantOwnerSignup from './RestaurantOwnerSignUp';
import CourierSignUp from './CourierSignUp';
import AddAddressCus from './AddAddressCus';
import AddAddressRes from './AddAddressRes';
import AddAddressCourrier from './AddAddressCourrier';
import Forgot from './Forgot'
import Reset from './Reset'
import ResDash from './ResDash'
import CusDash from './CusDash';
import RestoInfo from './RestoInfo'
import Profile from './Profile';
import Favorites from "./Favorites"
import CheckOut from "./CheckOut"
import Order from './Order'
import CourrierDash from './CourrierDash';
import Comments from './Comments';
import Admin from './Admin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/resdash/:id" element={<ResDash />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/courrierdash/:id" element={<CourrierDash />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/restoinfo/:id" element={<RestoInfo />} />
        <Route path="/cusdash/:id/:f" element={<CusDash />} />
        <Route path="/cusdash/:id" element={<CusDash />} />
        <Route path="/reset/:id/:type" element={<Reset />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customersignup" element={<CustomerSignUp />} />
        <Route path="/restaurantownersignup" element={<RestaurantOwnerSignup />} />
        <Route path="/couriersignup" element={<CourierSignUp />} />
        <Route path="/addaddresscus" element={<AddAddressCus />} />
        <Route path="/addaddressres" element={<AddAddressRes />} />
        <Route path="/addaddresscourrier" element={<AddAddressCourrier />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
