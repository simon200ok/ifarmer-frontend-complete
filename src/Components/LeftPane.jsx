import "./LeftPane.css";
import farmerImage from "../assets/farmer.png";

function LeftPane({ message }) {
  return (
    <div className="left">
      <div className="overlay">
        <div className="text">
          <h1>{message}</h1>
          <img src={farmerImage} alt="Farmer Image" className="farmer" />
        </div>
      </div>
    </div>
  );
}

export default LeftPane;
