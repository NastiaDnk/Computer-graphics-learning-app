
import {useState, useEffect, useRef} from "react";
import {flushSync} from "react-dom";

function QuizResult({result, retry}){
    
    
    return(
        <>
            <div className="result-screen">
                <span>Result: {result.percentage}%</span>
                <span>Selected: {result.correct} correct options out of {result.total} questions.</span>
                <button onClick={retry}>Retry</button>
            </div>
        </>
    );
}
export default QuizResult;
