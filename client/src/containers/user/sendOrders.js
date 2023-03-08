import React, { useState, useRef } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Autocomplete,
} from "@react-google-maps/api";
import { setOrdersDetails } from "../../redux/reducers/locationSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingCircle from "../../components/loadingCircle";
import UserMarker from "../../components/map/userMarker";
import RiderMarker from "../../components/map/riderMarker";
import LocationForm from "../../components/map/locationForm";
import OrderViewSection from "../../components/map/orderVeiwSection";

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

	const handleOrderNavigation = () => {
		dispatch(setOrdersDetails({ receiverAddress, senderAddress, receiverName, receiverPhoneNumber }))
		if (isLoggedIn) {
			navigate("/order");
		} else {
			navigate("/login", { state: { onSuccessNavigation: "/order" } });
		}
	};

	return isLoaded ? (
		<>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>
				<RiderMarker />

				<UserMarker isSenderFormActive={isSenderFormActive} />
			</GoogleMap>

			<div className="location_map">
				<LocationForm isSenderFormActive={isSenderFormActive} handleOrderNavigation={handleOrderNavigation} />

				<OrderViewSection />
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
