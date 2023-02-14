import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole } from "../redux/reducers/userSlice";
import {
  Card,
  Grid,
} from "@mui/material";
import CustomCard from "../components/cards/customCard"
import { Box, Container } from "@mui/system";
import ManIcon from "@mui/icons-material/Man";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import DirectionsBike from "@mui/icons-material/DirectionsBike"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignRole = (role) => {
    navigate("/");
    dispatch(assignUserRole(role));
  };
  const { userRole } = useSelector((state) => state.user);

  return (
    <div className="user_role">
      <Grid
        container
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        marginTop={"5%"}
      >
        <CustomCard role="user" assignRole={assignRole} icon={<ManIcon />} />
        <CustomCard role="rider" assignRole={assignRole} icon={<DirectionsBike />} />
      </Grid>
    </div>
  );
};

export default Home;
