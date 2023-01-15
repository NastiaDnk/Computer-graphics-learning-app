
import {useState, useEffect, useRef} from "react";
import {flushSync} from "react-dom";
import QuestionList from './questionsColor.json';
import QuizResult from './QuizResult.js';
import Question from './Question.js'

function Quiz({result, retry}){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers]=useState(new Array(QuestionList.length));
    const isQuestionEnd = currentQuestionIndex === QuestionList.length;
    
    return(
        <>
            <div className="quiz-screen">
                {
                isQuestionEnd ? (
                <QuizResult/>
                ):(
                <Question
                    question={QuestionList[currentQuestionIndex]}
                    totalQuestions={QuestionList.length}
                    currentQuestion={currentQuestionIndex+1}
                    setAnswer={(index)=>{
                    setMarkedAnswers((arr)=>{
                        let newArr = [...arr];
                        newArr [currentQuestionIndex] = index;
                        return newArr;
                    });
                    setCurrentQuestionIndex(currentQuestionIndex+1);
                    }} />
                )
                }
            </div>
        </>
    );
}
export default Quiz;
