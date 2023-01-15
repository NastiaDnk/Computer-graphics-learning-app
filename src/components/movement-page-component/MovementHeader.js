import './movementHeader.css';
import {BrowserRouter as  Link} from "react-router-dom";

function MovementHeader() {
    return (
        <div className="button-wrapper">
            
            <Link to="/fractals" ><button className="fr-button">Fractals</button></Link>
            
            <Link to="/colours" ><button className="button">Colours</button></Link>
            <button className="mvm-button">Triangle transformation</button>
            <Link to="/" ><button className="home-button">Home</button></Link>
        </div>
    );
  }
  
  export default MovementHeader;