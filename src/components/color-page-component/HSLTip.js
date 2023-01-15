import './hslTip.css';

function RGBTip() {
    return (
        <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-subheader'>HSL</span><br/>
                    <span className='tip-text'>Imagine you have to paint something in colour of the November sky in you city. It wouldn't be very convenient to use RGB.
                    And that’s where HSL steps in. The only thing you really need to learn about HSL is the color wheel. Take a look at picture below.</span><br/>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsl-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>You can pick any colour aroud the circle - we use <b>hue (h)</b> for it. It changes from 0 to 360 degrees. The further you move from
                    the centre of this double cone, the more saturated your colour will be. Here we use <b>saturation (S)</b> and change it from 0 to 1. 
                    To change the lightness move vertically through the centre of your cone. <b>Lightness (l)</b> also changes from 0 to 1.</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/hsl-png.png')} alt="Owl"/>
                </div>
            </div>
    );
  }
  
  export default RGBTip;