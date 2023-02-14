import {
  Card,
  CardActionArea,
  Button,
  CardMedia,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";

const CustomCard = (props) => {
  return (
    <Grid item>
      <Card sx={{ width: 200 }} className="card">
        <CardActionArea onClick={() => props.assignRole(props.role)}>
          <CardMedia className="icon">
            {props.icon}
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ padding: 0, textTransform: 'uppercase' }}>
              {props.role}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default CustomCard