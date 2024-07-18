import axios from 'axios';
import '../styles/userprofile.css';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
import {useNavigate} from 'react-router-dom';
function UserProfile() {

    const [userInfo, setUserInfo] = useState({});
    const [userBlogs, setUserBlogs] = useState([]);
    const [quizData, setquizData] = useState([]);
    const [courseData , setCourseData] = useState([]);
    const navigate = useNavigate();
    const getuserdetails = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/getprofiledetails`,{
            headers:{
                Authorization:token
            }
        }, { withCredentials: true });
        setquizData(response.data.userDetails.quiz_data);
        setUserInfo(response.data.userDetails);
        setUserBlogs(response.data.userDetails.blogs)
        setCourseData(response.data.courseDetails);
    }

    useEffect(() => {
        getuserdetails();
    }, []);

    const makeCapital = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const Logout = async()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

    return <div className="container">
        <div className="inner-container">
            <header>
                <a href="/">Quic<span>Learn</span></a>
                <button onClick={Logout}>Logout</button>
            </header>
            <div className="user-detail-section">
                <div className="user-name">
                    <p>Username : </p>
                    <p>{userInfo.user_name}</p>
                </div>
                <div className="user-email">
                    <p>Useremail : </p>
                    <p>{userInfo.user_email}</p>
                </div>
                <div className="border"></div>
            </div>

            <div className="other-details">
                <div className="Quizzes">
                    <h1>Your Quizzes</h1>
                    <div className="all_quizzes">
                        {quizData.map(quiz => {
                            return <div className="inner-quiz-section" key={quiz._id}>
                                <p>{quiz.quizSub}</p>
                                <p>{quiz.score} / {quiz.total}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="border"></div>
                <div className="Courses">
                    <h1>Your Courses</h1>
                    <div className="all_courses">
                        {courseData.map(one_course => {
                            return <div className="one_course" key={one_course.course_id}>
                                <img src={one_course.course.image} alt="" />
                                <h2>{makeCapital(one_course.course.title)} by <span>{one_course.course.author}</span></h2>
                                <p>{one_course.course.description}</p>
                                <p>Rating : {one_course.course.rating}<i class="fa-solid fa-star" style={{ color: "#5352ed" }}></i></p>
                            <p>Price : <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{one_course.course.price}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="border"></div>
                <div className="Blogs">
                    <h1>Your Blogs</h1>
                    <div className="all_blogs">
                        {userBlogs.map(blog => {
                            return <div className="blog-box" key={blog._id}>
                                <div className="first_section">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.author}</p>
                                </div>
                                <p>{blog.para}</p>
                                <div className="last_section">
                                    <div className="like-dislike">
                                        <div className="like">
                                            <i class="fa-regular fa-thumbs-up" onClick={() => likeBlog(blog._id)}></i>
                                            <p>{blog.num_likes}</p>
                                        </div>
                                        <div className="dislike">
                                            <i class="fa-regular fa-thumbs-down" onClick={() => dislikeBlog(blog._id)}></i>
                                            <p>{blog.num_dislikes}</p>
                                        </div>
                                    </div>
                                    <p id="dateSection">Created on: {blog.created_on}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UserProfile;