import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole } from "../redux/reducers/userSlice";
import CustomCard from "../components/cards/customCard";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignRole = (role) => {
    if(role=='rider') navigate("/login") 
    else navigate("/")
    dispatch(assignUserRole(role));
  };
  const { userRole } = useSelector((state) => state.user);

  return (
    <section id="role_section">
      <div className="user_role">
        <CustomCard role="user" assignRole={assignRole} icon={<PersonOutlinedIcon />} />
        <CustomCard role="rider" assignRole={assignRole} icon={<SportsMotorsportsOutlinedIcon />} />
      </div>
    </section>
  )
}

export default Roles;
