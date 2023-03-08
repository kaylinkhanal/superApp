import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Autocomplete } from "@react-google-maps/api";

const LocationForm = (props) => {
    const navigate = useNavigate()
    const { userRole } = useSelector((state) => state.user);
    const { ordersDetails } = useSelector((state) => state.location);

    const [isSenderFormActive, setIsSenderFormActive] = useState(userRole == 'rider' ? false : true);
    const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
    const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(ordersDetails?.receiverPhoneNumber);
    const [receiverName, setReceiverName] = useState(ordersDetails?.receiverName);
    return (
        <>
            {userRole === 'user' &&
                <div className="location_form">
                    {props.isSenderFormActive ? (
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
                            <button onClick={() => { props.handleOrderNavigation(); }}><ArrowForwardOutlinedIcon /></button>
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
        </>
    )
}
export default LocationForm