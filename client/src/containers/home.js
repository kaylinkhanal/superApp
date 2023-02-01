import { Link } from "react-router-dom";

const Home =()=> {
  return (
    <div className="App">
      <Link to='/send-orders'>send order</Link>
      <button>my order</button>
      <button>ride</button>
    </div>
  );
}

export default Home;
