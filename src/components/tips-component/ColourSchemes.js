import './algebraicFractals.css';

function ColourSchemes() {
    return (
        <>
            <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>Color schemes</span>
                    <span className='tip-text'><br/>There are several shemes how a colour can be presented. Each of them is used for some unique purposes.
                    Let's take a look at the most important ones!</span><br/>
                    
                    <span className='tip-header'>RGB</span><br/>
                    <span className='tip-text'>Colour scheme which is used by all smart devices that you have at home - <b>RGB</b>.
                    Each color (red, green and blue) channel is expressed from 0 (least saturated) to 255 (most saturated). This means that 16,777,216 different colors
                     can be represented in the RGB color space. If we mix all colours at equal scale, we get shades of grey - from black (0, 0, 0) to white (255, 255, 255)</span>
                    <img className="attitude-gif" src={require('../fractal-page-components/FractalMain/pictures/RGB_colors.gif')} alt="Owl"/>
                    <span className='tip-text'>We also call RGB an <b>additive</b> color model, as we <b>add</b> some colours to get the final one.</span>

                    <span className='tip-header'>HS* schemes</span>
                    <span className='tip-text'><br/>There are some shcemes which use 2 same components: <b>hue</b> and <b>saturation</b>.
                    The last component can differ, that's why we call the HS* schemes</span><br/>


                    <span className='tip-subheader'>HSL</span><br/>
                    <span className='tip-text'>Imagine you have to paint something in colour of the November sky in you city. It wouldn't be very convenient to use RGB.
                    And that’s where HSL steps in. The only thing you really need to learn about HSL is the color wheel. Take a look at picture below.</span><br/>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsl-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>You can pick any colour aroud the circle - we use <b>hue (h)</b> for it. It changes from 0 to 360 degrees. The further you move from
                    the centre of this double cone, the more saturated your colour will be. Here we use <b>saturation (S)</b> and change it from 0 to 1. 
                    To change the lightness move vertically through the centre of your cone. <b>Lightness (l)</b> also changes from 0 to 1.</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsl-png.png')} alt="Owl"/>


                    <span className='tip-subheader'>HSV</span><br/>
                    <span className='tip-text'><br/>First two component in this scheme are the same as in HSL: hue and saturation. Some interestion information about hue:
                    In all HS* schemes:<br/>Red falls between 0 and 60 degrees.
                    <br/>Yellow falls between 61 and 120 degrees.
                    <br/>Green falls between 121 and 180 degrees.
                    <br/>Cyan falls between 181 and 240 degrees.
                    <br/>Blue falls between 241 and 300 degrees.
                    <br/>Magenta falls between 301 and 360 degrees</span><br/>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsv-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/><b>Value (v)</b> works in conjunction with saturation 
                    and describes the brightness or intensity 
                    of the color, from 0 to 1, 
                    where 0 is completely black, and 1
                    is the brightest and reveals the most color.</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsv-png.png')} alt="Owl"/>

                    
                </div>
                
            </div>
        </>
    );
  }

  export default ColourSchemes;