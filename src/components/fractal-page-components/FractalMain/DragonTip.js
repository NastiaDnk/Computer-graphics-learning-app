import './dragonTip.css';

function DragonTip() {
    return (
        <div className='total-tip-wrapper'>
                <div className='tip-wrapper'>

                    <span className='tip-subheader'>Dragon's fractal</span><br/>

                    <span className='tip-text'>This fractal got its name because of similarity to dragon. Just take a look:
                    </span><br/>
                    <img className="dagon-png" src={require('./pictures/dragon.png')} alt="Owl"/>

                    <span className='tip-text'>To create this fractal with a programme you have to enter values for:<br/><i>n</i> - total number of lines,<br/>
                    and sometimes<br/><i>l</i> - length of the first line.</span>
                    
                    <span className='tip-text'>The length of each next segment will be calculated by formula:</span>
                    <span className='tip-subheader'>(1/2<sup>n</sup>)d,</span>
                    <span className='tip-text'>where <i>d</i> is the length of previous iteration segment.<br/><br/>Than programme will replace
                    previous segment with obtained element. Each new segment has to be rotated by 45 degrees.</span>
                    <img className="julia-gif" src={require('./pictures/dragon-steps_2.gif')} alt="Owl"/>
                </div>
                
            </div>
    );
  }
  
  export default DragonTip;