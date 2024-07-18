import FaqBox from './faqbox';
import '../styles/faq.css';

function FAQ() {
    const faqs = [
        {
            question: "Is there a fee to use QuicLearn?",
            answer: "QuicLearn offers both free and premium content. Some quizzes and courses are available for free, while others require a subscription."
        },
        {
            question: "What types of courses does QuicLearn offer?",
            answer: "QuicLearn offers courses in various computer science fields, including programming languages, data structures, algorithms, machine learning, web development, and more."
        },
        {
            question: "How are the courses structured?",
            answer: "Courses are structured into modules, each containing several lessons. Lessons include video lectures, reading materials, and quizzes to test your knowledge."
        },
        {
            question: "Can I get a certificate after completing a course?",
            answer: "Yes, upon successfully completing a course, you will receive a certificate of completion that you can share on your resume or LinkedIn profile."
        },
        {
            question: "What types of quizzes are available on QuicLearn?",
            answer: "QuicLearn offers a variety of quizzes covering different topics in computer science. These include multiple-choice questions, coding challenges, and true/false questions."
        },
        {
            question: "How are quizzes graded?",
            answer: "Quizzes are graded automatically. You will receive immediate feedback on your answers along with explanations for any incorrect answers."
        }
    ];

    return (
        <div className="faq-section">
            <h1>Frequently Asked Questions</h1>
            <div className="faqs">
                {faqs.map((faq, index) => (
                    <FaqBox key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
}

export default FAQ;
