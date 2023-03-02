import React, { useState } from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { setOrdersDetails } from "../redux/reducers/locationSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Autocomplete } from "@react-google-maps/api";

const ReceiverForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { ordersDetails } = useSelector((state) => state.location);
    const { isLoggedIn } = useSelector((state) => state.user);

    // const [receiverAddress, setReceiverAddress] = useState(ordersDetails?.receiverAddress);
    // const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(ordersDetails?.receiverPhoneNumber);
    // const [receiverName, setReceiverName] = useState(ordersDetails?.receiverName);

    const handleOrderNavigation = () => {
        dispatch(setOrdersDetails({ receiverAddress, senderAddress, receiverName, receiverPhoneNumber }))
        if (isLoggedIn) {
            navigate("/order");
        } else {
            navigate("/login", { state: { onSuccessNavigation: "/order" } });
        }
    };
    return (
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
    )
}
export default ReceiverForm