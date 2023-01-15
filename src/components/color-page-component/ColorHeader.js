import './colorHeader.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function ColorHeader() {
    return (
        <div className="button-wrapper">
            
            <Link to="/fractals" ><button className="fr-button">Fractals</button></Link>
            
            <button className="clr-button">Colours</button>
            <Link to="/movement" ><button className="tr-button">Triangle transformation</button></Link>
            <Link to="/" ><button className="home-button">Home</button></Link>
        </div>
    );
  }
  
  export default ColorHeader;