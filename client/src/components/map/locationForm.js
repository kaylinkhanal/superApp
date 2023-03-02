import React, { useState, useRef } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
import {
    setSenderCoordinates,
    setReceiverCoordinates,
    setOrdersDetails,
} from "../redux/reducers/locationSlice";
import OrderList from "./sharedScreens/orderList"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SenderForm from "./senderForm";
import ReceiverForm from "./receiverform";
import OrderList from "../../containers/sharedScreens/orderList";

const SendOrders = (props) => {

    // const [isSenderFormActive, setIsSenderFormActive] = useState(true);

    const [slide, setSlide] = useState(false);
    const toggleSlise = () => {
        if (!slide) {
            setSlide(true)
        } else {
            setSlide(false)
        }

    }

    return (
        <>
            <div className="location_map">
                <div className="location_form">
                    {props.isSenderFormActive ? <SenderForm /> : <ReceiverForm />}
                </div>

                <button onClick={() => toggleSlise()} className="btn" slide={slide}>
                    <TrendingFlatIcon /> <span>Check your orders</span>
                </button>

                <OrderList />
            </div>

        </>
    )
};

export default React.memo(SendOrders);
