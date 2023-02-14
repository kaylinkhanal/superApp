// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { assignUserRole } from "../redux/reducers/userSlice";
// import { Card, Grid } from "@mui/material";
// import CustomCard from "../components/cards/customCard";
// import { Box, Container } from "@mui/system";

// const Home = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const assignRole = (role) => {
//     navigate("/");
//     dispatch(assignUserRole(role));
//   };
//   const { userRole } = useSelector((state) => state.user);

//   return (
//     <div className="App">
//       {/* <Typography variant="h3"> Select Your Role </Typography> */}
//       <Grid
//         container
//         flexDirection={"row"}
//         alignContent={"center"}
//         justifyContent={"center"}
//         spacing={2}
//         marginTop={"5%"}
//       >
//         <CustomCard className="roleCard" role="User" assignRole={assignRole} />
//         <CustomCard className="roleCard" role="Rider" assignRole={assignRole} />
//       </Grid>
//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole } from "../redux/reducers/userSlice";
import { Card, Grid } from "@mui/material";
import CustomCard from "../components/cards/customCard";
import { Box, Container } from "@mui/system";

import PersonIcon from "@mui/icons-material/Person";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

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
      <div>
        <h1 className="role_h1">Choose a role</h1>
        <Grid
          container
          flexDirection={"row"}
          alignContent={"center"}
          justifyContent={"center"}
          spacing={5}
          marginTop={"5%"}
        >
          <CustomCard
            role="user"
            assignRole={assignRole}
            icon={<PersonIcon sx={{ fontSize: 120, color: "white" }} />}
            description={
              <>
                <div className="p">
                  <p>A rider in your area picks up your package.</p>
                  <p>And drops at your desired location.</p>
                </div>
              </>
            }
          />
          <CustomCard
            role="rider"
            assignRole={assignRole}
            icon={
              <GiFullMotorcycleHelmet
                style={{ fontSize: 120, color: "white" }}
              />
            }
            description={
              <>
                <div className="p">
                  <p>Earn while you ride.</p>
                  <p>Pickup and drop user's orders.</p>
                </div>
              </>
            }
          />
        </Grid>
      </div>
    </div>
  );
};

export default Home;
