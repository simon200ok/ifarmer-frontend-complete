import Navbar from "../Components/Navbar";
import "./Homepage.css";
import LeftPane from "../Components/LeftPane";

function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main-content">
        <div className="left-pane">
          <LeftPane />
        </div>
        <div className="right-content">
          <h1>Welcome to the iFarm demo application!</h1>
          <p>
            Use the navigation bar above to access other pages of the
            application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
