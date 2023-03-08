import React from "react";
import { useSelector } from "react-redux";
import CustomMarker from "./customMarker";

const center = {
    lat: 27.685616312450417,
    lng: 85.34456349960001,
};

const UserMarker = (props) => {
    const { userRole } = useSelector((state) => state.user);
    const { senderCoordinates, receiverCoordinates } = useSelector((state) => state.location);

    return (
        <div>
            {userRole !== 'rider' && props.isSenderFormActive ? (
                <CustomMarker
                    label="sender"
                    draggable={true}
                    icon={{ url: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png", scaledSize: new window.google.maps.Size(40, 40) }}
                    position={senderCoordinates.lat ? senderCoordinates : center}
                />
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
        </div>
    )
}
export default UserMarker