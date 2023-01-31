import {Link} from "react-router-dom"

const Login = ()=>{
  return (
    <div className="App">
    Login form here...
    <Link to='/register'>Don't have an account yet?</Link>
    </div>
  );
}

export default Login;
