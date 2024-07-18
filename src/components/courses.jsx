import { useState, useEffect } from 'react';
import '../styles/courses.css';
import axios from "axios";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
import { useNavigate , Link } from 'react-router-dom';

function Courses() {
    const [isVisible, setVisible] = useState(false);
    const [filterBtn, setFilterBtn] = useState("See filters");
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchRating, setsearchRating] = useState("");
    const [num_items, setNumItems] = useState(0);
    const navigate = useNavigate();

    const handleNavbar = () => {
        if (filterBtn === "See filters") {
            setFilterBtn("Close");
        } else {
            setFilterBtn("See filters");
        }
        setVisible(!isVisible);
    };

    useEffect(() => {

        const fetchCourses = async () => {
            const response = await axios.get(`${BASE_URL}/getcourses`);
            setCourses(response.data.courses);
        }

        fetchCourses();

    }, []);

    const getCoursesBySearch = async () => {
        const response = await axios.post(`${BASE_URL}/getcoursesbysearch`, {
            searchQuery
        });
        setCourses(response.data.courses);
    }

    const makeCapital = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const searchCoursesByRating = async () => {
        const response = await axios.post(`${BASE_URL}/getcoursesbyrating`, {
            searchQuery, searchRating
        })
        setCourses(response.data.courses);
    }

    const addToCart = async (course_id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/addtocart`, {
                course_id
            }, {
                headers:{
                    Authorization:token
                }
            } , {
                withCredentials: true // Include cookies in request
            });

            if(response.data.message == 'Unauthorized user'){
                navigate("/login");
            }
            getNoOfItems();
        } catch (err) {
            console.log(err);
        }
    }

    const viewDetailsOfCourse = (course_id)=>{
        navigate("/coursedetail",{state : {course_id}});
    }

    useEffect(() => {
        getNoOfItems();
    }, []);

    const getNoOfItems = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/getnoofitems`,{
            headers:{
                Authorization:token
            }
        } , {
            withCredentials: true
        });
        setNumItems(response.data.no_of_items);
    }

    return (
        <div className="course-section">
            <div className={`course-nav-section ${isVisible ? 'visible' : ''}`}>
                <div className="logo-section">
                    <a href="/">Quic<span>Learn</span></a>
                </div>
                <div className={`search-section ${isVisible ? 'visible' : ''}`}>
                    <input type="search" placeholder="Enter the course" onChange={(e) => setSearchQuery(e.target.value)} />
                    <button onClick={getCoursesBySearch}>Browse Courses</button>
                </div>
                <div className={`rating-section ${isVisible ? 'visible' : ''}`}>
                    <select onChange={(e) => setsearchRating(e.target.value)}>
                        <option value="Rating">Rating</option>
                        <option value="4+">4+</option>
                        <option value="3.5+">3+</option>
                        <option value="3+">2+</option>
                    </select>
                    <button onClick={searchCoursesByRating}>Apply</button>
                </div>
                <button id="see-filters" onClick={handleNavbar}>{filterBtn}</button>
                <a href="/cart" className='cart'>
                    <i class="fa-solid fa-cart-shopping" style={{ color: "#5352ed", fontSize: "2rem" }}></i>
                    <div className='cart-count'>{num_items}</div>
                </a>
            </div>

            <div className="show-courses-section">
                {courses.map(course => {
                    return <div className="course-card" key={course._id}>
                        <div className="img-section">
                            <img src={course.image} alt="" />
                        </div>
                        <div className="text-section">
                            <h2>{makeCapital(course.title)} by <span>{course.author}</span></h2>
                            <p>{course.description}</p>
                            <p>Rating : {course.rating}<i class="fa-solid fa-star" style={{ color: "#5352ed" }}></i></p>
                            <p>Price : <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{course.price}</p>
                            <button onClick={()=>viewDetailsOfCourse(course._id)}>View Details</button>
                        </div>
                    </div>
                })}
            </div>

        </div>
    );
}

export default Courses;
