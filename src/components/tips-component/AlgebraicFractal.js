import './algebraicFractals.css';
import {useState} from 'react';

function AlgebraicFractals() {

    const [isOpen, setIsOpen] = useState(true);

    function closeClicked(){
        //props.var = false;
    }

    return (
        <>
            <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>Algebraic Fractals</span>
                    <span className='tip-text'><br/>Some fractals arise by repeating a simple calculation many times, and feeding the output into the input. The first such fractal we consider is named 
                        after Benoit Mandelbrot, who coined the word fractal in the 1960s to capture the idea of fragmentation at all scales.</span><br/>
                    <img className="mandelbrot-img" src={require('../fractal-page-components/FractalMain/pictures/mandelbrot.jpg')} alt="Owl"/>
                    
                    <span className='tip-subheader'>Complex numbers</span>
                    <span className='tip-text'>To understand the process of building this fractal we have to find out what the complex number is!</span><br/>
                    <span className='tip-text'>Complex numbers are the numbers that are expressed in the form of a+ib where, a,b are real numbers and 'i' is an imaginary number called “iota”. 
                        The value of i = (√-1). For example, 2+3i is a complex number, where 2 is a real number (Re) 
                        and 3i is an imaginary number (Im).</span>
                    
                    <span className='tip-subheader'>Mandelbrot set</span>
                    <span className='tip-text'>Every complex number can be thought of as a point geomet.
                    Starting with z<sub>0</sub>= 0, generate the sequence z<sub>1</sub>, 
                    z<sub>2</sub>, z<sub>3</sub>,… using the equation </span>
                    <span className='tip-subheader'>z<sub>n+1</sub>=z<sub>n</sub><sup>2</sup>+c</span>

                    <span className='tip-text'>Consider coloring the points cc in the complex plane C depending on whether or not the resulting sequence tends to infinity.
                    z<sub>1</sub>, 
                    z<sub>2</sub>, z<sub>3</sub>,… tends to infinity. All starting values of C outside the Mandelbrot set give rise to a
                     sequence that goes to infinity. The color of the pixels are determined by how quickly the sequence gets farther from 
                     the origin (and runs away to infinity). All points within the Mandelbrot set
                     gives rise to a sequence whose values get smaller or alternate between a domain of fixed values.
                    </span><br/>
                    <img className="mandelbrot-gif" src={require('../fractal-page-components/FractalMain/pictures/Mandelbrot_color_zoom.gif')} alt="Owl"/>
                    <span className='tip-text'>The boundary of the Mandelbrot set is the set of points <i>p</i> for which every circle 
                        centered at <i>p</i> contains points both in the Mandelbrot set and not in the Mandelbrot set. 
                        By zooming into the Mandelbrot set boundary, we see that it contains 
                        infinitely many copies of the Mandelbrot set.</span>

                    <span className='tip-subheader'>Julia set</span>
                    <span className='tip-text'>Now, rather than varying <i>c</i>, suppose we fix a value of cc and for every pointz<sub>0</sub>
                    in the complex plane, again consider the sequence z<sub>1</sub>, 
                    z<sub>2</sub>, z<sub>3</sub>,… generated by</span>
                    <span className='tip-subheader'>z<sub>n+1</sub>=z<sub>n</sub><sup>2</sup>+c</span>
                    <span className='tip-text'>Now, color in the starting points z<sub>0</sub> in the complex plane whose sequences do not 
                    run away to infinity. This gives rise to one Julia set for each complex number <i>c</i>. 
                    Here are a few examples of Julia set boundaries:</span>
                    <img className="julia-gif" src={require('../fractal-page-components/FractalMain/pictures/julia_set_1.gif')} alt="Owl"/>
                    <span className='tip-text'>Julia set boundary for <i>c</i>≈−0.75+0.047<i>i</i>.</span>
                    <img className="julia-gif" src={require('../fractal-page-components/FractalMain/pictures/julia_set_2.jpg')} alt="Owl"/>
                    <span className='tip-text'>Julia set boundary for <i>c</i>≈−0.74543+0.113<i>i</i>.</span>
                </div>
                
            </div>
        </>
    );
  }

  export default AlgebraicFractals;
