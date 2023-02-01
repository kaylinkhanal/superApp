import { useNavigate } from "react-router-dom";
import {useSelector , useDispatch} from "react-redux"
import { assignUserRole } from "../redux/reducers/userSlice"
const Home =()=> {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const assignRole = (role) => {
    navigate('/home')
    dispatch(assignUserRole(role))
  }
  const {userRole} = useSelector(state => state.user)


  return (
    <div className="App">
        <button onClick={()=> assignRole('user')}>User</button>
        <button onClick={()=> assignRole('rider')}>Rider</button>
    </div>
  );
}

export default Home;