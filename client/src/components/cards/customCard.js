import {
  Card,
  CardActionArea,
  Button,
  CardMedia,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";

const CustomCard = (props) => {
  return (
    <Grid item>
      <Card
        sx={{
          width: 320,
          height: 340,
          backgroundColor: "#6666cc",
          color: "white",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <CardActionArea onClick={() => props.assignRole(props.role)}>
          <CardMedia>{props.icon}</CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.role}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CustomCard;
