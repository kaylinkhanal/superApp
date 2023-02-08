import { Routes, Route } from "react-router-dom";
import GettingStarted from "../containers/gettingStarted";
import Home from "../containers/home";
import Roles from "../containers/roles";
import SendOrders from "../containers/sendOrders";
import RiderHome from "../containers/rider/riderHome";
import Login from "../containers/auth/login";
import Register from "../containers/auth/register";

import { useSelector } from "react-redux";

const ConditionalRoute = () => {
  const { userRole, firstTimeUser } = useSelector((state) => state.user);
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

export default ConditionalRoute;
