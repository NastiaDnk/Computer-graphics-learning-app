import './testPage.css';
import {useState} from 'react';
import AlgebraicFractal from '../tips-component/AlgebraicFractal.js'
import GeometrycFractals from '../tips-component/GeometryFractal.js';
import StochasticFractals from '../tips-component/StochasticFractals.js';
import ColourSchemes from '../tips-component/ColourSchemes.js';
import MovementTip from '../tips-component/MovementTip.js';
import MultipleChoice from './multipleChoice';
import MatchChoices from './MatchChoice';
import {Link} from "react-router-dom";

function TestPage() {

    const [showOrdTest, setShowOrdTest] = new useState(false);
    const [showGameTest, setShowGameTest] = new useState(false);

    const [showAlFrTip, setShowAlFrTip] = new useState(false);
    const [showGeomFrTip, setShowGeomFrTip] = new useState(false);
    const [showStochFrTip, setShowStochFrTip] = new useState(false);
    const [showColTip, setShowColTip] = new useState(false);
    const [moveColTip, setMoveColTip] = new useState(false);

    const [multipleChoice, setMultipleChoice] = new useState(false);
    const [matchChoice, setMatchChoice] = new useState(false);


    


    function selectTip(){
        var e = document.getElementById("tips");
        var value = e.value;

        if(value === "algebraic")
            setShowAlFrTip(true);
        else if(value==="geometry")
            setShowGeomFrTip(true);
        else if(value==="stochastic")
            setShowStochFrTip(true);
        else if(value==="schemes")
            setShowColTip(true);
        else if(value==="move")
            setMoveColTip(true);
    }

    function closeClicked(){
        var e = document.getElementById("tips");
        var value = e.value;
        if(value === "algebraic")
            setShowAlFrTip(false);
        else if(value==="geometry")
            setShowGeomFrTip(false);
        else if(value==="stochastic")
            setShowStochFrTip(false);
        else if(value==="schemes")
            setShowColTip(false);
        else if(value==="move")
            setMoveColTip(false);
    }

    function showMultipleChoice(){
        setMultipleChoice(true);
    }

    function cancelMultipleChoice(){
        setMultipleChoice(false);
    }

    function showMatchChoice(){
        setMatchChoice(true);
    }

    function cancelMatchChoice(){
        setMatchChoice(false);
    }

    return (
        <>
        

        <div className='header-test'>
            <span className='header-test-text'>Tests</span>
        </div>
        <div className="ordinary-tests-wrapper">
            
            <div className='test-types-selection'>
                <div className='test-cont'>
                    <div>
                        <div className='select-test-wrapper'>
                            <img className="multiple-img" src={require('../fractal-page-components/FractalMain/pictures/matching.png')} alt="Owl" 
                            onClick={()=>showMatchChoice()}/>
                            <span className="multiple-text" >Match the correct answer</span>
                        </div>
                        <div className='select-test-wrapper'>
                            <img className="multiple-img" src={require('../fractal-page-components/FractalMain/pictures/fill.png')} alt="Owl"
                            onClick={()=>showMultipleChoice()}/>
                            <span className="multiple-text">Fill in the correct word</span>
                        </div>
                    </div>
                   
                    <img className="test-decision-owl" src={require('../fractal-page-components/FractalMain/pictures/test-owl.png')} alt="Owl"/>
                </div>
                
                {/**/}
            </div>
            <div className='for-m'>
                <div className='owl-text-div'>
                <span className='owl-text'>Mind that these test include <b>all</b> topic! <br/>To remind the material select any topic from the dropdown or 
                go to the <b>home page</b> and start your learning again!</span>
                <select name="cars" id="tips" onChange={()=>selectTip(this)} className="select-pos">
                    <optgroup label="Fractals">
                        <option value="geometry">Geometry fractals</option>
                        <option value="algebraic">Algebraic fractals</option>
                        <option value="stochastic">Stochastic fractals</option>
                    </optgroup>
                    <optgroup label="Colours">
                        <option value="schemes">Colour schemes</option>
                    </optgroup>
                    <optgroup label="Movement">
                        <option value="move">Movements</option>
                    </optgroup>
                </select>
                <Link to="/" ><button className='go-home-btn'>Home</button></Link>
                </div>
            </div>
            
        </div>

        {showAlFrTip && 
            <div><AlgebraicFractal />
            <div className='close-btn' onClick={()=>closeClicked()}>
                        <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                    </div>
            </div>
        }

        {showGeomFrTip &&
            <div><GeometrycFractals />
                <div className='close-btn' onClick={()=>closeClicked()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }

        {showStochFrTip &&
            <div><StochasticFractals />
                <div className='close-btn' onClick={()=>closeClicked()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }

        {showColTip &&
            <div><ColourSchemes />
                <div className='close-btn' onClick={()=>closeClicked()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }   

        {moveColTip &&
            <div><MovementTip />
                <div className='close-btn' onClick={()=>closeClicked()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        } 

        {multipleChoice && 
        <div>
            <MultipleChoice/>
                <div className='close-btn' onClick={()=>cancelMultipleChoice()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
        </div> 
        }

        {matchChoice && 
        <div>
            <MatchChoices/>
                <div className='close-btn' onClick={()=>cancelMatchChoice()}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
        </div> 
        }
        </>
    );
  }
  
  export default TestPage;