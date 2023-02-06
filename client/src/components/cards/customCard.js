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
      <Card sx={{ width: 200 }}>
        <CardActionArea onClick={() => props.assignRole(props.role)}>
          <CardMedia>
            <PersonIcon sx={{ fontSize: 60, color: "9096e4" }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.role}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CustomCard;
