import './main.css';

import {useState} from 'react';
import {BrowserRouter as  Link} from "react-router-dom";

function Main() {
    const [fractalTip, setFractalTip ] = useState(false);

    return (
      <div className="main">
        <div className="greeting-button-wrapper">
            <div className="greeting-wrapper">
                <span className='greeting-home-text'>Hello, friend! My name is Whootie and I welcome you to the Graphics Hollow! Here we gonna explore an amazing world of 
                  fractals, colours and geometry movement!
                </span>
            </div>

            <Link to="/fractals" ><button className='start-button'>Start</button></Link>
            
        </div>
        <img className="owl-greet" src={require('../../fractal-page-components/FractalMain/pictures/owl-hat.png')} alt="Owl"/>
      </div>
    );
  }
  
  export default Main;