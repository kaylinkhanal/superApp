import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from 'react';

const OrdersCard = (props) => {
	return (
		<>

			<div className="orders" >
				<div className="order_content">
					<p>Category: <span>{props.item.category}</span></p>
					<p>Item Name: <span>{props.item.itemName}</span></p>
					<p>Item Weight: <span>{props.item.weight}</span></p>
					<p>Receiver Name: <span>{props.item.receiverName}</span></p>
					<p>Receiver Phone: <span>{props.item.receiverPhoneNumber}</span></p>
					<p>Pickup Date: <span>{props.item.pickupDate}</span></p>
				</div>
			</div>
		</>
	)
}

export default OrdersCard;
