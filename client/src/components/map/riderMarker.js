import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import CustomMarker from "./customMarker";
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const center = {
    lat: 27.685616312450417,
    lng: 85.34456349960001,
};

const RiderMarker = () => {
    const { userRole } = useSelector((state) => state.user);
    const { selectedCardDetails } = useSelector((state) => state.order)
    return (
        <div>
            {userRole === 'rider' && (
                <>
                    <InfoWindow
                        position={selectedCardDetails.senderCoordinates?.lat ? selectedCardDetails.senderCoordinates : center}
                    >
                        <div style={{ background: `white` }}>
                            <p><LocationOnOutlinedIcon style={{ fontSize: '16px', color: '#a82973' }} /> {selectedCardDetails?.senderAddress}</p>
                            <CustomMarker
                                label="sender"
                                draggable={false}
                                icon={{ url: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png", scaledSize: new window.google.maps.Size(40, 40) }}
                                position={selectedCardDetails.senderCoordinates?.lat ? selectedCardDetails.senderCoordinates : center}
                            />
                        </div>
                    </InfoWindow>

                    <InfoWindow
                        position={selectedCardDetails.receiverCoordinates?.lat ? selectedCardDetails.receiverCoordinates : center}
                    >
                        <div style={{ background: `white` }}>
                            <p><LocationOnOutlinedIcon style={{ fontSize: '16px', color: '#a82973' }} /> {selectedCardDetails?.receiverAddress}</p>
                            <p><ContactPageOutlinedIcon style={{ fontSize: '16px', color: '#a82973' }} /> {selectedCardDetails?.receiverName}</p>
                            <p><PhoneIphoneOutlinedIcon style={{ fontSize: '16px', color: '#a82973' }} /> {selectedCardDetails?.receiverPhoneNumber}</p>
                            <CustomMarker
                                label="rider"
                                draggable={false}
                                icon={{ url: "https://cdn-icons-png.flaticon.com/512/4218/4218645.png", scaledSize: new window.google.maps.Size(37, 37) }}
                                position={selectedCardDetails.receiverCoordinates?.lat ? selectedCardDetails.receiverCoordinates : center}
                            />
                        </div>
                    </InfoWindow>
                </>
            )}
        </div>
    )
}
export default RiderMarker