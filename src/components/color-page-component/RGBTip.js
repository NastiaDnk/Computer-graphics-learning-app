import './rgbTip.css';

function RGBTip() {
    return(
        <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>RGB</span><br/>
                    <span className='tip-text'>Colour scheme which is used by all smart devices that you have at home - <b>RGB</b>.
                    Each color (red, green and blue) channel is expressed from 0 (least saturated) to 255 (most saturated). This means that 16,777,216 different colors
                     can be represented in the RGB color space. If we mix all colours at equal scale, we get shades of grey - from black (0, 0, 0) to white (255, 255, 255)</span>
                    <img className="attitude-gif" src={require('../fractal-page-components/FractalMain/pictures/RGB_colors.gif')} alt="Owl"/>
                    <span className='tip-text'>We also call RGB an <b>additive</b> color model, as we <b>add</b> some colours to get the final one.</span>

                    
                </div>
                
            </div>
    );
  }
  
  export default RGBTip;