import { Link as RouterLink } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import NavBar from "../components/header/navBar";
import homepage from "./homepage.jpeg";
const Home = () => {
  const myInputRef = useRef(null);
  const [name, setName] = useState("hi");

  return (
    <div className="Home">
      <NavBar />
      <div
        className="HomeStyle"
        style={{
          padding: "60px 140px",
        }}
      >
        <div
          className="TextPart"
          style={{
            float: "left",
            width: "50%",
          }}
        >
          <h2
            style={{
              fontSize: "60px",
              fontWeight: "600",
              textAlign: "left",
              color: "#9096e4",
            }}
          >
            Hi, we're SuperApp.
          </h2>

          <h4
            style={{
              "font-size": "20px",
              lineHeight: "normal",
              fontWeight: "400",
              textAlign: "left",
            }}
          >
            "Send your order or take a ride with us"
          </h4>
          <Button
            style={{
              backgroundColor: "#9096e4",
              float: "left",
              marginRight: "20px",
            }}
            variant="contained"
            component={RouterLink}
            color="primary"
            to="/send-orders"
            underline="none"
          >
            Send Orders
          </Button>

          <Button
            style={{
              backgroundColor: "#9096e4",
              float: "left",
            }}
            variant="contained"
            onClick={() => myInputRef.current.focus()}
          >
            Ride
          </Button>

          <br />
          <br />
        </div>

       
         <img style={{ 'width': '40%', 'height': '500', 'float':'right' }} src={homepage} alt="website-mockup-image"></img>
      </div>
    </div>
  );
};

export default Home;
