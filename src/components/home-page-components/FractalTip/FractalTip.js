import './fractalTip.css';

function FractalTip(props) {
    return (props.trigger) ?(
        <div className="tip-wrapper">
            <div className="content-wrapper">

            </div>
        </div>
    ):"";
  }
  
  export default FractalTip;