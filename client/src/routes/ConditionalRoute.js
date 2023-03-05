import { Routes, Route } from "react-router-dom";
import GettingStarted from "../containers/gettingStarted";
import Home from "../containers/home";
import Roles from "../containers/roles";
import SendOrders from "../containers/sendOrders";
import RiderHome from "../containers/rider/riderHome";
import Login from "../containers/auth/login";
import Register from "../containers/auth/register";
import Order from "../containers/order";
import Error from "../containers/error404";

import { useSelector } from "react-redux";

const ConditionalRoute = () => {
  const { userRole, firstTimeUser, token } = useSelector((state) => state.user);
  if (userRole === "rider") {
    return <RiderRoutes />;
  } else if (userRole === "user") {
    return <UserRoutes />;
  } else if (firstTimeUser) {
    return <FirstUserRoutes />;
  } else {
    return <DefaulRoutes />;
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
      <Route path="/login" element={<Login />} />
      <Route path="/send-orders" element={<SendOrders />} />
      <Route path="/register" element={<Register />} />
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const RiderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RiderHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default ConditionalRoute;
