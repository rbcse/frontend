import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/quiz.css';
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
function Quiz(){

    const [subject , setSubject] = useState("");
    const [message , setMessage] = useState("");
    const navigate = useNavigate();
    const searchQuiz = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        else{
            const response = await axios.post(`${BASE_URL}/searchSubject` , {
                subject
            } , {
                headers : {
                    Authorization : token
                }
            } , {withCredentials : true});
    
            if(response.data.message == "Subject field cannot be empty"){
                setMessage(response.data.message);
                navigate("/quizhome");
            }
            else{
                const quizData = response.data.quizzes;
                console.log(quizData);
                navigate("/displayQuizzes",{state : {quizData}});
            }
        }
    }

    return <div className="quiz-section">
        <div className="image-section">
            <img src="../../quizpage.jpg" alt="" />
        </div>
        <div className="form-section">
            <form method="post">
                <h1>Test your <span>Knowledge</span></h1>
                <input type="search" name="" placeholder="Enter subject here" onChange={(e) => setSubject(e.target.value)} required/>
                <button onClick={searchQuiz}>Start Quiz</button>
                <a href="/"><i class="fa-solid fa-arrow-left-long"></i> Back to Home</a>
                <p>{message}</p>
            </form>
        </div>
    </div>
}

export default Quiz;