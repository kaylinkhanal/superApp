import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole } from "../redux/reducers/userSlice";
import {
  Grid,
} from "@mui/material";
import CustomCard from "../components/cards/customCard"
// import { Box, Container } from "@mui/system";
// import PersonIcon from "@mui/icons-material/Person";
// import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignRole = (role) => {
    navigate("/");
    dispatch(assignUserRole(role));
  };
  const { userRole } = useSelector((state) => state.user);

  
  return (
    <div className="App">
      {/* <Typography variant="h3"> Select Your Role </Typography> */}
      <Grid
        container
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        marginTop={"5%"}
      >
       <CustomCard role="user" assignRole={assignRole}/>
       <CustomCard role="rider" assignRole={assignRole}/>
      </Grid>
    </div>
  );
};

export default Home;
