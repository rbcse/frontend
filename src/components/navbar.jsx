import '../styles/navbar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

function Navbar(props) {
    const [showNavIcons, setShowNavIcons] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const showIcons = () => {
        setShowNavIcons(true);
    }

    const hideIcons = () => {
        setShowNavIcons(false);     
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/getuserdetails`,{
                    headers:{
                        Authorization:token
                    }
                }, { withCredentials: true });
                setUsername(response.data.username);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching username", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={`navbar-section ${showNavIcons ? 'change' : ''}`}>
            <div className="logo-section">
                <a href="/">Quic<span>Learn</span></a>
            </div>
            <div className={`nav-icons ${showNavIcons ? 'visible' : 'hide'}`}>
                <a href="/about">About</a>
                <a href="/courses">Courses</a>
                <a href="/quizhome">Quiz</a>
                <a href="/blogs">Blogs</a>
                {username ? (
                    <a id="user_profile" href="/userprofile">My account</a>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
            <div className={`menu-icon ${showNavIcons ? 'hide':'visible'}`}>
                <img onClick={showIcons} src="../../menu.png" alt="" />
            </div>
            <div className={`close-icon ${showNavIcons ? 'visible':'hide'}`}>
                <img onClick={hideIcons} src="../../close.png" alt="" />
            </div>
        </div>
    );
}

export default Navbar;
