import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import NavBar from "../components/header/navBar";

const Home = () => {
  const myInputRef = useRef(null);
  const [name, setName] = useState("hi");
  return (
    <div className="App">
      <NavBar />
      <Link to="/send-orders">send orders</Link>
      <button onClick={() => myInputRef.current.focus()}>ride</button>
      <input ref={myInputRef} placeholder="Enter a name" />
    </div>
  );
};

export default Home;
