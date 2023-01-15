import './fractalHeader.css';
import {BrowserRouter as  Link} from "react-router-dom";

function FractalHeader() {
    return (
      <div className="header">
        <div className="button-wrapper">
            <button className="fractal-button">Fractals</button>
            <Link to="/colours" ><button className="colour-button">Colours</button></Link>
            <Link to="/movement" ><button className="triangle-button">Triangle transformation</button></Link>
            <Link to="/" ><button className="home-button">Home</button></Link>
        </div>
      </div>
    );
  }
  
  export default FractalHeader;