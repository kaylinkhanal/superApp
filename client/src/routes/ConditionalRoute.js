import { Routes, Route } from "react-router-dom"
import GettingStarted from "../containers/gettingStarted"
import Home from "../containers/home"
import Roles from "../containers/roles"
import SendOrders from "../containers/sendOrders"
import RiderHome from "../containers/rider/riderHome"
import Login from "../containers/auth/login"
import Register from "../containers/auth/register"


import {useSelector} from 'react-redux';

const ConditionalRoute = ()=> {
  const {userRole} = useSelector(state=> state.user)
  if(userRole === 'rider') {
    return <RiderRoutes/>
  }else if(userRole === 'user'){
    return <UserRoutes/>
  }else{
    return <DefaulRoutes/>
  }
}

const DefaulRoutes = ()=>{
  return (
    <Routes>
        <Route path="/" element={ <GettingStarted/> } />
        <Route path="/roles" element={ <Roles/> } />
    </Routes>
  )
}

const UserRoutes = ()=> {
  return (
      <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/send-orders" element={ <SendOrders/> } />
      </Routes>
  )
}


const RiderRoutes = ()=> {
  return (
      <Routes>
        <Route path="/home" element={ <Login/> } />
        <Route path="/register" element={<Register/>} />
      </Routes>
  )
}




export default ConditionalRoute;