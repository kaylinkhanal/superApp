import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole } from "../redux/reducers/userSlice";
import {
  Card,
  CardActionArea,
  Button,
  CardMedia,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";

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
      <Typography variant="h3"> Select Your Role </Typography>
      <Grid
        container
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        marginTop={"5%"}
      >
        <Grid item>
          <Card sx={{ width: 200 }}>
            <CardActionArea onClick={() => assignRole("user")}>
              <CardMedia>
                <PersonIcon sx={{ fontSize: 60, color: "9096e4" }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  User
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ width: 200 }}>
            <CardActionArea onClick={() => assignRole("rider")}>
              <CardMedia>
                <SportsMotorsportsIcon sx={{ fontSize: 60 }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Rider
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
