import './fractalMain.css';
import DragonTip from './DragonTip.js'
import KochTip from './KochTip.js'
import {useState} from 'react';
import React, { useRef, useEffect } from 'react';


function FractalMain() {
    const [nVal, setNVal] = useState('');
    const [show, setShow] = useState(false);
    const [showFR, setShowFR] = useState(false);

    const [disableRange, setDisableRange] = useState(true);

    const [openError, setOpenError] = useState(false);
    const [openErrorDragon, setOpenErrorDragon] = useState(false);

    function getN(val){
        setNVal(val.target.value.replace(/[^0-9]/g, ""));
              
    }

    

    const zoom = (event) => { //zoom of canvas
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        const scrVal = 1.1;
        ClearCanvas();
        if(event.deltaY < 0) { //zoom in
            if(buildKoch === true){
                setPointsKochCurve({
                    p1: { x: stPtKoch.p1.x * scrVal, y: stPtKoch.p1.y * scrVal },
                    p2: { x: stPtKoch.p2.x * scrVal, y: stPtKoch.p2.y * scrVal }
                })
                DrawKochCurve(nVal,stPtKoch.p1.x, stPtKoch.p1.y, stPtKoch.p2.x, stPtKoch.p2.y);
            }
            else if(buildInvertedKoch === true){
                setPointsKochInvertedCurve({
                    p1: { x: stPtInvertKoch.p1.x * scrVal, y: stPtInvertKoch.p1.y * scrVal },
                    p2: { x: stPtInvertKoch.p2.x * scrVal, y: stPtInvertKoch.p2.y * scrVal },
                    p3: { x: stPtInvertKoch.p3.x * scrVal, y: stPtInvertKoch.p3.y * scrVal }
                })
                drawInvertedKochFractal();
            }
            else{
                setPointsDragonFractal({
                    p1: { x: stPtDragonFractal.p1.x * scrVal, y: stPtDragonFractal.p1.y * scrVal },
                    p2: { x: stPtDragonFractal.p2.x * scrVal, y: stPtDragonFractal.p2.y * scrVal }
                })
                drawDragonFractal(nVal,stPtDragonFractal.p1.x,stPtDragonFractal.p1.y,stPtDragonFractal.p2.x,stPtDragonFractal.p2.y);
            }
        } else {  //zoom out
            if(buildKoch === true){
                setPointsKochCurve({
                    p1: { x: stPtKoch.p1.x / scrVal, y: stPtKoch.p1.y / scrVal },
                    p2: { x: stPtKoch.p2.x / scrVal, y: stPtKoch.p2.y / scrVal }
                })
                DrawKochCurve(nVal,stPtKoch.p1.x,stPtKoch.p1.y,stPtKoch.p2.x,stPtKoch.p2.y);
            }
            else if(buildInvertedKoch === true){
                setPointsKochInvertedCurve({
                    p1: { x: stPtInvertKoch.p1.x / scrVal, y: stPtInvertKoch.p1.y / scrVal },
                    p2: { x: stPtInvertKoch.p2.x / scrVal, y: stPtInvertKoch.p2.y / scrVal },
                    p3: { x: stPtInvertKoch.p3.x / scrVal, y: stPtInvertKoch.p3.y / scrVal }
                })
                drawInvertedKochFractal();
            }
            else{
                setPointsDragonFractal({
                    p1: { x: stPtDragonFractal.p1.x / scrVal, y: stPtDragonFractal.p1.y / scrVal },
                    p2: { x: stPtDragonFractal.p2.x / scrVal, y: stPtDragonFractal.p2.y / scrVal }
                })
                drawDragonFractal(nVal,stPtDragonFractal.p1.x,stPtDragonFractal.p1.y,stPtDragonFractal.p2.x,stPtDragonFractal.p2.y);
            }
        }
    }

    const pointsKochCurve = { //starting points
        p1: { x: 50, y: 380 },
        p2: { x: 730, y: 380 }
    };

    const pointsKochInvertedCurve = {//starting points
        p1: { x: 100, y: 523.9},
        p2: { x: 700, y: 523.9 },
        p3: { x: 400, y: 4.8334 }
    };

    const pointsDragonFractal = {//starting points
        p1: { x: 180, y: 240},
        p2: { x: 660, y: 240 }
    }


    function download() { //downloading of fractal picture
        var canvas = document.getElementById("fractal-canvas");
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "Fractal.png";
        anchor.click();
    }

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const mouseDown = (event) => { //dragging canvas
        setStartX(parseInt(event.clientX));
        setStartY(parseInt(event.clientY));
        setIsDragging(true);
        event.currentTarget.style.cursor = 'pointer';
    } 

    const mouseUp = (event) => {//end of dragging
        if(!isDragging) 
            return;
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
    }

    const mouseOut = (event) => {//end of dragging
        if(!isDragging)
            return;
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
    }

    const mouseMove = (event) => { //moving canvas function
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        if(!isDragging)
            return;
        ClearCanvas();
        let mouseX = parseInt(event.clientX);
        let mouseY = parseInt(event.clientY);
        let dx = mouseX - startX; //finding coordinates of canvas
        let dy = mouseY - startY;//finding coordinates of canvas
        setStartX(mouseX);
        setStartY(mouseY);
        if(buildKoch === true){
            setPointsKochCurve({
                p1: { x: stPtKoch.p1.x + dx, y: stPtKoch.p1.y + dy },
                p2: { x: stPtKoch.p2.x + dx, y: stPtKoch.p2.y + dy }
            })
            DrawKochCurve(nVal,stPtKoch.p1.x,stPtKoch.p1.y,stPtKoch.p2.x,stPtKoch.p2.y);
        }
        else if(buildInvertedKoch === true){
            setPointsKochInvertedCurve({
                p1: { x: stPtInvertKoch.p1.x + dx, y: stPtInvertKoch.p1.y + dy },
                p2: { x: stPtInvertKoch.p2.x + dx, y: stPtInvertKoch.p2.y + dy },
                p3: { x: stPtInvertKoch.p3.x + dx, y: stPtInvertKoch.p3.y + dy }
            })
            drawInvertedKochFractal();
        }
        else{
            setPointsDragonFractal({
                p1: { x: stPtDragonFractal.p1.x + dx, y: stPtDragonFractal.p1.y + dy },
                p2: { x: stPtDragonFractal.p2.x + dx, y: stPtDragonFractal.p2.y + dy }
            })
            drawDragonFractal(nVal,stPtDragonFractal.p1.x,stPtDragonFractal.p1.y,stPtDragonFractal.p2.x,stPtDragonFractal.p2.y);
        }
    }

    //hooks for points
    const canvas = useRef(null)
    const [stPtKoch, setPointsKochCurve] = useState(pointsKochCurve);
    const [stPtInvertKoch, setPointsKochInvertedCurve] = useState(pointsKochInvertedCurve);
    const [stPtDragonFractal, setPointsDragonFractal] = useState(pointsDragonFractal);

    //hooks for panels
    const [showDragonPanel, setShowDragonPanel] = useState(false);
    const [showKochPanel, setShowKochPanel] = useState(false);
    const [showGreetingPanel, setShowGreetingPanel] = useState(true);

    const [buildKoch, setBuildKoch] = useState(false);
    const [buildInvertedKoch, setBuildInvertedKoch] = useState(false);

    //variables for colours
    var colorIndex =2, isDescending=false;
    var colorsDesert = [ '#46211a', '#693d3d', '#ba5536', '#a43820' ];
    var colorsForest = [ '#8d230f', '#1e434c', '#9b4f0f', '#c99e10' ];
    var colorsSea = ['#E53C22', '#4EB5A9', '#FFE085', '#555AB5' ]
    var colorsWinterSunrise = ['#2377A4', '#FFA6DC', '#50A3C6', '#FF71BE' ]
   

    let ctx;
    
//////changing colour index
    var alterColorIndex = function() {
        if(colorIndex===0)    {
            colorIndex++;
            isDescending = false;
        }else if(colorIndex===3){
            colorIndex--;
            isDescending = true;
        }
        else if(colorIndex<3 && (!isDescending))
            colorIndex++;
        
        else if(colorIndex<3 && isDescending)
            colorIndex--;
    }

    var direction = 1;

    //function to draw dragon fractal
    function drawDragonFractal(level, x1, y1, x3, y3){
        var triangleHeight, x2, y2;
        var hypotenuseLength, legLength, square;
        ctx.beginPath();
        if(level===0){ //Colour selection
            if(colorSelected === 'Forest theme')
                ctx.strokeStyle = colorsForest[ colorIndex ];
            else if(colorSelected === 'Desert theme')
                ctx.strokeStyle = colorsDesert[ colorIndex ];
            else if(colorSelected === 'Spring theme')
                ctx.strokeStyle = colorsSea[ colorIndex ];
            else if(colorSelected === 'Winter sunrise')
                ctx.strokeStyle = colorsWinterSunrise[ colorIndex ];
            ctx.lineWidth = line_width;;
            ctx.setLineDash(alterLineStyle());
            ctx.moveTo(x1, y1);
            ctx.lineTo(x3, y3);
            ctx.stroke();
            
            alterColorIndex();
        }
        else{
            hypotenuseLength = Math.sqrt(Math.pow((x1-x3),2)+Math.pow((y1-y3),2)); //
            legLength = hypotenuseLength/Math.sqrt(2); //
            square = legLength*legLength/2; //                  Calculations for heigth
            triangleHeight = square*2 /hypotenuseLength; //

            if(direction>0){
                x2 = (x1+x3)/2 + (triangleHeight/Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y1-y3),2)))*(y1-y3); //point for new segments
                y2 = (y1+y3)/2 + (triangleHeight/Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y1-y3),2)))*(x3-x1);
                direction *= (-1);
            }
            else{
                x2 = (x1+x3)/2 - (triangleHeight/Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y1-y3),2)))*(y1-y3);
                y2 = (y1+y3)/2 - (triangleHeight/Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y1-y3),2)))*(x3-x1);
            }
            drawDragonFractal(level-1, x2, y2, x1, y1); //recursive call of function
            drawDragonFractal(level-1, x2, y2, x3, y3); //recursive call of function
        }
    }
      
    //first call to draw inverted Koch
    function drawInvertedKochFractal(){
        if(nVal === ''){
            setDisableRange(false);
            ctx.beginPath();
            ctx.setLineDash(alterLineStyle());
            ctx.moveTo(stPtInvertKoch.p1.x, stPtInvertKoch.p1.y);
            ctx.lineTo(stPtInvertKoch.p2.x, stPtInvertKoch.p2.y);
            ctx.stroke();
            ctx.moveTo(stPtInvertKoch.p2.x, stPtInvertKoch.p2.y);
            ctx.lineTo(stPtInvertKoch.p3.x, stPtInvertKoch.p3.y);
            ctx.stroke();
            ctx.moveTo(stPtInvertKoch.p1.x, stPtInvertKoch.p1.y);
            ctx.lineTo(stPtInvertKoch.p3.x, stPtInvertKoch.p3.y);
            ctx.stroke();
            return;
        }
        else if(nVal>9 || nVal<1){
            setOpenError(true);
            setDisableRange(true);
            return;
        }
        setDisableRange(false);
        DrawKochCurve(nVal,stPtInvertKoch.p1.x,stPtInvertKoch.p1.y,stPtInvertKoch.p2.x,stPtInvertKoch.p2.y);
        DrawKochCurve(nVal,stPtInvertKoch.p2.x,stPtInvertKoch.p2.y,stPtInvertKoch.p3.x,stPtInvertKoch.p3.y);
        DrawKochCurve(nVal,stPtInvertKoch.p3.x,stPtInvertKoch.p3.y,stPtInvertKoch.p1.x,stPtInvertKoch.p1.y);
        
    }

    //Koch curve drawing
    function DrawKochCurve(level, x1, y1, x5, y5){
        var sideLength, triangleHeight, x2, y2, x3, y3, x4, y4;
        ctx.beginPath();
        if(level===0){ //Colour selection
            
            if(colorSelected === 'Forest theme')
                ctx.strokeStyle = colorsForest[ colorIndex ];
            else if(colorSelected === 'Desert theme')
                ctx.strokeStyle = colorsDesert[ colorIndex ];
            else if(colorSelected === 'Spring theme')
                ctx.strokeStyle = colorsSea[ colorIndex ];
            else if(colorSelected === 'Winter sunrise')
                ctx.strokeStyle = colorsWinterSunrise[ colorIndex ];
            ctx.setLineDash(alterLineStyle());
            ctx.lineWidth = line_width;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x5, y5);
            ctx.stroke();
            alterColorIndex();
        }
        else{
            sideLength = Math.sqrt(Math.pow((x1-x5),2)+Math.pow((y1-y5),2))/3;
            triangleHeight = sideLength * Math.sqrt(3)/2;
            x2 = (x5 - x1) / 3.0 +x1;
            y2 = y1 - ((y1-y5)/3.0);

            x4 = ((x5-x1) /3)*2+x1;
            y4 = y1 - (2*(y1-y5)/3.0);

            x3 = (x1+x5)/2 - (triangleHeight/Math.sqrt(Math.pow((x5-x1),2)+Math.pow((y1-y5),2)))*(y1-y5);
            y3 = (y1+y5)/2 - (triangleHeight/Math.sqrt(Math.pow((x5-x1),2)+Math.pow((y1-y5),2)))*(x5-x1);
            
            DrawKochCurve(level-1, x1, y1, x2, y2);
            DrawKochCurve(level-1, x2, y2, x3, y3);
            DrawKochCurve(level-1, x3, y3, x4, y4);
            DrawKochCurve(level-1, x4, y4, x5, y5);
        }
    }

   //loading and filling canvas
    useEffect(() => {
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        ctx.clearRect(-3000, -3000, 10000, 10000);
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
    }, []);

    //showing dragon fractal panel
    function DragonButtonClicked(){
        setShowDragonPanel(true);
        setShowKochPanel(false);
        setShowGreetingPanel(false);
        setDisableRange(true);
        document.getElementById("range").value = 1;
    }

    //showing Koch fractal panel
    function KochButtonClicked(){
        setShowDragonPanel(false);
        setShowKochPanel(true);
        setShowGreetingPanel(false);
        setDisableRange(true);
        document.getElementById("range").value = 1;
    }

    function ClearCanvas(){ //clearing canvas
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        ctx.clearRect(-3000, -3000, 10000, 10000);
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    function BuildKoch(){ //building Koch curve
        setBuildKoch(true);
        setBuildInvertedKoch(false);
        
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        ctx.clearRect(-3000, -3000, 10000, 10000);
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
        if(nVal === ''){
            if(nVal === ''){
                setDisableRange(false);
                ctx.beginPath();
                ctx.setLineDash(alterLineStyle());
                ctx.moveTo(stPtKoch.p1.x, stPtKoch.p1.y);
                ctx.lineTo(stPtKoch.p2.x, stPtKoch.p2.y);
                ctx.stroke();
                return;
            }
        }
        else if(nVal>9 || nVal<1){
            setOpenError(true);
            setDisableRange(true);
            return;
        }
        setDisableRange(false);
        DrawKochCurve(nVal,pointsKochCurve.p1.x,pointsKochCurve.p1.y,pointsKochCurve.p2.x,pointsKochCurve.p2.y);
    }

    function BuildInvertedKoch(){ //Prep before  Building inverted Koch fractal
        
        setBuildInvertedKoch(true);
        setBuildKoch(false);
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        ctx.clearRect(-3000, -3000, 10000, 10000);
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
        drawInvertedKochFractal();
    }

    function BuildDragon(){ //Prep before building dragon fractal
        
        
        setBuildKoch(false);
        setBuildInvertedKoch(false);
        direction = 1;
        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        ctx.clearRect(-3000, -3000, 10000, 10000);
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
        if(nVal === ''){
            if(nVal === ''){
                setDisableRange(false);
                ctx.beginPath();
                ctx.lineWidth = line_width;;
                ctx.setLineDash(alterLineStyle());
                ctx.moveTo(stPtDragonFractal.p1.x, stPtDragonFractal.p1.y);
                ctx.lineTo(stPtDragonFractal.p2.x, stPtDragonFractal.p2.y);
                ctx.stroke();
                return;
            }
        }
        else if(nVal>15 || nVal<1){
            setOpenErrorDragon(true);
            setDisableRange(true);
            return;
        }
        setDisableRange(false);
        drawDragonFractal(nVal,stPtDragonFractal.p1.x,stPtDragonFractal.p1.y,stPtDragonFractal.p2.x,stPtDragonFractal.p2.y);
       
    }

    const [colorSelected, setColor] = useState('Forest theme');
    const [lineStyleSelected, setLineStyle] = useState('Solid');

    function alterLineStyle(){ //function to alter style of the line
        if(lineStyleSelected === 'Solid')
            return [];
        else if(lineStyleSelected === 'Dash')
            return [10, 10];
        else if(lineStyleSelected === 'Dot')
            return [1, 3];
        else if(lineStyleSelected === 'Dashdot')
            return [15, 3, 3, 3]
        else if(lineStyleSelected === 'Double dashdot')
            return [20, 3, 3, 3, 3, 3]
        else if(lineStyleSelected === 'Triple dashdot')
            return [20, 3, 3, 3, 3, 3, 3, 3]
    }
    const [dragonTip, setDragonTip] = useState(false);
    const [kochTip, setKochTip] = useState(false);

    const handleStyleChange = (e) => {
        setLineStyle(e.target.value);
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    let line_width = 1;

    function OnSliderInput(){ //input getting
        const inputSlider = document.getElementById("range");
        line_width =inputSlider.value;
        if(buildKoch===true)
            BuildKoch();
        else if(buildInvertedKoch===true)
            BuildInvertedKoch();
        else
            BuildDragon();
    }

    return (
        <div className="page-wrapper">

            <div className="wrapper">
                <div className="fractal-buttons-wrapper">
                    <button style={{ color: showDragonPanel ? '#FDC058': '#F7ECDE'}}
                     className="local-button" 
                    onClick={()=>DragonButtonClicked()} 
                    >Dragon's curve</button>
                    <button style={{ color: showKochPanel ? '#FDC058': '#F7ECDE'}}
                    
                    className="local-button" onClick={()=>KochButtonClicked()}>Koch curve</button>
                </div>
                {showGreetingPanel &&
                <div className="dragon-input-wrapper">
                    <img className="question-pic-fr" src={require('./pictures/question.png')} alt="Owl" />
                        <div className="gr-wrapper">
                            <span className='gr-text'>At first, I suggest you to investigate some <span className='iter-fr' onMouseEnter={() => setShowFR(true)}
                            onMouseLeave={() => setShowFR(false)}>fractals</span>. 
                                Don’t worry, that’s easy! 
                                Just select the button you want and fill in required fields. 
                                In case you have any questions, 
                                I will be there for you. Let’s go!</span>
                        </div>
                        <img className="dragon-owl" src={require('./pictures/owl-books.png')} alt="Owl"/>
                </div>
                }
                <div className='iteration-tooltip' style={show ? { visibility: "visible" } : {}}>
                    <span className='iteration-tooltip-text'>Iteration is the repetition of a process in order to generate a sequence of outcomes.</span>
                </div>
                <div className='fr-tooltip' style={showFR ? { visibility: "visible" } : {}}>
                    <span className='fr-tooltip-text'>Fractals are infinitely complex patterns that are self-similar across different scales. 
                    They are created by repeating a simple process over and over.</span>
                    <img className="fr-pic" src={require('../../fractal-page-components/FractalMain/pictures/fractal.png')} alt="Owl" />
                </div>
                {showDragonPanel &&
                <div className="dragon-input-wrapper">
                    
                    <img className="question-pic-iter" src={require('./pictures/question.png')} alt="Owl" />
                    <div className="num-iter-wrapper">
                        
                        <span className="num-iter-span">Number of <span 
                        className='iter' onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}>iterations:</span> n =</span>


                        <input type="text" value={nVal} onChange={getN} className="num-iter-input" placeholder="Type any number between 1 and 15"
                        min="1" max="10"></input>
                    </div>
                    <div>
                        <button className="koch-button" onClick={()=>BuildDragon()}>Calculate</button>
                    </div>
                        <div className="select-wrapper">
                            <select value={colorSelected} onChange={handleColorChange}>
                                <option>Forest theme</option>
                                <option>Desert theme</option>
                                <option>Spring theme</option>
                                <option>Winter sunrise</option>
                            </select>
                        </div>
                        <div className="select-wrapper">
                            <select value={lineStyleSelected} onChange={handleStyleChange}>
                                <option>Solid</option>
                                <option>Dash</option>
                                <option>Dot</option>
                                <option>Dashdot</option>
                                <option>Double dashdot</option>
                                <option>Triple dashdot</option>
                            </select>
                    </div>
                    <div>
                        <div className="tip-wr" onClick={() => setDragonTip(true)} >
                            <span className="tip-wr-text">Tap to find out more about Dragon fractal!</span>
                        </div>
                    </div>
                    <img className="dragon-owl" src={require('./pictures/owl-books.png')} alt="Owl"
                     onClick={() => setDragonTip(true)} />
                </div>
                }
                {showKochPanel &&
                    
                    <div className="dragon-input-wrapper">
                         <img className="question-pic-iter" src={require('./pictures/question.png')} alt="Owl" />
                        <div className="num-iter-wrapper">

                        <span className="num-iter-span">Number of <span 
                        className='iter' onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}>iterations:</span> n =</span>

                            <input type="text" value={nVal} id="input" onChange={getN} className="num-iter-input" placeholder="Type any number between 1 and 9"
                            min="1" max="9" ></input>
                        </div>
                        <div>
                            <button className="koch-button" onClick={()=>BuildKoch()}>Calculate ordinary curve</button>
                        </div>
                        <div>
                            <button className="koch-button" onClick={()=>BuildInvertedKoch()}>Calculate inverted curve</button>
                        </div>
                            <div className="select-wrapper">
                                <select value={colorSelected} onChange={handleColorChange}>
                                    <option>Forest theme</option>
                                    <option>Desert theme</option>
                                    <option>Spring theme</option>
                                    <option>Winter sunrise</option>
                                </select>
                            </div>
                            <div className="select-wrapper">
                                <select value={lineStyleSelected} onChange={handleStyleChange}>
                                    <option>Solid</option>
                                    <option>Dash</option>
                                    <option>Dot</option>
                                    <option>Dashdot</option>
                                    <option>Double dashdot</option>
                                    <option>Triple dashdot</option>
                                </select>
                            
                        </div>
                    <div>
                        <div className="koch-tip-wr" onClick={() => setKochTip(true)}>
                            <span className="tip-wr-text">Tap to find out more about Koch fractal!</span>
                        </div>
                    </div>
                    <img className="koch-owl" src={require('./pictures/owl-books.png')} alt="Owl" 
                    onClick={() => setKochTip(true)}/>
                </div>
                    
                }
                
            </div>
            <div className='canvas-button-wrapper'>
                <div className="canvas-wrapper-fr">
                    <canvas id="fractal-canvas" className="fractal-canvas" ref={canvas} 
                    onMouseDown={(event) => mouseDown(event)}
                    onMouseUp={(event) => mouseUp(event)}
                    onMouseOut={(event) => mouseOut(event)}
                    onMouseMove={(event) => mouseMove(event)}
                    onWheel={(event) => zoom(event)}
                    width="790px" height="600px" border="2px" border-color="black"
                    ></canvas>
                </div>
                <div className='under-canvas'>
                    <div className='slider-span'>
                        <span className='slider-span-text'>Set line width:</span>
                    </div>
                    <div>
                        <input 
                        className='slider'
                        id="range" 
                        type="range" 
                        min="1" max="8" 
                        step="1"
                        defaultValue="1"
                        disabled = {disableRange?true:false}
                        onLostPointerCapture={OnSliderInput}/>
                    </div>
                    <div className='export-button-wrapper'>
                        <button onClick={()=> download() } className="export-button">Export image
                        <img className="button-ex-fr-pic" src={require('../../fractal-page-components/FractalMain/pictures/folder.png')} alt="Owl" /></button>
                    </div>
                </div>
                
            </div>
            

            {dragonTip &&
            <div><DragonTip />
                <div className='close-btn' onClick={() => setDragonTip(false)}>
                    <img  src={require('./pictures/cross.png')} alt="Owl"/>
                </div>
            </div>}

            {kochTip &&
            <div><KochTip />
                <div className='close-btn' onClick={() => setKochTip(false)}>
                    <img  src={require('./pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }
        {openError &&
            <div>
                <img  className='error-pic' src={require('./pictures/error.png')} alt="Owl"/>
                <div className='total-tip-wrapper'>
                <div className='error-wrapper'>
                    <span className='error-text'><br/>The number must be bigger than 0 and less than 9!</span><br/>
                </div>
                
            </div>
                <div className='close-btn-error' onClick={()=>setOpenError(false)}>
                    <img className='close-btn-error-pic' src={require('./pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        } 
        {openErrorDragon &&
            <div>
                <img  className='error-pic' src={require('./pictures/error.png')} alt="Owl"/>
                <div className='total-tip-wrapper'>
                <div className='error-wrapper'>
                    <span className='error-text'><br/>The number must be bigger than 0 and less than 15!</span><br/>
                </div>
                
            </div>
                <div className='close-btn-error' onClick={()=>setOpenErrorDragon(false)}>
                    <img  className='close-btn-error-pic' src={require('./pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        } 
        </div>
      
    );
  }
  
  export default FractalMain;