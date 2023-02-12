import { Link } from "react-router-dom";
import { Button, TextField, Fab } from "@mui/material";

import { useRef, useState, useEffect } from "react";
import NavBar from "../components/header/navBar";
const Home = () => {
  const myInputRef = useRef(null);
  const [name, setName] = useState("hi");

  return (
    <div className="App">
      <NavBar />
      <Fab>{<Link to="/send-orders">send orders</Link>}</Fab>
      <Button onClick={() => myInputRef.current.focus()}>ride</Button>
      <TextField
        ref={myInputRef}
        onKeyUp={(e) => console.log(e)}
        placeholder="Enter a name"
      />
    </div>
  );
};

export default Home;
