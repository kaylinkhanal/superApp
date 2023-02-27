import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const OrdersCard = (props) => {
	return (
		<div className="card">
			<div className="card_content">
				<h5 className="card_title btn"><span>{props.item.itemName}</span></h5>
				<h5 className="card_title btn"><span>{props.item.weight}</span></h5>
			</div>
		</div>
	)
}

export default OrdersCard;
