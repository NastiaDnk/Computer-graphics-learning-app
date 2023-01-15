import './algebraicFractals.css';

function ColourSchemes() {
    return (
        <>
            <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>
                    <span className='tip-header'>Movement </span>
                    <span className='tip-text'><br/>Movements in computer graphics are made with <b>affine transformations</b>. There are three types of them:
                    <b>Translation</b>, <b>Scale</b> and <b>Rotation</b>. Affine transformation is a linear mapping method that preserves points, straight lines, and planes. 
                    Sets of parallel lines remain parallel after an affine transformation.</span><br/>
                    <img className="attitude-gif" src={require('../fractal-page-components/FractalMain/pictures/affine-gif.gif')} alt="Owl"/>

                    <span className='tip-text'><br/>To use affine transformations we have to write the coordinates as matrixes. Look at the example:</span><br/>
                    <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/affine-jpg.jpg')} alt="Owl"/>

                    <span className='tip-header'>Translation</span><br/>
                    <span className='tip-text'>We translate an object by adding matrix of translation to the starting coordinates. You can see the matrix of translation here:</span>
                    <div className='row'>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/translation.jpg')} alt="Owl"/>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/plus.jpg')} alt="Owl"/>
                    </div>
                    <span className='tip-text'>Translation of a triangle:</span>
                    <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/tr-gif.gif')} alt="Owl"/>

                    <span className='tip-header'>Scale</span><br/>
                    <span className='tip-text'>We scale an object by multiplying its coordinates with
                     matrix of scale. You can see the matrix of scale here:</span>
                    <div className='row'>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/scale.jpg')} alt="Owl"/>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/mult.jpg')} alt="Owl"/>
                    </div>
                    <span className='tip-text'>Scaling of rectangles:</span>
                    <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/scl-gif.gif')} alt="Owl"/>

                    <span className='tip-header'>Rotation</span><br/>
                    <span className='tip-text'>We rotate an object by multiplying its coordinates with
                    matrix of rotation. You can see the matrix of rotation here:</span>
                    <div className='row'>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/rotation.jpg')} alt="Owl"/>
                        <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/mult-plus.jpg')} alt="Owl"/>
                    </div>
                    <span className='tip-text'>Rotation of a square around a particular point and its centre simultaniously:</span>
                    <img className="gif" src={require('../fractal-page-components/FractalMain/pictures/rt-gif.gif')} alt="Owl"/>

                    

                    
                </div>
                
            </div>
        </>
    );
  }

  export default ColourSchemes;