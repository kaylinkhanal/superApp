import { BiError, BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="error-page">
      <div>
        <h1>
          404
          <BiError />
        </h1>
        <h2>Oops! Looks like you got lost.</h2>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
