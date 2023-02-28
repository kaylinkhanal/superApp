import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-texts">
        <img
          src={
            "https://i.ibb.co/L9FxTHR/Pngtree-error-404-under-construction-sign-7382633.png"
          }
          alt="Logo"
          style={{ maxWidth: "300px" }}
        />
        <h2>The page you're looking for does not exist.</h2>
        <button className="button return-home" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
