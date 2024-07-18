import '../styles/score.css';
import { useLocation } from 'react-router-dom';
function Score() {
    const location = useLocation();
    const userScore = location.state[0];
    const totalScore = location.state[1];
    return <div className="score-section">
        <div className="box">
            <img src="../../tick.jpg" alt="" />
            <h2>Thank You for attempting the <span>Quiz</span></h2>
            <p>Your Score : {userScore} / {totalScore}</p>
            <a href="/">Ok</a>
        </div>
    </div>
}

export default Score;