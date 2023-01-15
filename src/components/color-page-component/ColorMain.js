import './colorMain.css';
import {useRef, useEffect} from 'react';
import ColorTip from './ColorTip.js';
import HSLTip from './HSLTip.js';
import RGBTip from './RGBTip.js';
var eventFile ;

var disableRange = false, wasError=false;
//variable for canvases
var canvasHSL;
var canvasRGB;
var colorHSL;
var colorRGB;

var hslCanvas, hslCtx, imgDataHSL, tempDataHSL, imgDataRGB;
var rgbCanvas, rgbCtx;
var moveDataHSL, moveDataRGB;

var hslColor, hslColCtx, rgbColor, rgbColCtx;

var lightness;
function closeDivError(){
    document.getElementById("diverror").style.display = "none";

}
function loadFile(event) {
    if(event == undefined)
    return;
    eventFile = event;
    var allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var filename = event.target.files[0].name;
    if (!(filename.endsWith(".png") || filename.endsWith(".jpg"))) {
        disableRange = true;
        document.getElementById("diverror").style.display = "block";
        wasError = true;
        return;
    }
    hslCanvas = document.getElementById('hsl-canvas');
    hslCtx  = hslCanvas.getContext('2d');

    hslColor = document.getElementById('hsl-canvas-color');
    hslColCtx = hslColor.getContext('2d');

    rgbCanvas = document.getElementById('rgb-canvas');
    rgbCtx = rgbCanvas.getContext('2d');

    rgbColor = document.getElementById('rgb-canvas-color');
    rgbColCtx = rgbColor.getContext('2d');

    clearCanvases();

    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    var img = new Image();
    
    disableRange = (false);
    img.src = output.src;
    window.localStorage.clear();
    wasError = false;
    img.onload =()=>{
        displayImage(img, hslCtx, true);
        displayImage(img, rgbCtx, false);
    }
};


  

//clear canvas
function clearCanvases(){
    hslCtx.clearRect(-3000, -3000, 10000, 10000);
    hslCtx.beginPath();
    hslCtx.rect(0, 0, 1000, 1000);
    hslCtx.fillStyle = "white";
    hslCtx.fill();

    rgbCtx.clearRect(-3000, -3000, 10000, 10000);
    rgbCtx.beginPath();
    rgbCtx.rect(0, 0, 1000, 1000);
    rgbCtx.fillStyle = "white";
    rgbCtx.fill();
}

//getting pixel-colour data on mouse Move
function mouseMove (event) {
    if( moveDataRGB == null && wasError===true){ 
        
        loadFile(eventFile);
        return;
    }
    var arrayOffset = 4;
    var width = 454;

    var offset = event.target.getBoundingClientRect();
    let mouseX = parseInt(event.clientX-offset.left),  mouseY = parseInt(event.clientY-offset.top);
    console.log(mouseY, mouseX);

    
    let pixel = (width) * mouseY + mouseX;
    pixel *= arrayOffset;
    rgbColor = document.getElementById('rgb-canvas-color');
    rgbColCtx = rgbColor.getContext('2d');
    rgbColCtx.beginPath();
    rgbColCtx.rect(0, 0, 1000, 1000);
    rgbColCtx.fillStyle = 'rgba(' + moveDataRGB.data[pixel] + ',' + moveDataRGB.data[pixel+1] + ',' + moveDataRGB.data[pixel+2] + ','+moveDataRGB.data[pixel+3]+')';
    rgbColCtx.fill();
    document.getElementById("r").innerHTML=moveDataRGB.data[pixel];
    document.getElementById("g").innerHTML=moveDataRGB.data[pixel+1];
    document.getElementById("b").innerHTML=moveDataRGB.data[pixel+2];
}

//getting pixel-colour data on mouse Move on HSL canvas
function mouseMoveHSL  (event) {
    if( moveDataHSL == null){
        loadFile(eventFile);
        return;
    }
    var arrayOffset = 4;
    var width = 454;
    
    var offset = event.target.getBoundingClientRect();
    let mouseX = parseInt(event.clientX-offset.left),  mouseY = parseInt(event.clientY-offset.top);
    
    let pixel = (width) * mouseY + mouseX;
    pixel *= arrayOffset;
    hslColor = document.getElementById('hsl-canvas-color');
    hslColCtx = hslColor.getContext('2d');
    hslColCtx.beginPath();
    hslColCtx.rect(0, 0, 1000, 1000);
    hslColCtx.fillStyle = 'rgba(' + moveDataHSL.data[pixel] + ',' + moveDataHSL.data[pixel+1] + ',' + moveDataHSL.data[pixel+2] + ','+moveDataHSL.data[pixel+3]+')';
    hslColCtx.fill();
    var hsl = FindHSLfromRGB(moveDataHSL.data[pixel], moveDataHSL.data[pixel+1], moveDataHSL.data[pixel+2])
    document.getElementById("h").innerHTML=Number(hsl.H).toFixed(2);
    document.getElementById("s").innerHTML=Number(hsl.S).toFixed(2);
    document.getElementById("l").innerHTML=Number(hsl.L).toFixed(2);
}

//drawing image
function displayImage (image, context, isHSL)  {
    var canvas = context.canvas;
    var hRatio = canvas.width  / image.width;
    var vRatio =  canvas.height / image.height;
    var ratio  = Math.min(hRatio, vRatio);
    var centerShift_x = ( canvas.width - image.width * ratio ) / 2;
    var centerShift_y = ( canvas.height - image.height * ratio ) / 2; 
    context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);  
    if(isHSL){
        tempDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
        imgDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
        moveDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
        convertImageToHSL();       
    }
    else{
        moveDataRGB = hslCtx.getImageData(0, 0, rgbCanvas.width, rgbCanvas.height);
        imgDataRGB = hslCtx.getImageData(0, 0, rgbCanvas.width, rgbCanvas.height);
    }
}

//converting to HSL from RGB
function FindHSLfromRGB(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;
    var h, s, l, rgbMax = MaxRGB(r, g, b), rgbMin = MinRGB(r, g, b);

    if(rgbMin === rgbMax)
        h=180;
    else if(rgbMax===r && g>=b){
        h=60*((g-b)/(rgbMax-rgbMin));
    }
    else if(rgbMax===r && g<b){
        h=60*((g-b)/(rgbMax-rgbMin))+360;
    }
    else if(rgbMax===g){
        h=60*((b-r)/(rgbMax-rgbMin))+120;
    }
    else if(rgbMax===b){
        h=60*((r-g)/(rgbMax-rgbMin))+240;
    }


    l=0.5*(rgbMax+rgbMin);

    if(rgbMax===rgbMin){
        s=0;
    }
    else if(l<=0.5)
        s=(rgbMax-rgbMin)/(rgbMax+rgbMin);
    else if(l>0.5)
        s=(rgbMax-rgbMin)/(2.0-rgbMax-rgbMin);
   

    return{
        H: h,
        S: s,
        L: l
    }
    
}

//converting from HSL to RGB
function FindRGBfromHSL(h, s, l){
    var C, H, X, r, g, b, m;

    C = (1-Math.abs(2*l-1))*s;
    H=h/60;
    X = C*(1-Math.abs(H%2-1));
    
    m=l-0.5*C

    
    if(H>=0 && H<1){
        r=C;
        g=X;
        b=0;
    }
    else if(H>=1 && H<2){
        r=X;
        g=C;
        b=0;
    }
    else if(H>=2 && H<3){
        r=0;
        g=C;
        b=X;
    }
    else if(H>=3 && H<4){
        r=0;
        g=X;
        b=C;
    }
    else if(H>=4 && H<5){
        r=X;
        g=0;
        b=C;
    }
    else if(H>=5 && H<6){
        r=C;
        g=0;
        b=X;
    }

    r+=m;
    g+=m;
    b+=m;

    return{
        R: r,
        G: g,
        B: b
    };
}

//minimum rgb value
function MinRGB(r, g, b){
    var minNum = (r < g) ?
        (r < b ? r : b) :
        (g < b ? g : b);
    return minNum;
}

//maximum rgb value
function MaxRGB(r, g, b){
    var maxNum = (r > g) ?
        (r > b ? r : b) :
        (g > b ? g : b);
    return maxNum;
}

//altering lightness of red colour
function alterLightness(){
    const inputSlider = document.getElementById("range");
    lightness = inputSlider.value-0.5;

    var arraySize = hslCanvas.width*hslCanvas.height*4;
    var hslRes, rgbRes, j=0;
    var alteredPixelData = hslCtx.createImageData(hslCanvas.width, hslCanvas.height);
    
    for(var i=0; i<arraySize; i+=4){
        hslRes = FindHSLfromRGB(tempDataHSL.data[i], tempDataHSL.data[i+1], tempDataHSL.data[i+2]);
        if((selectedArea.length !== 0 && i===selectedArea[j]) || selectedArea.length===0){
            if((hslRes.H>=0 && hslRes.H<30) || (hslRes.H>330 && hslRes.H<360) ){
                hslRes.L+=lightness;
                if(hslRes.L>1)
                    hslRes.L = 1;
                else if(hslRes.L<0)
                    hslRes.L = 0;
            }
            j++;
        }
        rgbRes = FindRGBfromHSL(hslRes.H, hslRes.S, hslRes.L);
        alteredPixelData.data[i] = rgbRes.R*255;
        alteredPixelData.data[i+1] = rgbRes.G*255;
        alteredPixelData.data[i+2] = rgbRes.B*255;
        alteredPixelData.data[i+3] = 255;
    }
    hslCtx.putImageData(alteredPixelData, 0, 0); 
    moveDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
}

//downloading of HSL image
function downloadHSL() {
    var canvas = document.getElementById("hsl-canvas");
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "HSL_image.png";
    anchor.click();
}

//downloading of RGB image
function downloadRGB() {
    var canvas = document.getElementById("rgb-canvas");
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "RGB_image.png";
    anchor.click();
}

//displaying image converted to HSL and then to RGB
function convertImageToHSL(){
    var arraySize = hslCanvas.width*hslCanvas.height*4;
    var hslRes, rgbRes;
    var alteredPixelData = hslCtx.createImageData(hslCanvas.width, hslCanvas.height);
    
    for(var i=0; i<arraySize; i+=4){
        hslRes = FindHSLfromRGB(imgDataHSL.data[i], imgDataHSL.data[i+1], imgDataHSL.data[i+2]);
        rgbRes = FindRGBfromHSL(hslRes.H, hslRes.S, hslRes.L);
        alteredPixelData.data[i] = rgbRes.R*255;
        alteredPixelData.data[i+1] = rgbRes.G*255;
        alteredPixelData.data[i+2] = rgbRes.B*255;
        alteredPixelData.data[i+3] = 255;
    }
    hslCtx.putImageData(alteredPixelData, 0, 0); 
    tempDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
    moveDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
}

let mouseDownX, mouseDownY,  mouseUpX, mouseUpY;

function mouseDown(event){
    var offset = event.target.getBoundingClientRect();
    mouseDownX = parseInt(event.clientX-offset.left);
    mouseDownY = parseInt(event.clientY-offset.top);
}

function mouseUp(event){
    var offset = event.target.getBoundingClientRect();
    mouseUpX = parseInt(event.clientX-offset.left);
    mouseUpY = parseInt(event.clientY-offset.top);
    var start = ((hslCanvas.width) * mouseDownY + mouseDownX)*4; 
    var end = ((hslCanvas.width) * mouseUpY + mouseUpX)*4;
    var selectedArea = FindSelectedArea(mouseDownX, mouseDownY,  mouseUpX, mouseUpY);
    console.log(selectedArea);
    CoverSelectedArea(selectedArea);
}

var selectedArea =[];

//Select area of picture with mouse
function FindSelectedArea(mouseDownX, mouseDownY,  mouseUpX, mouseUpY){
    var xDifference = Math.abs(mouseUpX-mouseDownX);
    var yDifference = Math.abs(mouseUpY-mouseDownY);
    var selectedSize = xDifference * yDifference;
    var tempX = mouseDownX, tempY = mouseDownY;
    for(var i=0; i<selectedSize; ++i){
        selectedArea[i] = ((hslCanvas.width) * tempY + tempX)*4;
        tempX++;
        if(tempX>mouseUpX){
            tempX -= xDifference;
            tempY++;
        }
    }
    return selectedArea;
}

//cancelling selected area
function CancelSelectedArea(){
    selectedArea =[];
    convertImageToHSL();
    document.getElementById("range").value = 0.5;
}

//displaying image with altered area
function CoverSelectedArea(selectedArea){
    var arraySize = hslCanvas.width*hslCanvas.height*4;
    var hslRes, rgbRes, j=0;
    var alteredPixelData = hslCtx.createImageData(hslCanvas.width, hslCanvas.height);
    
    for(var i=0; i<arraySize; i+=4){
        hslRes = FindHSLfromRGB(imgDataHSL.data[i], imgDataHSL.data[i+1], imgDataHSL.data[i+2]);
        rgbRes = FindRGBfromHSL(hslRes.H, hslRes.S, hslRes.L);
        alteredPixelData.data[i] = rgbRes.R*255;
        alteredPixelData.data[i+1] = rgbRes.G*255;
        alteredPixelData.data[i+2] = rgbRes.B*255;
        if(i===selectedArea[j]){
            alteredPixelData.data[i+3] = 100;
            j++;
        }
        else
            alteredPixelData.data[i+3] = 255;
    }
    hslCtx.putImageData(alteredPixelData, 0, 0); 
    tempDataHSL = hslCtx.getImageData(0, 0, hslCanvas.width, hslCanvas.height);
}
function ColorMain() {

    useEffect(() =>{
        canvasHSL = document.getElementById("hsl-canvas");
    canvasRGB = document.getElementById("rgb-canvas");
    colorHSL = document.getElementById("rgb-canvas-color");
    colorRGB = document.getElementById("hsl-canvas-color");
    const canvasEle = canvasHSL;
    const canvasEle2 = canvasRGB;
    const canvasEle3 = colorHSL;
    const canvasEle4 = colorRGB;

    rgbCtx = canvasEle2.getContext("2d");
    rgbCtx.clearRect(-3000, -3000, 10000, 10000);
    rgbCtx.beginPath();
    rgbCtx.rect(0, 0, 1000, 1000);
    rgbCtx.fillStyle = "white";
    rgbCtx.fill();

    hslCtx = canvasEle.getContext("2d");
    hslCtx.clearRect(-3000, -3000, 10000, 10000);
    hslCtx.beginPath();
    hslCtx.rect(0, 0, 1000, 1000);
    hslCtx.fillStyle = "white";
    hslCtx.fill();

    var ctx = canvasEle3.getContext("2d");
    ctx.clearRect(-3000, -3000, 10000, 10000);
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.fillStyle = "#D9D9D9";
    ctx.fill();

    ctx = canvasEle4.getContext("2d");
    ctx.clearRect(-3000, -3000, 10000, 10000);
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.fillStyle = "#D9D9D9";
    ctx.fill();
    },[]);

//loading and clearing canvases
window.onload = function() {
    canvasHSL = document.getElementById("hsl-canvas");
    canvasRGB = document.getElementById("rgb-canvas");
    colorHSL = document.getElementById("rgb-canvas-color");
    colorRGB = document.getElementById("hsl-canvas-color");
    const canvasEle = canvasHSL;
    const canvasEle2 = canvasRGB;
    const canvasEle3 = colorHSL;
    const canvasEle4 = colorRGB;

    rgbCtx = canvasEle2.getContext("2d");
    rgbCtx.clearRect(-3000, -3000, 10000, 10000);
    rgbCtx.beginPath();
    rgbCtx.rect(0, 0, 1000, 1000);
    rgbCtx.fillStyle = "white";
    rgbCtx.fill();

    hslCtx = canvasEle.getContext("2d");
    hslCtx.clearRect(-3000, -3000, 10000, 10000);
    hslCtx.beginPath();
    hslCtx.rect(0, 0, 1000, 1000);
    hslCtx.fillStyle = "white";
    hslCtx.fill();

    var ctx = canvasEle3.getContext("2d");
    ctx.clearRect(-3000, -3000, 10000, 10000);
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.fillStyle = "#D9D9D9";
    ctx.fill();

    ctx = canvasEle4.getContext("2d");
    ctx.clearRect(-3000, -3000, 10000, 10000);
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.fillStyle = "#D9D9D9";
    ctx.fill();
};
const inputFile = useRef(null) 

function onButtonClick () {
    inputFile.current.click();
}; 
function ShowLightnessToolTip(){
    document.getElementById("lightnesstooltip").style.visibility = "visible";
    document.getElementById("lightnesstooltip").style.display = "block";
}
function CloseLightnessToolTip(){
    document.getElementById("lightnesstooltip").style.visibility = "hidden";
    document.getElementById("lightnesstooltip").style.display = "none";
}
function ShowRgbToolTip(){
    document.getElementById("rgbTip").style.visibility = "visible";
    document.getElementById("rgbTip").style.display = "block";
}
function CloseRgbToolTip(){
    document.getElementById("rgbTip").style.visibility = "hidden";
    document.getElementById("rgbTip").style.display = "none";
}
function ShowHslToolTip(){
    document.getElementById("hslTip").style.visibility = "visible";
    document.getElementById("hslTip").style.display = "block";
}
function CloseHslToolTip(){
    document.getElementById("hslTip").style.visibility = "hidden";
    document.getElementById("hslTip").style.display = "none";
}
function ShowColorToolTip(){
    document.getElementById("colorTip").style.visibility = "visible";
    document.getElementById("colorTip").style.display = "block";
}
function CloseColorToolTip(){
    document.getElementById("colorTip").style.visibility = "hidden";
    document.getElementById("colorTip").style.display = "none";
}
    return (
      <div className="total-page-wrapper">
         <img className="button-ex-rgb-pic" src={require('../fractal-page-components/FractalMain/pictures/folder.png')} alt="Owl" />
         <img className="button-ex-hsl-pic" src={require('../fractal-page-components/FractalMain/pictures/folder.png')} alt="Owl" />
         <img className="button-ex-imp-pic" src={require('../fractal-page-components/FractalMain/pictures/folderup.png')} alt="Owl" />
         <div id="lightnesstooltip" className='lightness-tooltip'>
            <span className='iteration-tooltip-text'>Lightness is the amount of white or black mixed in with the color.</span>
        </div>
        <img className="question-hsl" src={require('../fractal-page-components/FractalMain/pictures/buttonq_.png')} alt="Owl" />
        <img className="question-rgb" src={require('../fractal-page-components/FractalMain/pictures/buttonq_.png')} alt="Owl" />
        <div className='manager-wrapper'>
            <div className='manager-buttons-wrapper'>
                <button onClick={onButtonClick} className='upload-image-button'>Import image</button>
                <div className='red-lightness-wrapper'>
                <img className="question-pic-l" src={require('../fractal-page-components/FractalMain/pictures/question.png')} alt="Owl" />
                    <div className='red-pic-wr'>
                        <img className="red-pic" src={require('../fractal-page-components/FractalMain/pictures/red.png')} alt="Owl" />
                        <span className='experiment-text-header'>Change red <span className='iter' onMouseEnter={ShowLightnessToolTip}
                            onMouseLeave={CloseLightnessToolTip}>lightness</span>!</span>
                        
                    </div>
                    <input className='slider-color'
                                id="range" 
                                type="range" 
                                min="0" max="1" 
                                step="0.1"
                                defaultValue="0.5"
                                disabled = {disableRange?true:false}
                                onLostPointerCapture={alterLightness}/>
                    <span className='experiment-text'>Experiment!</span>
                    <span className='experiment-text'>Allocate an area of HSL-image by dragging your mouse to change lightness of that area!
                        To return back to editing the whole image press the button:
                    </span>
                    <button onClick={CancelSelectedArea} className='cancel-image-button'>Cancel area</button>
                </div>
            </div>
            <div className='tip-owl'>
                <div>
                    <div className="col-tip-wr" onClick={ShowColorToolTip}>
                        <span className="tip-wr-text">Tap to find out more about color schemes!</span>
                    </div>
                </div>
                <img className="koch-owl" src={require('../fractal-page-components/FractalMain/pictures/owl-books.png')} alt="Owl" 
                        onMouseEnter={ShowColorToolTip} onMouseLeave={CloseColorToolTip}/>
            </div>
            <input type='file' accept="image/png, image/gif, image/jpeg" id='file' ref={inputFile} style={{display: 'none'}} onChange={loadFile}/>
            <img id="output" width="400" height="400"  style={{display: 'none'} } alt=""/>
        </div>
        <div className='canvas-pictures-wrapper'>

            <div className='canvases'>
                <div className='separate-canvas'>
                    <div className='header-canvas'>
                        <span className='header-canvas-text'
                        onClick={ShowRgbToolTip} 
                        >RGB</span>
                    </div>
                    <canvas id="rgb-canvas" className="hsl-canvas" width="454px" onMouseMove={(event) => mouseMove(event)} 
                    
                        height="383px"   ref={canvasRGB} >
                    </canvas>
                    <button onClick={downloadRGB} className='download-image-button'>Export image</button>
                </div>

                <div className='separate-canvas'>
                    <div className='header-canvas'>
                        <span className='header-canvas-text'
                        onClick={ShowHslToolTip}
                        >HSL</span>
                    </div>
                    <canvas id="hsl-canvas" className="hsl-canvas" width="454px" onMouseMove={(event) => mouseMoveHSL(event)}
                    onMouseDown={(event) => mouseDown(event)}
                    onMouseUp={(event) => mouseUp(event)}
                        height="383px"   ref={canvasHSL} >
                    </canvas>
                    <button onClick={downloadHSL} className='download-image-button'>Export image</button>
                </div>
            </div>

            <div className='color-schemes'>

                <div className='separate-color-scheme'>
                    <div className='spans-wrappers'>
                        <div className='spans-inner-wrappers'>
                            <span className='color-span-label'>Red =</span>
                            <span className='color-span-label'>Blue =</span>
                            <span className='color-span-label'>White =</span>
                        </div>
                        <div className='spans-inner-wrappers'>
                            <span className='color-span' id="r"></span>
                            <span className='color-span' id="g"></span>
                            <span className='color-span' id="b"></span>
                        </div>
                    </div>
                    <div className='col-canvas-wrapper'>
                        <canvas id="rgb-canvas-color" className="hsl-canvas-color" width="100px" height="100px" ref={colorHSL}>
                        </canvas>
                    </div>
                </div>

                <div className='separate-color-scheme'>
                    <div className='spans-wrappers'>
                        <div className='spans-inner-wrappers'>
                            <span className='color-span-label'>Hue =</span>
                            <span className='color-span-label'>Saturation =</span>
                            <span className='color-span-label'>Lightness =</span>
                        </div>
                        <div className='spans-inner-wrappers'>
                            <span className='color-span' id="h"></span>
                            <span className='color-span' id="s"></span>
                            <span className='color-span' id="l"></span>
                        </div>
                    </div>
                    <div className='col-canvas-wrapper'>
                        <canvas id="hsl-canvas-color" className="hsl-canvas-color" width="100px" height="100px" ref={colorRGB}>
                        </canvas>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div id="colorTip">
            <div><ColorTip />
                <div className='close-btn' onClick={CloseColorToolTip}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
            </div>

        <div id="hslTip">
            <div><HSLTip />
                <div className='close-btn' onClick={CloseHslToolTip}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
            </div>

        <div id="rgbTip">
            <div><RGBTip />
                <div className='close-btn' onClick={CloseRgbToolTip}>
                    <img  src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        </div>

        <div id="diverror">
            <div>
                <img  className='error-pic' src={require('../fractal-page-components/FractalMain/pictures/error.png')} alt="Owl"/>
                <div className='total-tip-wrapper'>
                <div className='error-wrapper'>
                    <span className='error-text'><br/>Wrong file format!<br/>Please, choose files with format .png or.jpg</span><br/>
                </div>
                
            </div>
                <div className='close-btn-error' onClick={closeDivError}>
                    <img className='close-btn-error-pic' src={require('../fractal-page-components/FractalMain/pictures/cross.png')} alt="Owl"/>
                </div>
            </div>
        </div>       

      </div>
    );
  }
  
  export default ColorMain;


