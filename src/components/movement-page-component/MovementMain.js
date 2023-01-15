import './movementMain.css';
import {matrix, add, multiply} from "mathjs";
import {useState, useEffect} from 'react';
import MovementTips from '../tips-component/MovementTip.js'
import {BrowserRouter as Link} from "react-router-dom";

function MovementMain() {

    var movementCanvas, moveCtx, step=20;
    var point1, point2, point3;
    var movePoint1, movePoint2, movePoint3;
    var canPoint1, canPoint2, canPoint3;

    const [disableButton, setDisableButton] = useState(true);

    //variables for triangle
    const [x1, setX1] = useState();
    const [x2, setX2] = useState();
    const [x3, setX3] = useState();
    const [y1, setY1] = useState();
    const [y2, setY2] = useState();
    const [y3, setY3] = useState();
    const [scale, setScale] = useState();

    const [openTip, setOpenTip] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openEmptyError, setOpenEmptyError] = useState(false);

    useEffect(() => {
        movementCanvas = document.getElementById('movement-canvas');
        moveCtx  = movementCanvas.getContext('2d');

        moveCtx.beginPath();
        moveCtx.rect(0, 0, 1000, 1000);
        moveCtx.fillStyle = "white";
        moveCtx.fill();
        drawHorizontalLines();
        drawVerticalLines();
        drawAxises();
    }, []);

    //getting variables for triangle
    function getX1(val){
        setX1 (val.target.value);
    }

    function getX2(val){
        setX2 (val.target.value);
    }

    function getX3(val){
        setX3 (val.target.value);
    }
    function getY1(val){
        setY1 (val.target.value);
    }

    function getY2(val){
        setY2 (val.target.value);
    }

    function getY3(val){
        setY3 (val.target.value);
    }

    function getScale(val){
        setScale (val.target.value);
    }

    function checkIsEmpty(){
        console.log(document.getElementById("x1").value==="");
        console.log(document.getElementById("x2").value==="");
        console.log(document.getElementById("x3").value==="");
        console.log(document.getElementById("y1").value==="");
        console.log(document.getElementById("y2").value==="");
        console.log(document.getElementById("y3").value==="");
        if(document.getElementById("x1").value==="")
            return true;
        else if(document.getElementById("x2").value==="")
            return true;
        else if(document.getElementById("x3").value==="")
            return true;
        else if(document.getElementById("y1").value==="")
            return true;
        else if(document.getElementById("y2").value==="")
            return true;
        else if(document.getElementById("y3").value==="")
            return true;
    }

    function checkTriangle( x1,  y1,  x2, y2,  x3,  y3)
    {

        // Calculation the area of
        // triangle. We have skipped
        // multiplication with 0.5
        // to avoid floating point
        // computations
        var a = x1 * (y2 - y3)
        + x2 * (y3 - y1)
        + x3 * (y1 - y2);
        // Condition to check if
        // area is not equal to 0
        if (a === 0)
            return false;
        else
            return true;
    }

    //drawing coordinates and triangle
    function drawCoordinates(){
        movementCanvas = document.getElementById('movement-canvas');
        moveCtx  = movementCanvas.getContext('2d');

        moveCtx.beginPath();
        moveCtx.rect(0, 0, 1000, 1000);
        moveCtx.fillStyle = "white";
        moveCtx.fill();
        drawHorizontalLines();
        drawVerticalLines();
        drawAxises();
        point1 = getPoint1();
        if(checkIsEmpty()){
            setDisableButton(true);
            setOpenEmptyError(true);
            return;
        }
        point2 = getPoint2();
        point3 = getPoint3();
        point1.X= Number(point1.X);
        point2.X= Number(point2.X);
        point3.X= Number(point3.X);

        if(!checkTriangle(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y)){
            setDisableButton(true);
            setOpenError(true);
            return;
        }
        
       setDisableButton(false);

        movePoint1 = getPoint1();
        movePoint2 = getPoint2();
        movePoint3 = getPoint3();
        canPoint1 = findCanvasCoordinates(point1.X, point1.Y);
        canPoint2 = findCanvasCoordinates(point2.X, point2.Y);
        canPoint3 = findCanvasCoordinates(point3.X, point3.Y);
        //findCanvasCoordinates(5.3, 4.8);
        fillTriangle(canPoint1, canPoint2, canPoint3, 1);
        drawTriangleSides(canPoint1, canPoint2, canPoint3, 1);
    }

    const isValidTriangle = (a = 1, b = 1, c = 1) => {
        if(!a || !b || !c){
           return false;
        };
        const con1 = a + b > c;
        const con2 = b + c > a;
        const con3 = c + a > b;
        return con1 && con2 && con3;
     };


    function getPoint1(){
        return{
            X: x1,
            Y: y1//document.getElementById("y1").value
        }
    }
    function getPoint2(){
        return{
            X: x2,
            Y: y2
        }
    }
    function getPoint3(){
        return{
            X: x3,
            Y: y3
        }
    }

    
    //filling  triangle with colour
    function fillTriangle(point1, point2, point3, colourChoice){
        if(colourChoice===1)
            moveCtx.fillStyle = 'rgba(129,140,80,0.5)';
        else if(colourChoice===2)
            moveCtx.fillStyle = 'rgba(253,192,88,0.48)';
        else if(colourChoice===3)
            moveCtx.fillStyle = 'rgba(253,101,112,0.39)'
        
        moveCtx.beginPath();     //Begin a path..
        moveCtx.moveTo(point1.X, point1.Y);  //Startpoint (x, y)
        moveCtx.lineTo(point2.X, point2.Y); //Point 1    (x, y)
        moveCtx.lineTo(point3.X, point3.Y);  //Point 2    (x, y)
        moveCtx.closePath();     //Close the path.
        moveCtx.fill();
    }

    //drawing sides of triangle
    function drawTriangleSides(point1, point2, point3, colourChoice){
        if(colourChoice===1)
            moveCtx.strokeStyle = "#818C25";
        else if(colourChoice===2)
            moveCtx.strokeStyle = "#FDC058";
        else if(colourChoice===3)
            moveCtx.strokeStyle = "#FD6570";
        moveCtx.beginPath();     //Begin a path..
        moveCtx.moveTo(point1.X, point1.Y);  //Startpoint (x, y)
        moveCtx.lineTo(point2.X, point2.Y); 
        moveCtx.stroke();
        moveCtx.moveTo(point1.X, point1.Y);
        moveCtx.lineTo(point3.X, point3.Y);  
        moveCtx.stroke();
        moveCtx.moveTo(point2.X, point2.Y);
        moveCtx.lineTo(point3.X, point3.Y);
        
        moveCtx.stroke();
        moveCtx.closePath();
    }

    //drawing system of coordinates
    function drawHorizontalLines(){
        var startZ=0,  finishZ = 600, y=0;
        moveCtx.beginPath();
        moveCtx.lineWidth = 0.5;
        moveCtx.strokeStyle = "black"
        while(y<=600){
            
            moveCtx.moveTo(startZ, y);
            moveCtx.lineTo(finishZ, y);
            moveCtx.stroke();
            y+=step;
        }
    }

    //drawing system of coordinates
    function drawVerticalLines(){
        var startY=0,  finishY = 600, z=0;
        moveCtx.beginPath();
        
        moveCtx.strokeStyle = "black"
        while(z<=600){
            moveCtx.lineWidth = 0.5;
            moveCtx.moveTo(z, startY);
            moveCtx.lineTo(z, finishY);
            moveCtx.stroke();
            z+=step;
        }
    }

    //drawing system of coordinates
    function drawAxises(){
        var x = movementCanvas.width/2, textNum = movementCanvas.width/2/step;
        var y = movementCanvas.height/2;
        moveCtx.beginPath();
        moveCtx.lineWidth = 2;
        moveCtx.strokeStyle = "#818C25";
        moveCtx.moveTo(x, 0);
        moveCtx.lineTo(x, movementCanvas.height);
        moveCtx.stroke();

        moveCtx.moveTo(0,y);
        moveCtx.lineTo(movementCanvas.width, y);
        moveCtx.stroke();

        y=0;
        x+=5;
        moveCtx.fillStyle = "#818C25";
        while(textNum>-15){
            moveCtx.fillText(textNum, x, y);
            y+=step;
            textNum -=1;
        }
        //textNum = movementCanvas.width/2/20;
        x=0;
        y=movementCanvas.width/2+10;
        moveCtx.fillStyle = "#818C25";
        while(textNum!==15){
            if(textNum!==0)
                moveCtx.fillText(textNum, x, y);
            x+=step;
            textNum +=1;
        }
        moveCtx.fillText("X", 590, 297);
        moveCtx.fillText("Y", 290, 10);
    }

    //finding canvas coordinates
    function findCanvasCoordinates(x, y){
        var rezX, rezY, boundVal, width=movementCanvas.width;
        boundVal = width/step/2;
        if(x<0){
            rezX = (boundVal-x*-1)*step;
        }
        else if(x>0){
            
            rezX = (boundVal+x)*step;
        }
        else{
            rezX=width/2;
        }

        if(y>0){
            rezY = (boundVal-y)*step;
        }
        else if(y<0){
            rezY = (boundVal+y*-1)*step;
        }
        else{
            rezY=width/2;
        }

        return {
            X: rezX,
            Y: rezY
        }
    }

    //clearing canvas
    function clearCanvas(){
        moveCtx.clearRect(-3000, -3000, 10000, 10000);
        moveCtx.beginPath();
        moveCtx.rect(0, 0, 1000, 1000);
        moveCtx.fillStyle = "white";
        moveCtx.fill();
    }

    //downloading of canvas picure
    function download() {
        var canvas = document.getElementById("movement-canvas");
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "triangle.png";
        anchor.click();
    }

    //moving triangle
    async function moveStepByStep(){
        
        movePoint1 = getPoint1();
        movePoint2 = getPoint2();
        movePoint3 = getPoint3();
        movePoint1.X= Number(movePoint1.X);
        movePoint2.X= Number(movePoint2.X);
        movePoint3.X= Number(movePoint3.X);
        movePoint1.Y= Number(movePoint1.Y);
        movePoint2.Y= Number(movePoint2.Y);
        movePoint3.Y= Number(movePoint3.Y);

        point1.X= Number(point1.X);
        point2.X= Number(point2.X);
        point3.X= Number(point3.X);
        point1.Y= Number(point1.Y);
        point2.Y= Number(point2.Y);
        point3.Y= Number(point3.Y);

        var res = await scaleTriangle(movePoint1, movePoint2, movePoint3, scale);
        movePoint1 = res[0];
        movePoint2 = res[1];
        movePoint3 = res[2];
        var tem1 = res[0];
        var tem2 = res[1];
        var tem3 = res[2];
        await moveTriangle(movePoint1, movePoint2, movePoint3, tem1.X, tem2.X, tem3.X, tem1.Y, tem2.Y, tem3.Y);
    }


//////////////////// Movement functions ///////////////////////////////////////////
    function makeBigger(movePoint1, movePoint2, movePoint3, x1, x2, x3, y1, y2, y3, scale, less){
        if(less){
            scale = 1/scale;
        }
        var coordinates =
            multiply(
                matrix([[x1, y1]]),
                matrix([  
                 [scale, 0],
                 [0, scale],
                ])
           );
           movePoint1.X =  coordinates.get([0,0]);
           movePoint1.Y = coordinates.get([0,1]);
           coordinates =
               multiply(
                matrix([[x2, y2]]),
                matrix([  
                 [scale, 0],
                 [0, scale],
                ])
           );
           movePoint2.X =  coordinates.get([0,0]);
           movePoint2.Y = coordinates.get([0,1]);
           coordinates =
               multiply(
                matrix([[x3, y3]]),
                matrix([  
                 [scale, 0],
                 [0, scale],
                ])
           );
           movePoint3.X =  coordinates.get([0,0]);
           movePoint3.Y = coordinates.get([0,1]);
    }

    //moving with matrixes
    function moveTo(movePoint1, movePoint2, movePoint3, point1, point2, point3, scaleX, scaleY, forward){
        if(forward){
            scaleX = -1*scaleX;
            scaleY = -1*scaleY;
        }
        var coordinates =
            add(
                matrix([[point1.X, point1.Y]]),
                matrix([  
                 [scaleX, scaleY]
                ])
           );
           movePoint1.X =  coordinates.get([0,0]);
           movePoint1.Y = coordinates.get([0,1]);
           coordinates =
               add(
                matrix([[point2.X, point2.Y]]),
                matrix([  
                 [scaleX, scaleY]
                ])
           );
           movePoint2.X =  coordinates.get([0,0]);
           movePoint2.Y = coordinates.get([0,1]);
           coordinates =
               add(
                matrix([[point3.X, point3.Y]]),
                matrix([  
                 [scaleX, scaleY]
                ])
           );
           movePoint3.X =  coordinates.get([0,0]);
           movePoint3.Y = coordinates.get([0,1]);
    }

    //scaling triangle
    async function scaleTriangle(movePoint1, movePoint2, movePoint3, scale){
        var startScale=1, stepScale=0.01;
        var centreX = (movePoint1.X+movePoint2.X+movePoint3.X)/3;
        var centreY = (movePoint1.Y+movePoint2.Y+movePoint3.Y)/3;
        while(startScale<=scale){

            moveTo(movePoint1, movePoint2, movePoint3, point1, point2, point3, centreX, centreY, true);
            makeBigger(movePoint1, movePoint2, movePoint3, movePoint1.X, movePoint2.X, movePoint3.X, movePoint1.Y, movePoint2.Y, movePoint3.Y,startScale, false);
            moveTo(movePoint1, movePoint2, movePoint3, movePoint1, movePoint2, movePoint3, centreX, centreY, false);
            clearCanvas();
            drawCoordinates();
            canPoint1 = findCanvasCoordinates(movePoint1.X, movePoint1.Y);
            canPoint2 = findCanvasCoordinates(movePoint2.X, movePoint2.Y);
            canPoint3 = findCanvasCoordinates(movePoint3.X, movePoint3.Y);
            fillTriangle(canPoint1, canPoint2, canPoint3, 2);
            drawTriangleSides(canPoint1, canPoint2, canPoint3, 2);
            await new Promise(r => setTimeout(r, 20));
            startScale += stepScale;
        }
        return[
            movePoint1, movePoint2, movePoint3
        ]
    }

    //moving triangle
    async function moveTriangle(movePoint1, movePoint2, movePoint3,  x1, x2, x3, y1, y2, y3){
        var startScale=1, stepScale=0.01;
        
        startScale = 1;
        while(startScale>=-1){
            makeBigger(movePoint1, movePoint2, movePoint3, x1, x2, x3, y1, y2, y3, startScale, false);
            clearCanvas();
            drawCoordinates();
            canPoint1 = findCanvasCoordinates(movePoint1.X, movePoint1.Y);
            canPoint2 = findCanvasCoordinates(movePoint2.X, movePoint2.Y);
            canPoint3 = findCanvasCoordinates(movePoint3.X, movePoint3.Y);
            fillTriangle(canPoint1, canPoint2, canPoint3, 3);
            drawTriangleSides(canPoint1, canPoint2, canPoint3, 3);
            canPoint1 = findCanvasCoordinates(x1, y1);
            canPoint2 = findCanvasCoordinates(x2, y2);
            canPoint3 = findCanvasCoordinates(x3, y3);
            fillTriangle(canPoint1, canPoint2, canPoint3, 2);
            drawTriangleSides(canPoint1, canPoint2, canPoint3, 2);
            await new Promise(r => setTimeout(r, 20));
            startScale -= stepScale;
        }

    }

    const [show, setShow] = useState(false);
           

    return (
        <>
        <div className="total-page-wrapper">
        <img className="button-download-pic" src={require('../fractal-page-components/FractalMain/pictures/folder.png')} alt="Owl" />
        <img className="question-pic" src={require('../fractal-page-components/FractalMain/pictures/question.png')} alt="Owl" />
        <img className="question-tap" src={require('../fractal-page-components/FractalMain/pictures/buttonq_.png')} alt="Owl" />
        <div className='coor-tooltip' style={show ? { visibility: "visible" } : {}}>
            <span className='coor-tooltip-text'>The coordinates of a point are a pair of numbers that define its 
            exact location on a two-dimensional plane. We write coordinates like this: (x;y).</span>
            <img className="coor-pic" src={require('../fractal-page-components/FractalMain/pictures/coordinate.png')} alt="Owl"  />
        </div>
            <div className='data-wrapper'>
                <span className='header-span'>Enter <span className='iter'onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}>coordinates</span>!</span>
                <div className='data-triangle-wrapper'>
                    <div className='points-wrapper'>
                        <br/>
                        <span className='color-span-label'>Example:</span>
                        <span className='color-span-label'>Point 1:</span>
                        <span className='color-span-label'>Point 2:</span>
                        <span className='color-span-label'>Point 3:</span>
                        <span className='color-span-label'>Scale:</span>
                    </div>
                    <div className='points-wrapper-inputs'>
                    <br/>
                        <span className='color-span-label'>X</span>
                        <input type="number" id="x1" className='coordinate-input' onChange={(e)=>getX1(e)}></input>
                        <input type="number" id="x2" className='coordinate-input2' onChange={(e)=>getX2(e)}></input>
                        <input type="number" id="x3" className='coordinate-input3' onChange={(e)=>getX3(e)}></input>
                        <input type="number" id="" className='scale-input' onChange={(e)=>getScale(e)}  min="1" max="4"></input>
                    </div>
                    <div className='points-wrapper-inputs'>
                    <br/>
                        <span className='color-span-label'>Y</span>
                        <input type="number" id="y1" className='coordinate-input' onChange={(e)=>getY1(e)}></input>
                        <input type="number" id="y2" className='coordinate-input2' onChange={(e)=>getY2(e)}></input>
                        <input type="number" id="y3" className='coordinate-input3' onChange={(e)=>getY3(e)}></input>
                    </div>
                    <div className='points-wrapper-inputs'>
                        
                    </div>
                </div>

                <div>
                    <button className='button-move' onClick={()=>drawCoordinates()}>Draw coordinates</button>
                </div>
                <div>
                    <button className='button-move' disabled = {disableButton?true:false} onClick={()=>moveStepByStep()}>Move</button>
                </div>
                <span className='start'>
                    Start triangle
                </span>
                <span className='scaled'>
                    Scaled triangle
                </span>
                <span className='mirrored'>
                    Mirrored as to (0;0)
                </span>
            </div>
            <div className="canv-tr-wrapper">
                <canvas className='canv' width="600px" height="600px" id="movement-canvas"></canvas>
                <button className='button-export-tr' onClick={()=>download()}>Export</button>
            </div>
            <div className="test-go-owl">
                <div className="">
                    <div className='test-words'>
                        <span className='test-words-span'>Click on the button to practice with tests!</span>
                    </div>
                    <Link to="/tests" ><button className='go-test'>Test</button></Link>
                </div>
                <img className='pr-owl' src={require('../fractal-page-components/FractalMain/pictures/test-owl.png')} alt="Owl"/>
                
            </div>
            <div className='study-words'>
                    <span className='test-words-span' onClick={()=>setOpenTip(true)}>Tap to read about movement!</span>
            </div>
        </div>

        {openTip &&
            <div><MovementTips />
                <div className='close-btn' onClick={()=>setOpenTip(false)}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }

        {openError &&
            <div>
                <div className='total-tip-wrapper'>
                <img  className='error-pic' src={require('../fractal-page-components/FractalMain/pictures/error.png')} alt="Owl"/>
                <div className='error-wrapper'>
                    <span className='error-text'><br/>Please, make sure that your coordinates <br/>can create a triangle!</span><br/>
                </div>
                
            </div>
                <div className='close-btn-error' onClick={()=>setOpenError(false)}>
                    <img className='close-btn-error-pic'  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }   

        {openEmptyError &&
            <div>
                <div className='total-tip-wrapper'>
                <img  className='error-pic' src={require('../fractal-page-components/FractalMain/pictures/error.png')} alt="Owl"/>
                <div className='error-wrapper'>
                    <span className='error-text'><br/>Please, fill all the coordinates!</span><br/>
                </div>
                
            </div>
                <div className='close-btn-error' onClick={()=>setOpenEmptyError(false)}>
                    <img className='close-btn-error-pic'  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        }      
        
        </>
    );
  }
  
  export default MovementMain;