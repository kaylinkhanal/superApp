import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from "react";
import ShareImg from "../images/share.svg"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UserHome = () => {
	const { isLoggedIn } = useSelector(state => state.user)
	const navigate = useNavigate()

	return (
		<section id="home">
			<div className="user_home">
				<img src={ShareImg}></img>
				<h1>Hi, we're SuperApp.</h1>

				<h4>"Send your order or take a ride with us"</h4>
				<button className="btn" onClick={() => { !isLoggedIn ? navigate("/login") : navigate('/send-orders') }} to={!isLoggedIn ? "/login" : '/send-orders'}><span>Send Orders</span><TrendingFlatIcon /></button>

				<button className="btn"><span>Ride</span><TrendingFlatIcon /></button>
			</div>
		</section>
	)
}

export default UserHome;
