import { useLocation , useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/displayquiz.css';
import axios from "axios";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
function DisplayQuizzes(){

    const location = useLocation();
    const quizArr = location.state.quizData;
    const navigate = useNavigate();

    const [selectedAnswers , setSelectedAnswers] = useState(Array(quizArr.length).fill(null));
    const subject = quizArr[0].subject.toLowerCase();
    const [score , setScore] = useState("");
    const [total , setTotal] = useState("");

    const handleOptionChange = (questionIndex , optionIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(updatedAnswers);
    }

    const renderQuestions = () => {
        const elements = [];
        for(let i=0;i<quizArr.length;i++){
            const question = quizArr[i];
            elements.push(
                <div className="question-section" key={i}>
                    <h2>{i+1}. {question.question_text}</h2>
                    <div className="option">
                        <input type="radio" name={`question${i}`} id="" checked={selectedAnswers[i] === 1} onChange={()=>handleOptionChange(i,1)} />
                        <p>{question.option1}</p>
                    </div>
                    <div className="option">
                        <input type="radio" name={`question${i}`} id="" checked={selectedAnswers[i] === 2} onChange={()=>handleOptionChange(i,2)} />
                        <p>{question.option2}</p>
                    </div>
                    <div className="option">
                        <input type="radio" name={`question${i}`} id="" checked={selectedAnswers[i] === 3} onChange={()=>handleOptionChange(i,3)} />
                        <p>{question.option3}</p>
                    </div>
                    <div className="option">
                        <input type="radio" name={`question${i}`} id="" checked={selectedAnswers[i] === 4} onChange={()=>handleOptionChange(i,4)} />
                        <p>{question.option4}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }

    const submitAnswers = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/calculateScore` , {
            selectedAnswers , subject
        } , {
            headers:{
                Authorization:token
            }
        } , {withCredentials:true});
        const score = response.data.score;
        const total = response.data.total;
        setScore(score);
        setTotal(total);
        const score_arr = [score , total];
        navigate("/showScore",{state : score_arr});
    }

    return <div className="display-quiz-section">
        <h1>Welcome to <span>{quizArr[0].subject.toUpperCase()}</span> Quiz</h1>
        {renderQuestions()}
        <div className="btns">
            <a href="/quizhome">Go Back</a>
            <button onClick={submitAnswers}>Submit Answers</button>
        </div>
    </div>


}

export default DisplayQuizzes;