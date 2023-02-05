import { Link } from 'react-router-dom'
import NavBar from "../components/header/navBar"
const Home =()=> {
  return (
    <div className="App">
        <NavBar/>
        <Link to='/send-orders'>send orders</Link>
        <button>ride</button>
    </div>
  );
}

export default Home;
