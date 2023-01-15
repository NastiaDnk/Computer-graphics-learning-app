import './algebraicFractals.css';

function GeometrycFractals() {
    return (
        <>
            <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>Geometry Fractals</span>
                    <span className='tip-text'><br/>Fractals are infinitely complex patterns that are self-similar across different scales.
                     They are created by repeating a simple process over and over in an ongoing feedback loop.</span><br/>
                    <img className="mandelbrot-img" src={require('../fractal-page-components/FractalMain/pictures/geometry-math.gif')} alt="Owl"/>
                    
                    <span className='tip-subheader'>Koch fractal</span><br/>
                    <span className='tip-text'>Construction of the curve begins with a simple segment, this is the 0 generation of the 
                    Koch curve. Next, each such segment is replaced by the forming element. As a result of this 
                    replacement, the next generation of the Koch curve is obtained. In the 1st generation, it is a curve of four rectilinear links, each 1/3 in length. 
                    To obtain the 2nd generation, the same actions are carried out - each link is replaced by a reduced forming element.</span>

                    <img className="koch-gif" src={require('../fractal-page-components/FractalMain/pictures/koch-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>With the same algorithm we can create some other fractals. 
                    Take a look at obtained figure if we take three segments, not one:</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/snowflake.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>What about taking five starting segments? Oh, and let's try changing the direction of central part of the segment
                    ! There are literaly no limits:</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/Koch_5_antisnowflake.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>You can even experiment with the forming element, try different shapes! For example, square:</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/koch-square.png')} alt="Owl"/>

                    <span className='tip-subheader'>Dragon's fractal</span><br/>

                    <span className='tip-text'>This fractal got its name because of similarity to dragon. Just take a look:
                    </span><br/>
                    <img className="dagon-png" src={require('../fractal-page-components/FractalMain/pictures/dragon.png')} alt="Owl"/>

                    <span className='tip-text'>To create this fractal with a programme you have to enter values for:<br/><i>n</i> - total number of lines,<br/>
                    and sometimes<br/><i>l</i> - length of the first line.</span>
                    
                    <span className='tip-text'>The length of each next segment will be calculated by formula:</span>
                    <span className='tip-subheader'>(1/2<sup>n</sup>)d,</span>
                    <span className='tip-text'>where <i>d</i> is the length of previous iteration segment.<br/><br/>Than programme will replace
                    previous segment with obtained element. Each new segment has to be rotated by 45 degrees.</span>
                    <img className="julia-gif" src={require('../fractal-page-components/FractalMain/pictures/dragon-steps_2.gif')} alt="Owl"/>
                </div>
                
            </div>
        </>
    );
  }

  export default GeometrycFractals;