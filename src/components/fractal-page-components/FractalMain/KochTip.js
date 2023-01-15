import './dragonTip.css';

function KochTip() {
    return (
        <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-subheader'>Koch fractal</span><br/>
                    <span className='tip-text'>Construction of the curve begins with a simple segment, this is the 0 generation of the 
                    Koch curve. Next, each such segment is replaced by the forming element. As a result of this 
                    replacement, the next generation of the Koch curve is obtained. In the 1st generation, it is a curve of four rectilinear links, each 1/3 in length. 
                    To obtain the 2nd generation, the same actions are carried out - each link is replaced by a reduced forming element.</span>

                    <img className="koch-gif" src={require('./pictures/koch-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>With the same algorithm we can create some other fractals. 
                    Take a look at obtained figure if we take three segments, not one:</span>
                    <img className="mandelbrot-gif" src={require('./pictures/snowflake.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>What about taking five starting segments? Oh, and let's try changing the direction of central part of the segment
                    ! There are literaly no limits:</span>
                    <img className="mandelbrot-gif" src={require('./pictures/Koch_5_antisnowflake.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>You can even experiment with the forming element, try different shapes! For example, square:</span>
                    <img className="mandelbrot-gif" src={require('./pictures/koch-square.png')} alt="Owl"/>

                </div>
                
            </div>
    );
  }
  
  export default KochTip;