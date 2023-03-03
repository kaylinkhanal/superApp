import React, { useState, useRef } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Autocomplete,
} from "@react-google-maps/api";
import {
  setSenderCoordinates,
  setReceiverCoordinates,
  setOrdersDetails,
} from "../redux/reducers/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../containers/sharedScreens/orderList"
import { useNavigate } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoadingCircle from "../components/loadingCircle";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import { setLoginDetails } from "../redux/reducers/userSlice";


import { Scrollbars } from 'react-custom-scrollbars-2';
const containerStyle = {
	width: "100%",
	height: "100vh",
};

const center = {
	lat: 27.685616312450417,
	lng: 85.34456349960001,
};

const SendOrders = () => {
	const { senderCoordinates, 
		receiverCoordinates,
		ordersDetails
	 } = useSelector(
		(state) => state.location
	);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
  
	const handleOpenNavMenu = (event) => {
	  setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
	  setAnchorElUser(event.currentTarget);
	};
  
	const [isSenderFormActive, setIsSenderFormActive] = useState(true);
	const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
	const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);
	const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(ordersDetails?.receiverPhoneNumber);
	const [receiverName, setReceiverName] = useState(ordersDetails?.receiverName);

	const { isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});
	const [currentCoordinates, setCurrentCoordinates] = useState();

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lng = position.coords.longitude;
			const cordinates = { lat, lng };
			setCurrentCoordinates(cordinates);
		});
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	const assignSenderLocation = (e) => {
		const cordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
		dispatch(setSenderCoordinates(cordinates));
		fetch(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
		)
			.then((res) => res.json())
			.then((data) => setSenderAddress(data.features[0].properties.formatted));
	};

	const assignReceiverLocation = (e) => {
		const cordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
		dispatch(setReceiverCoordinates(cordinates));
		fetch(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
		)
			.then((res) => res.json())
			.then((data) =>
				setReceiverAddress(data.features[0].properties.formatted)
			);
	};

	const handleOrderNavigation = () => {
		dispatch(setOrdersDetails({ receiverAddress, senderAddress, receiverName, receiverPhoneNumber }))
		if (isLoggedIn) {
			navigate("/order");
		} else {
			navigate("/login", { state: { onSuccessNavigation: "/order" } });
		}
	};

	const [isOrderListOpen, setIsOrderListOpen] = useState(false);
	const handleCloseUserMenu = (e) => {
		if (e.target.textContent == "Logout") {
		  dispatch(setLoginDetails());
		  navigate("/")
		}
	
		setAnchorElUser(null);
	  };
	return isLoaded ? (
		<>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>


					<Box sx={{ flexGrow: 0 }}>
					<Tooltip title={isLoggedIn ? "Logout" : "Login"}>
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						{isLoggedIn ? (
							<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"
							onClick={() => dispatch(setLoginDetails(false))}/>
							
						) : (
							<LoginIcon
							onClick={() =>
								navigate("/login")
							}
							/>
						)}
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "1000px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
						vertical: "top",
						horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
						vertical: "top",
						horizontal: "right",
						}}
						open={isLoggedIn ? Boolean(anchorElUser) : false}
						onClose={handleCloseUserMenu}
					>
					</Menu>
					</Box>
					{isSenderFormActive ? (
					<Marker
						draggable={true}
						onDragEnd={(e) => assignSenderLocation(e)}
						icon={{ url: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png", scaledSize: new window.google.maps.Size(40, 40) }}
						position={senderCoordinates.lat ? senderCoordinates : center}
					/>
				) : (
					<Marker
						draggable={true}
						onDragEnd={(e) => assignReceiverLocation(e)}
						icon={{ url: "https://cdn-icons-png.flaticon.com/512/4218/4218645.png", scaledSize: new window.google.maps.Size(37, 37) }}
						position={receiverCoordinates.lat ? receiverCoordinates : center}
					/>
				)}

				{/* Child components, such as markers, info windows, etc. */}
			</GoogleMap>
			<div className="location_map">
				<div className="location_form">
					{isSenderFormActive ? (
						<>
							<button onClick={() => navigate("/")}><ArrowBack /></button>
							<button onClick={() => setIsSenderFormActive(false)}><ArrowForwardOutlinedIcon /></button>
							<Autocomplete key={1} id={1} className="autofill">
								<input
									placeholder="Sender address"
									value={senderAddress}
									onChange={(e) => setSenderAddress(e.target.value)}
								/>
							</Autocomplete>

						</>
					) : (
						<>
							<button onClick={() => setIsSenderFormActive(true)}><ArrowBack /></button>
							<button onClick={() => { handleOrderNavigation(); }}><ArrowForwardOutlinedIcon /></button>
							<Autocomplete key={2} id={2} className="autofill">
								<input
									value={receiverAddress}
									onChange={(e) => setReceiverAddress(e.target.value)}
									placeholder="Receiver's address"
								/>
							</Autocomplete>
							<input
								placeholder="Receiver's Name"
								value={receiverName}
								onChange={(e) => setReceiverName(e.target.value)}
							/>
							<input placeholder="Receiver's Phone Number"
								value={receiverPhoneNumber}
								onChange={(e) => setReceiverPhoneNumber(e.target.value)}
							/>

						</>
					)}
				</div>

				<button onClick={() => setIsOrderListOpen(!isOrderListOpen)} className="btn" style={{ margin: '0 0 8px 0 ' }}><span>{!isOrderListOpen ? 'Check your orders' : 'Close'}</span></button>
				<div style={{ overflow: 'hidden' }}>
					<div className="order_list" style={!isOrderListOpen ? {
						transition: `transform 250ms ease-in-out`,
						transform: "translateY(-101%)"
					} : {
						transition: `transform 250ms ease-in-out`,
						transform: "translateY(0)"
					}}>
						<Scrollbars style={{ height: 300, borderRadius: '10px' }} >
							<OrderList />
						</Scrollbars>
					</div>
				</div>
			</div>

		</>
	) : (
		<>
			<div className="loadingAnimation">
				<LoadingCircle />
				<p className="p">Loading Google maps</p>
			</div>
		</>
	);
};

export default React.memo(SendOrders);
