import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Marker } from "@react-google-maps/api";
import { setSenderCoordinates, setReceiverCoordinates } from "../../redux/reducers/locationSlice";

const CustomMarker = (props) => {
    const dispatch = useDispatch()
    const { ordersDetails } = useSelector((state) => state.location);
    const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
    const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);

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
    return (
        <Marker
            draggable={props.draggable}
            onDragEnd={(e) => props.label == 'sender' ? assignSenderLocation(e) : assignReceiverLocation(e)}
            icon={props.icon}
            position={props.position}
        />
    )
}
export default CustomMarker