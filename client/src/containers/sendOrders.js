import React, { useState, useRef, useEffect } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Autocomplete,
	InfoWindow,
	DirectionsRenderer,
	Circle,
	DirectionsService
} from "@react-google-maps/api";
import { io } from 'socket.io-client';
import {
	setSenderCoordinates,
	setReceiverCoordinates,
	setOrdersDetails,
} from "../redux/reducers/locationSlice";
import {
	changeOrderStatusId
} from "../redux/reducers/orderSlice";
import orderStatusMap from "../config/orderStatusMap.json"
import OrderList from "./sharedScreens/orderList"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import LoadingCircle from "../components/loadingCircle";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'

const containerStyle = {
	width: "100%",
	height: "100vh",
};
const socket = io(process.env.REACT_APP_BASE_URL);
const center = {
	lat: 27.685616312450417,
	lng: 85.34456349960001,
};

const SendOrders = () => {
	const { senderCoordinates, receiverCoordinates, ordersDetails } = useSelector((state) => state.location);
	const { selectedCardDetails } = useSelector((state) => state.order)
	const [shouldFetchOrder, setShouldFetchOrder] = useState(false)
	const [orderStatusId, setOrderStatusId] = useState(selectedCardDetails?.orderStatusId || 0)
	const { isLoggedIn, userRole } = useSelector((state) => state.user);
	const [isSenderFormActive, setIsSenderFormActive] = useState(userRole == 'rider' ? false : true);
	const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
	const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);
	const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(ordersDetails?.receiverPhoneNumber);
	const [receiverName, setReceiverName] = useState(ordersDetails?.receiverName);
	const [response, setResponse] = useState(null)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});
	const [currentCoordinates, setCurrentCoordinates] = useState();

	const [map, setMap] = React.useState(null);

	useEffect(() => {
		socket.on('connection');

		return () => {
			socket.off('connection');
		};
	})
	const onLoad = React.useCallback(function callback(map) {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lng = position.coords.longitude;
			const cordinates = { lat, lng };
			setCurrentCoordinates(cordinates);
		});
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		// map.setZoom(zoom)
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

	useEffect(() => {
	}, [orderStatusId])
	const [isOrderListOpen, setIsOrderListOpen] = useState(false);
	const CustomMarker = (props) => {
		return (
			<Marker
				draggable={props.draggable}
				onDragEnd={(e) => props.label == 'sender' ? assignSenderLocation(e) : assignReceiverLocation(e)}
				icon={props.icon}
				position={props.position}
			/>
		)
	}

	const handleAcceptance = () => {
		socket.emit("greetings", "hi")
	}

	const options = {
		strokeColor: '#388AF6',
		strokeOpacity: 1,
		strokeWeight: 2,
		fillColor: "#388AF6",
		fillOpacity: 0.5,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		radius: 40,
		zIndex: 1
	}
	const changeStatus = () => {
		//sending current orderDetails to server
		const ordersDetails = {
			_id: selectedCardDetails._id,
			currentOrderstatusId: selectedCardDetails.orderStatusId
		}
		socket.emit('orderRequests', ordersDetails)
		setShouldFetchOrder(true)
		//updating orderStatusId in the UI
		dispatch(changeOrderStatusId())
	}


	const shouldResetFetchOrder = (value) => {
		console.log(value)
		setShouldFetchOrder(false)
	}

	return isLoaded ? (
		<>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} onLoad={onLoad} onUnmount={onUnmount}>
				<Circle
					center={center}
					options={options}
				/>
				{userRole === 'rider' && selectedCardDetails && selectedCardDetails?.receiverCoordinates && (
					<>
						{/* <DirectionsService
							options={{
								destination: Object.values(selectedCardDetails?.receiverCoordinates).join(','),
								origin: Object.values(selectedCardDetails?.senderCoordinates).join(','),
								travelMode: 'DRIVING'
							}}
							callback={(response) => setResponse(response)}
						/> */}

						{/* {
							response !== null && (
								<DirectionsRenderer
									options={{
										directions: response
									}}
								/>
							)
						} */}
						<>
							{orderStatusMap[selectedCardDetails.orderStatusId].position == 'A' ? (
								<InfoWindow
									position={selectedCardDetails.senderCoordinates?.lat ? selectedCardDetails.senderCoordinates : center}
								>
									<div className="infobox"
										style={{ background: 'var(--accent)', color: '#fff' }}>
										{orderStatusMap[selectedCardDetails.orderStatusId]?.message}

										<button onClick={() => changeStatus()} style={{
											background: 'rgb(255 255 255 / 30%)', border: 0, padding: '5px'
										}}>
											Yes
										</button>
										
									</div>
								</InfoWindow>
							) : (
								<InfoWindow
									position={selectedCardDetails.receiverCoordinates?.lat ? selectedCardDetails.receiverCoordinates : center}
								>
									<div className="infobox" style={orderStatusMap[selectedCardDetails.orderStatusId].status == 'delivered' ?
										{ background: '#409a44', color: '#fff' } :
										{ background: 'var(--accent)', color: '#fff' }}
									>
										{orderStatusMap[selectedCardDetails.orderStatusId]?.message}
										{!orderStatusMap[selectedCardDetails.orderStatusId]?.hideButton ? (
											<button onClick={() => changeStatus()} style={{
												background: 'rgb(255 255 255 / 30%)', border: 0, padding: '5px'
											}}>
												Yes
											</button>
										) : null}

									</div>
								</InfoWindow>
							)}
						</>
					</>
				)}

				{userRole !== 'rider' && isSenderFormActive ? (
					<>
						<CustomMarker
							label="sender"
							draggable={true}
							icon={{ url: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png", scaledSize: new window.google.maps.Size(40, 40) }}
							position={senderCoordinates.lat ? senderCoordinates : center}
						/>
					</>
				) : (
					<>
						{userRole !== 'rider' && (
							<CustomMarker
								label="rider"
								draggable={true}
								icon={{ url: "https://cdn-icons-png.flaticon.com/512/4218/4218645.png", scaledSize: new window.google.maps.Size(37, 37) }}
								position={receiverCoordinates.lat ? receiverCoordinates : center}
							/>
						)}
					</>
				)}

				{/* Child components, such as markers, info windows, etc. */}
			</GoogleMap>

			<div className="location_map">
				{userRole === 'user' &&
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
				}

				{isLoggedIn &&
					<>
						<button
							onClick={() => setIsOrderListOpen(!isOrderListOpen)}
							className="btn"
							style={{ margin: '0 0 8px 0 ' }}>
							<span>
								{!isOrderListOpen && userRole === 'user' ? 'Check your orders' :
									!isOrderListOpen && userRole === 'rider' ? 'All Orders' : 'Close'}
							</span>
						</button>
						<div style={{ overflow: 'hidden' }}>
							<div className="order_list" style={!isOrderListOpen ? {
								transition: `transform 250ms ease-in-out`,
								transform: "translateY(-101%)"
							} : {
								transition: `transform 250ms ease-in-out`,
								transform: "translateY(0)"
							}}>
								<OrderList shouldFetchOrder={shouldFetchOrder} shouldResetFetchOrder={shouldResetFetchOrder} />
							</div>
						</div>
					</>
				}
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
