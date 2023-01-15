import './algebraicFractals.css';

function StochasticFractals() {
    return (
        <>
            <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>Stochastic Fractals</span>
                    <span className='tip-text'><br/>We can get <b>stochastic</b> fractals by changing something in iterations of geometry and algebraic fractals <i>randomly</i>.</span><br/>
                    <img className="koch-gif" src={require('../fractal-page-components/FractalMain/pictures/randomized-koch.gif')} alt="Owl"/>

                    <span className='tip-text'>Do you recognize the Koch fractal on picture A? What about picture B? Here it is - randomized Koch fractal!<br/><br/></span>
                
                    <span className='tip-text'>But why do people use them? What does picture B remind you of? An island? A cloud? Or take a look at picture below!
                    Isn't it a shceme of a mountain? That's the usage, people create different shapes with fractals.</span>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/statistical-Koch-curves.png')} alt="Owl"/>

                    <span className='tip-text'><br/>Here is an another example of stachastic fractals - <b>Plasma</b> fractal. Imagine using a special
                    algorithm to fill a particular square with different colours. Here is what we get:</span>
                    <img className="mandelbrot-img" src={require('../fractal-page-components/FractalMain/pictures/plasma-gif.gif')} alt="Owl"/>
                    
                    <span className='tip-text'><br/>Seems to be useless, doesn't it? What about replacing the colours with particular attitudes:</span>

                    <img className="attitude-gif" src={require('../fractal-page-components/FractalMain/pictures/attitudes.png')} alt="Owl"/>

                    <span className='tip-text'><br/>Appears to be more interesting. Programmers use Plasma fractal to create sceneries for computer
                    games, films and so on.</span>
                    
                </div>
                
            </div>
        </>
    );
  }

  export default StochasticFractals;