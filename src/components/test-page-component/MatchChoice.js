import './tests.css';
import {useState} from 'react';

function MultipleChoice() {

    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    const [five, setFive] = useState("");
    const [six, setSix] = useState("");
    const [seven, setSeven] = useState("");
    const [eight, setEight] = useState("");
    const [nine, setNine] = useState("");

    const [res, setRes] = useState(false);

    const onChangeHandler = event => {
        setOne(event.target.value);
    };

    const onChangeHandler2 = event => {
        setTwo(event.target.value);
    };

    const onChangeHandler3 = event => {
        setThree(event.target.value);
    };

    const onChangeHandler4 = event => {
        setFour(event.target.value);
    };

    const onChangeHandler5 = event => {
        setFive(event.target.value);
    };

    const onChangeHandler6 = event => {
        setSix(event.target.value);
    };

    const onChangeHandler7 = event => {
        setSeven(event.target.value);
    };

    const onChangeHandler8 = event => {
        setEight(event.target.value);
    };

    const onChangeHandler9 = event => {
        setNine(event.target.value);
    };

    const [points, setPoints] = useState(8);
    function check(){
        var inputVal, temp=9;
        if(one !== "B"){
            temp--;
            inputVal = document.getElementById("one");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("one");
            inputVal.style.backgroundColor = "green";
        }

        if(two !== "C"){
            temp--;
            inputVal = document.getElementById("two");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("two");
            inputVal.style.backgroundColor = "green";
        }

        if(three !== "A"){
            temp--;
            inputVal = document.getElementById("three");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("three");
            inputVal.style.backgroundColor = "green";
        }

        if(four !== "C"){
            temp--;
            inputVal = document.getElementById("four");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("four");
            inputVal.style.backgroundColor = "green";
        }

        if(five !== "A"){
            temp--;
            inputVal = document.getElementById("five");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("five");
            inputVal.style.backgroundColor = "green";
        }

        if(six !== "B"){
            temp--;
            inputVal = document.getElementById("six");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("six");
            inputVal.style.backgroundColor = "green";
        }

        if(seven !== "B"){
            temp--;
            inputVal = document.getElementById("seven");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("seven");
            inputVal.style.backgroundColor = "green";
        }

        if(eight !== "C"){
            temp--;
            inputVal = document.getElementById("eight");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("eight");
            inputVal.style.backgroundColor = "green";
        }

        if(nine !== "A"){
            temp--;
            inputVal = document.getElementById("nine");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("nine");
            inputVal.style.backgroundColor = "green";
        }

        setPoints(temp);
        setRes(true);

    }

    function close(){
        setRes(false);
    }
     

    return (
        <>
            <div className="total-question-wrapper">
                <div className="inside-question-wrapper">
                    <span className='task-subheader'>1. Match the fractals and their types:</span>

                    <div className='matches'>
                        <div className='first-part'>
                            <span className='choice-text'>1. Koch snowflake</span>
                            <span className='choice-text'>2. Randomized Koch fractal</span>
                            <span className='choice-text'>3. Julie fractal</span>
                        </div>

                        <div className='second-part'>
                            <span className='choice-text'>A. Algebraic</span>
                            <span className='choice-text'>B. Geometry</span>
                            <span className='choice-text'>C. Stochastic</span>
                        </div>
                    </div>

                    <div className='matches'>
                        <div className='first-part'>
                            <span className='match-text'>1. </span>
                            <span className='match-text'>2. </span>
                            <span className='match-text'>3. </span>
                        </div>

                        <div className='second-part'>
                            <input type="text" onChange={onChangeHandler} value={one} className='match-input' id="one"></input>
                            <input type="text" onChange={onChangeHandler2} value={two} className='match-input' id="two"></input>
                            <input type="text" onChange={onChangeHandler3} value={three} className='match-input' id="three"></input>
                        </div>
                    </div>

                    <span className='task-subheader'>2. Match the channels and their maximum value:</span>

                    <div className='matches'>
                        <div className='first-part'>
                            <span className='choice-text'>1. Hue</span>
                            <span className='choice-text'>2. Red</span>
                            <span className='choice-text'>3. Saturation</span>
                        </div>

                        <div className='second-part'>
                            <span className='choice-text'>A. 255</span>
                            <span className='choice-text'>B. 1</span>
                            <span className='choice-text'>C. 360</span>
                        </div>
                    </div>

                    <div className='matches'>
                        <div className='first-part'>
                            <span className='match-text'>1. </span>
                            <span className='match-text'>2. </span>
                            <span className='match-text'>3. </span>
                        </div>

                        <div className='second-part'>
                            <input type="text" onChange={onChangeHandler4} value={four} className='match-input' id="four"></input>
                            <input type="text" onChange={onChangeHandler5} value={five} className='match-input' id="five"></input>
                            <input type="text" onChange={onChangeHandler6} value={six} className='match-input' id="six"></input>
                        </div>
                    </div>
                    
                    <span className='task-subheader'>3. Match the channels and their maximum value:</span>

                    <div className='matches'>
                        <div className='first-part'>
                            <div className='picture-match'>
                                <span className='choice-text'>1. <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/translation.jpg')} alt="Owl"/></span>
                            </div>
                            <div className='picture-match'>
                                <span className='choice-text'>2. <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/scale.jpg')} alt="Owl"/></span>
                            </div>
                            <div className='picture-match'>
                                <span className='choice-text'>3. <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/rotation.jpg')} alt="Owl"/></span>
                            </div>
                        </div>

                        <div className='second-part'>
                            <span className='choice-text'>A. Rotation</span>
                            <span className='choice-text'>B. Translation</span>
                            <span className='choice-text'>C. Scale</span>
                        </div>
                    </div>

                    <div className='matches'>
                        <div className='first-part'>
                            <span className='match-text'>1. </span>
                            <span className='match-text'>2. </span>
                            <span className='match-text'>3. </span>
                        </div>

                        <div className='second-part'>
                            <input type="text" onChange={onChangeHandler7} value={seven} className='match-input' id="seven"></input>
                            <input type="text" onChange={onChangeHandler8} value={eight} className='match-input' id="eight"></input>
                            <input type="text" onChange={onChangeHandler9} value={nine} className='match-input' id="nine"></input>
                        </div>
                    </div>

                    

                    <button onClick={()=>check()} className='check'>Check</button>
                </div>
                
                {res &&
                    <div className='results'>
                        <span className='res-text'>Your result is {points} out of 9!</span><br/>
                        {
                            (points <4)
                            ?<span className='res-text'>You should study some more material!</span>
                            :<span className='res-text'>Good job! You've learnt the topic well!</span>
                        }
                        <img className="owl-res" src={require('../fractal-page-components/FractalMain/pictures/test-owl.png')} alt="Owl"/>
                        <button className='ok' onClick={()=>close()}>Ok</button>
                    </div>
                }
            </div>
        
        </>
    );
  }
  
  export default MultipleChoice;