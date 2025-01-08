import "./LeftPane.css";
import farmerImage from "../assets/farmer.png";

function LeftPane() {
  return (
    <div className="left">
      <div className="overlay">
        <div className="text">
          <h1>Welcome Back</h1>
          <img src={farmerImage} alt="Farmer Image" className="farmer" />
        </div>
      </div>
    </div>
  );
}

export default LeftPane;
