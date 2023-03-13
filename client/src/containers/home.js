import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from "react";
import ShareImg from "../images/share.svg"
import { Link } from 'react-router-dom';
const Home = () => {
	const [name, setName] = useState("hi");

	return (
		<section id="home">
			<div className="user_home">
				<img src={ShareImg}></img>
				<h1>Hi, we're SuperApp.</h1>

				<h4>"Send your order or take a ride with us"</h4>
				<Link className="btn" to="/send-orders"><span>Send Orders</span><TrendingFlatIcon /></Link>

				<button className="btn"><span>Ride</span><TrendingFlatIcon /></button>
			</div>
		</section>
	)
}

export default Home;
