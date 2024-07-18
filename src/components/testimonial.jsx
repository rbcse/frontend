import TestCard from "./testcard";
import '../styles/testimonial.css';
import { useState, useLayoutEffect } from "react";

function Testimonial() {

    const test_arr = [
        { 
            image: '/img1.jpg', 
            btn: 'John Doe', 
            review: 'QuicLearn has revolutionized my learning experience. The courses are well-structured and the instructors are top-notch. ' 
        },
        { 
            image: '/img2.avif', 
            btn: 'Jane Smith', 
            review: 'I love the variety of courses available on QuicLearn. The platform is user-friendly and the content is engaging. ' 
        },
        { 
            image: '/img3.avif', 
            btn: 'Micheal Johnson', 
            review: 'QuicLearn has been a game-changer for my career. The flexibility to learn at my own pace is unparalleled.' 
        },
        { 
            image: '/img4.avif', 
            btn: 'Emily Davis', 
            review: 'The instructors on QuicLearn are very knowledgeable and the courses are well-organized. ' 
        },
        { 
            image: '/img5.avif', 
            btn: 'Charles Jordan', 
            review: 'Fantastic platform! QuicLearn offers a wide range of courses that are perfect for both beginners and experts. ' 
        },
        { 
            image: '/img6.jpg', 
            btn: 'Patricia Taylor', 
            review: 'The course content is always up-to-date and the community forums are a great place to connect with other learners. Five stars all the way!' 
        },
    ];
    

    const [visibleCards, setVisibleCards] = useState([]);

    const updateVisibleCards = () => {
        if (window.innerWidth <= 450) {
            setVisibleCards([0]);
        } else {
            setVisibleCards([0, 1, 2, 3]);
        }
    };

    useLayoutEffect(() => {
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const handlePrev = () => {
        let newArr = [];
        for (let i = 0; i < 4; i++) {
            newArr[i] = (visibleCards[i] - 1 + test_arr.length) % test_arr.length;
        }
        setVisibleCards(newArr);
    };

    const handleNext = () => {
        let newArr = [];
        for (let i = 0; i < 4; i++) {
            newArr[i] = (visibleCards[i] + 1) % test_arr.length;
        }
        setVisibleCards(newArr);
    };

    return (
        <div className="testimonials">
            <h1>Testimonials</h1>
            <div className="outer-section">
                <i onClick={handlePrev} className="fa-solid fa-chevron-left"></i>
                <div className="test-cards">
                    {test_arr.map((obj, index) => (
                        <div key={index} className={`test-card ${visibleCards.includes(index) ? 'visible' : ''}`}>
                            <TestCard key={index} review={obj.review} image={obj.image} btn={obj.btn} />
                        </div>
                    ))}
                </div>
                <i onClick={handleNext} className="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    );
}

export default Testimonial;
