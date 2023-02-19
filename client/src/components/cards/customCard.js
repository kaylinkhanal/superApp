import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const CustomCard = (props) => {
	return (
		<div className="card" onClick={() => props.assignRole(props.role)}>
			<i className="card_icon">{props.icon}</i>
			<i className='check'><CheckCircleIcon /></i>

			<div className="card_content">
				<h5 className="card_title btn"><span>{props.role}</span><TrendingFlatIcon /></h5>
			</div>
		</div>
	)
}

export default CustomCard;
