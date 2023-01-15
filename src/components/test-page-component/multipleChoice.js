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

    const [points, setPoints] = useState(8);
    function check(){
        
        var inputVal, temp=8;
        if(one !== "dragon"){
            temp--;
            inputVal = document.getElementById("one");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("one");
            inputVal.style.backgroundColor = "green";
        }

        if(two !== "imaginary"){
            temp--;
            inputVal = document.getElementById("two");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("two");
            inputVal.style.backgroundColor = "green";
        }

        if(three !== "stochastic"){
            temp--;
            inputVal = document.getElementById("three");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("three");
            inputVal.style.backgroundColor = "green";
        }

        if(four !== "randomly"){
            temp--;
            inputVal = document.getElementById("four");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("four");
            inputVal.style.backgroundColor = "green";
        }

        if(five !== "rgb"){
            temp--;
            inputVal = document.getElementById("five");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("five");
            inputVal.style.backgroundColor = "green";
        }

        if(six !== "saturation"){
            temp--;
            inputVal = document.getElementById("six");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("six");
            inputVal.style.backgroundColor = "green";
        }

        if(seven !== "blue"){
            temp--;
            inputVal = document.getElementById("seven");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("seven");
            inputVal.style.backgroundColor = "green";
        }

        if(eight !== "rotation"){
            temp--;
            inputVal = document.getElementById("eight");
            inputVal.style.backgroundColor = "red";
        }
        else{
            inputVal = document.getElementById("eight");
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
                    <div className='question'>
                        <span className='question-text'>1. Look at the picture and name the fractal:</span>
                        <img className="dagon-png" src={require('../fractal-page-components/FractalMain/pictures/dragon.png')} alt="Owl"/>
                        <input type="text" onChange={onChangeHandler} value={one} className='question-input' id="one"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>2. Complex numbers are the numbers that are expressed in the form of a+ib where, a,b are real numbers and 'i' is an ... number</span>
                        <input type="text" onChange={onChangeHandler2} value={two} className='question-input' id="two"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>3. Programmers use ... fractal to create sceneries for computer games, films and so on</span>
                        <input type="text" onChange={onChangeHandler3} value={three} className='question-input' id="three"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>4. We can get stochastic fractals by changing something in iterations of geometry and algebraic fractals ...</span>
                        <input type="text" onChange={onChangeHandler4} value={four} className='question-input' id="four"></input>
                    </div>
                    
                    <div className='question'>
                        <span className='question-text'>5. What colour scheme is presented below?</span>
                        <img className="attitude-gif" src={require('../fractal-page-components/FractalMain/pictures/RGB_colors.gif')} alt="Owl"/>
                        <input type="text" onChange={onChangeHandler5} value={five} className='question-input' id="five"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>6. In HSL colour scheme S stands for:</span>
                        <input type="text" onChange={onChangeHandler6} value={six} className='question-input' id="six"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>7. What colour falls between 241 and 300 degrees?</span>
                        <input type="text" onChange={onChangeHandler7} value={seven} className='question-input' id="seven"></input>
                    </div>

                    <div className='question'>
                        <span className='question-text'>8. There are three types of afinne transformation:Translation, Scale and ...</span>
                        <input type="text" onChange={onChangeHandler8} value={eight} className='question-input' id="eight"></input>
                    </div>

                    <button onClick={()=>check()} className='check'>Check</button>
                </div>
                
                {res &&
                    <div className='results'>
                        <span className='res-text'>Your result is {points} out of 8!</span><br/>
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