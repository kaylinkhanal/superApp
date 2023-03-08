import React, { useState, useRef } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Autocomplete,
} from "@react-google-maps/api";
import { setOrdersDetails } from "../../redux/reducers/locationSlice";
import OrderList from "../sharedScreens/orderList"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingCircle from "../../components/loadingCircle";
import UserMarker from "../../components/map/userMarker";
import RiderMarker from "../../components/map/riderMarker";
import LocationForm from "../../components/map/locationForm";

const containerStyle = {
	width: "100%",
	height: "100vh",
};

const center = {
	lat: 27.685616312450417,
	lng: 85.34456349960001,
};

const SendOrders = () => {
	const { ordersDetails } = useSelector((state) => state.location);
	const { isLoggedIn, userRole } = useSelector((state) => state.user);
	const [isSenderFormActive, setIsSenderFormActive] = useState(userRole == 'rider' ? false : true);
	const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
	const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);
	const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(ordersDetails?.receiverPhoneNumber);
	const [receiverName, setReceiverName] = useState(ordersDetails?.receiverName);

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

	// const assignSenderLocation = (e) => {
	// 	const cordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
	// 	dispatch(setSenderCoordinates(cordinates));
	// 	fetch(
	// 		`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => setSenderAddress(data.features[0].properties.formatted));
	// };

	// const assignReceiverLocation = (e) => {
	// 	const cordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
	// 	dispatch(setReceiverCoordinates(cordinates));
	// 	fetch(
	// 		`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) =>
	// 			setReceiverAddress(data.features[0].properties.formatted)
	// 		);
	// };

	const handleOrderNavigation = () => {
		dispatch(setOrdersDetails({ receiverAddress, senderAddress, receiverName, receiverPhoneNumber }))
		if (isLoggedIn) {
			navigate("/order");
		} else {
			navigate("/login", { state: { onSuccessNavigation: "/order" } });
		}
	};

	const [isOrderListOpen, setIsOrderListOpen] = useState(false);


	return isLoaded ? (
		<>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>
				<RiderMarker />

				<UserMarker isSenderFormActive={isSenderFormActive} />

				{/* Child components, such as markers, info windows, etc. */}
			</GoogleMap>

			<div className="location_map">
				<LocationForm isSenderFormActive={isSenderFormActive} handleOrderNavigation={handleOrderNavigation} />
				{/* {userRole === 'user' &&
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
				} */}

				<button onClick={() => setIsOrderListOpen(!isOrderListOpen)} className="btn" style={{ margin: '0 0 8px 0 ' }}><span>{!isOrderListOpen ? 'Check your orders' : 'Close'}</span></button>
				<div style={{ overflow: 'hidden' }}>
					<div className="order_list" style={!isOrderListOpen ? {
						transition: `transform 250ms ease-in-out`,
						transform: "translateY(-101%)"
					} : {
						transition: `transform 250ms ease-in-out`,
						transform: "translateY(0)"
					}}>
						<OrderList />
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
