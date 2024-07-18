import '../styles/faq.css';
import { useState, useRef, useEffect } from 'react';

function FaqBox(props) {
    const [isAnswerVisible, setAnswerVisible] = useState(false);
    const answerRef = useRef(null);
    const [answerHeight, setAnswerHeight] = useState(0);

    const changeBtn = () => {
        setAnswerVisible(!isAnswerVisible);
    };

    useEffect(() => {
        if (isAnswerVisible) {
            setAnswerHeight(answerRef.current.scrollHeight);
        } else {
            setAnswerHeight(0);
        }
    }, [isAnswerVisible]);

    return (
        <div className="faqBox-section">
            <div className="faq-question-section">
                <h2>{props.question}</h2>
                {!isAnswerVisible && <i onClick={changeBtn} className="fa-solid fa-chevron-down"></i>}
                {isAnswerVisible && <i onClick={changeBtn} className="fa-solid fa-chevron-up"></i>}
            </div>
            <div
                className={`answer-section ${isAnswerVisible ? 'visible' : ''}`}
                style={{ height: isAnswerVisible ? `${answerHeight}px` : '0' }}
                ref={answerRef}
            >
                <p>{props.answer}</p>
            </div>
        </div>
    );
}

export default FaqBox;
