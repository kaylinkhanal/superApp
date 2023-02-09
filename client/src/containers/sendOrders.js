import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {setSenderCoordinates} from "../redux/reducers/locationSlice"
import {useDispatch, useSelector} from "react-redux"
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 27.685616312450417,
  lng: 85.34456349960001
};

const SendOrders=()=> {
  const {senderCoordinates} = useSelector(state=>state.location)
  const dispatch = useDispatch()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
  })
  const [currentCoordinates, setCurrentCoordinates] = useState()


  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      const cordinates = {lat, lng}
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


  const assignSenderLocation = (e)=>{
    const cordinates = {lat:e.latLng.lat() , lng: e.latLng.lng()}
    dispatch(setSenderCoordinates(cordinates))
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
          onDragEnd={(e)=> assignSenderLocation(e)}
          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
          position={center} />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
            <div style={{ top:50, margin:'5px', borderRadius:'5%', position:"absolute", width:'20%', height: '10%' , backgroundColor:'#fff' }}> 
        Select your pick up address
        current Browser coords: {JSON.stringify(currentCoordinates)}
        current sender coords: {JSON.stringify(senderCoordinates)}
      </div>
    </>
  ) : "Loading"
}

export default React.memo(SendOrders)
