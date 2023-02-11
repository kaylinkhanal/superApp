import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { setSenderCoordinates } from "../redux/reducers/locationSlice"
import { useDispatch, useSelector } from "react-redux"
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
const containerStyle = {
	width: '100%',
	height: '100vh'
};

const center = {
	lat: 27.685616312450417,
	lng: 85.34456349960001
};

const SendOrders = () => {

	const [isSenderFormActive, setIsSenderFormActive] = useState(true)
	const [senderAddress, setSenderAddress] = useState('')
	const { senderCoordinates } = useSelector(state => state.location)
	const dispatch = useDispatch()
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: ['places']
	})
	const [currentCoordinates, setCurrentCoordinates] = useState()

	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map) {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lng = position.coords.longitude;
			const cordinates = { lat, lng }
			setCurrentCoordinates(cordinates)
		});
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, [])


	const assignSenderLocation = (e) => {
		const cordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() }
		dispatch(setSenderCoordinates(cordinates))
		fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
			.then(res => res.json())
			.then(data => setSenderAddress(data.features[0].properties.formatted))
	}

	return isLoaded ? (
		<>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={14}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<Marker
					draggable={true}
					onDragEnd={(e) => assignSenderLocation(e)}
					icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
					position={center} />
				{ /* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
			<div className='location_map'>
				<div className='info'>
					<h3 >Select your pick up address</h3>
					{/* current Browser coords: {JSON.stringify(currentCoordinates)}<br />
					current sender coords: {JSON.stringify(senderCoordinates)}<br /> */}
				</div>

				<div className='location_form'>
					{isSenderFormActive ?
						(<>
							<Autocomplete>
								<input placeholder="Sender address" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} />
							</Autocomplete>
							<button onClick={() => setIsSenderFormActive(false)}><ArrowForwardOutlinedIcon /></button>
						</>) :
						(<input placeholder="Receiver address" />)
					}
				</div>

			</div>
		</>
	) : "Loading"
}

export default React.memo(SendOrders)
