import {Link} from "react-router-dom"
const Home =()=> {
  return (
    <div className="App">
        <Link to='/send-orders'>send orders</Link>
        <button>my orders</button>
        <button>ride</button>
    </div>
  );
}

export default Home;
