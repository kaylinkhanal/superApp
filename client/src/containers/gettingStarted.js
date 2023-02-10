import {useNavigate} from "react-router-dom"
import {setIsFirstTimeUser} from "../redux/reducers/userSlice"
import {useDispatch} from "react-redux";
import CustomCard from "../components/cards/customCard";
import {
  Card,
  Grid,
} from "@mui/material";

const GettingStarted =()=> {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const assignVisitor =()=> {
    dispatch(setIsFirstTimeUser())
    navigate('/')
  }
  return (
    <div className="App">
    <Grid
        container
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        marginTop={"5%"}
        backgroundColor={'red'}
        padding={'100px'}
      >
      <button onClick={()=> assignVisitor()} style={{padding:'20px' }}>getting started </button>
      </Grid>
       
    </div>
  );
}

export default GettingStarted;