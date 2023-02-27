import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Card, CardContent, Typography, CardActions, Button, Icon } from '@mui/material';

const OrdersCard = (props) => {
	return (
		<Card>
		<CardContent>
		  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
			Order #
		  </Typography>
		  <Typography variant="h5" display={'flex'} alignItems={'center'} justifyContent={'left'}>
			<DescriptionOutlinedIcon sx={{ marginRight: 2 }}/>
			{props.item.itemName}
		  </Typography>
		  <Typography variant="h6" display={"flex"} alignItems={"center"}>
			<ScaleOutlinedIcon sx={{ marginRight: 3 }}/>
			{props.item.weight}
		  </Typography>
		</CardContent>
		<CardActions>
		  <Button size="small"> Maybe Click to Show it on map ?</Button>
		</CardActions>
	  </Card>
	)
}

export default OrdersCard;
