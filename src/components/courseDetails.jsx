import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import '../styles/coursedetail.css'

const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

function CourseDetails() {
    const location = useLocation();
    const course_id = location.state.course_id;
    const [courseDetail, setCourseDetail] = useState([]);
    const [user_reviews, setUserReviews] = useState([]);
    const [num_items, setNumItems] = useState(0);
    const [review, setReview] = useState("");
    const [num_reviews, setNumReviews] = useState(0);

    const getCourseDetails = async () => {
        const response = await axios.post(`${BASE_URL}/getcoursedetails`, {
            course_id
        });
        setCourseDetail(response.data.course_detail);
    }

    const getAllReviews = async () => {
        let c_id = location.state.course_id;
        const response = await axios.post(`${BASE_URL}/getreviews`, {
            c_id
        });
        setUserReviews(response.data.all_reviews);
        setNumReviews(response.data.all_reviews.length);
    }

    useEffect(() => {
        getCourseDetails();
        getAllReviews();
    }, []);

    const makeCapital = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const addToCart = async (course_id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/addtocart`, {
                course_id
            }, {
                headers: {
                    Authorization: token
                }
            }, {
                withCredentials: true // Include cookies in request
            });

            if (response.data.message === 'Unauthorized user') {
                navigate("/login");
            }
            getNoOfItems();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getNoOfItems();
    }, []);

    const getNoOfItems = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/getnoofitems`, {
            headers: {
                Authorization: token
            }
        }, {
            withCredentials: true
        });
        setNumItems(response.data.no_of_items);
    }

    const addReview = async (course_id, review) => {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/addreview`, {
            course_id, review
        }, {
            headers: {
                Authorization: token
            }
        }, {
            withCredentials: true
        });

        if (response.data.message === 'Unauthorized user') {
            navigate("/login");
        }

        getAllReviews();
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        addReview(course_id, review);
    };

    return (
        <div className="coursedetail-container">
            <div className="course-detail-nav">
                <a href="/courses"><i className="fa-solid fa-arrow-left"></i> Back to Courses</a>
                <a href="/cart" className='viewcart'>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#5352ed", fontSize: "2rem" }}></i>
                    <p className='cart-count'>{num_items}</p>
                </a>
            </div>
            <div className="course-box">
                {courseDetail.map(course => {
                    return (
                        <div className="course-details" key={course._id}>
                            <div className="image-section">
                                <img src={course.image} alt="" />
                            </div>
                            <div className="text-section">
                                <h2>{makeCapital(course.title)} by <span>{course.author}</span></h2>
                                <p>{course.description}</p>
                                <p>Rating : {course.rating}<i className="fa-solid fa-star" style={{ color: "#5352ed" }}></i></p>
                                <p>Price : <i className="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{course.price}</p>
                                <button onClick={() => addToCart(course._id)}>Add to Cart</button>
                                <Link style={{cursor:"pointer"}} to="customer-reviews" smooth={true} duration={500}>
                                    See {num_reviews} reviews
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="customer-reviews" id="customer-reviews">
                <h1 style={{ fontWeight: "900" }}>Customer <span>Reviews</span></h1>
                <form onSubmit={handleReviewSubmit}>
                    <input type="text" id="Enter Review" onChange={(e) => setReview(e.target.value)} />
                    <button type="submit">Add review</button>
                </form>
                {user_reviews.map(review => {
                    return (
                        <div className="user-review" key={review.course_id}>
                            <h2><span>{review.user_name}</span></h2>
                            <p>{review.review}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CourseDetails;
