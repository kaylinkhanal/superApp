import React, { useState } from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";

const SenderForm = () => {

    const [senderAddress, setSenderAddress] = useState(ordersDetails?.senderAddress);
    return (
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
    )
}
export default SenderForm