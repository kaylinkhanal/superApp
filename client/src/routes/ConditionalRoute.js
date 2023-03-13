import { Routes, Route } from "react-router-dom";
import GettingStarted from "../containers/gettingStarted";
import Home from "../containers/home";
import Roles from "../containers/roles";
import SendOrders from "../containers/sendOrders";
import RiderHome from "../containers/rider/riderHome";
import AdminHome from "../containers/admin/adminHome";
import Products from "../containers/Products";
import Login from "../containers/auth/login";
import Register from "../containers/auth/register";
import Order from "../containers/order";

import { useSelector } from "react-redux";

const ConditionalRoute = () => {
  const { userRole, firstTimeUser, token } = useSelector((state) => state.user);
  if(!userRole){
    return < UserRoutes/>
  }  else {
    return <AdminRoutes />;
  } 
};

const FirstUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GettingStarted />} />
    </Routes>
  );
};

const DefaulRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Roles />} />
    </Routes>
  );
};


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/send-orders" element={<SendOrders />} />
      <Route path="/register" element={<Register />} />
      <Route path="/order" element={<Order />} />
  
    </Routes>
  );
};


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};




export default ConditionalRoute;
