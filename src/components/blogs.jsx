import { useState, useEffect } from 'react';
import '../styles/blogs.css';
import axios from "axios";
import {useNavigate} from "react-router-dom"

const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
function Blogs() {

    const [menuIcon, setMenuIcon] = useState("Menu");
    const [displayNavIcons, setNavIcons] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [para, setPara] = useState("");
    const [author, setAuthor] = useState("");
    const [blogsArr, setBlogArray] = useState([]);
    const [searchQuery , setSearchQuery] = useState("");
    const navigate = useNavigate();

    const showNavIcons = () => {
        if (menuIcon == "Menu") {
            setMenuIcon("Close");
            setNavIcons(true);
        }
        else {
            setMenuIcon("Menu");
            setNavIcons(false);
        }
    }

    const toggleFormVisibility = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    }

    const createBlog = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        else{

            const response = await axios.post(`${BASE_URL}/createblog`, {
                title, para, author
            }, {
                headers : {
                    Authorization:token
                }
            }, {
                withCredentials: true
            });
            console.log(response.data.message);
        }

    }

    const getBlogs = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        else{
            const response = await axios.get(`${BASE_URL}/getblogs`, {
                headers:{
                    Authorization:token
                }
            }, {
                withCredentials: true
            });
            setBlogArray(response.data.blog_arr);
        }
    }
    useEffect(() => {
        getBlogs();
    }, []);

    const getYourBlogs = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/getmyblogs` ,{
            headers:{
                Authorization:token
            }
        }, {
            withCredentials : true
        });
        setBlogArray(response.data.blog_arr);
    }

    const getBlogsBySearch = async() => {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/getblogsbysearch`,{
            searchQuery
        } , {
            headers:{
                Authorization:token
            }
        }, {
            withCredentials : true
        });
        setBlogArray(response.data.blog_arr);
    }

    const likeBlog = async(id) => {
        id = id.toString();
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/likeblog`,{
            id
        },{
            headers:{
                Authorization:token
            }
        },{
            withCredentials:true
        });
        setBlogArray(response.data.blog_arr);
    }
    const dislikeBlog = async(id) => {
        id = id.toString();
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/dislikeblog`,{
            id
        },{
            headers:{
                Authorization:token
            }
        },{
            withCredentials:true
        });
        setBlogArray(response.data.blog_arr);
    }

    return <div className="blog-section">
        <div className={`blog-nav-section ${displayNavIcons ? 'visible' : ''}`}>
            <a href="/" id="logo">Quic<span>Learn</span></a>
            <div className={`search-section ${displayNavIcons ? 'visible' : ''}`}>
                <input type="search" name="" id="" placeholder="Search blogs" onChange={(e) => setSearchQuery(e.target.value)} />
                <button onClick={getBlogsBySearch}>Search</button>
            </div>
            <a href="" onClick={toggleFormVisibility} className={`create ${displayNavIcons ? 'visible' : ''}`}>Create Blog</a>
            <button className={`yourblogs ${displayNavIcons ? 'visible' : ''}`} onClick={getYourBlogs}>Your Blogs</button>
            <button id="menu" onClick={showNavIcons}>{menuIcon}</button>
        </div>

        {showForm && <form>
            <h1>Create Your <span>Blog</span></h1>
            <input type="text" name="" id="" placeholder='Your Name' onChange={(e) => setAuthor(e.target.value)} />
            <input type="text" name="" id="" placeholder='Blog Title' onChange={(e) => setTitle(e.target.value)} />
            <textarea name="" id="" placeholder='Blog Content' onChange={(e) => setPara(e.target.value)}></textarea>
            <button onClick={createBlog}>Submit</button>
        </form>}

        <div className="show-blogs">
            {blogsArr.map(blog => {
                return <div className="blog-box" key={blog._id}>
                    <div className="first_section">
                        <h2>{blog.title}</h2>
                        <p>{blog.author}</p>
                    </div>
                    <p>{blog.para}</p>
                    <div className="last_section">
                        <div className="like-dislike">
                            <div className="like">
                                <i class="fa-regular fa-thumbs-up" onClick={()=>likeBlog(blog._id)}></i>
                                <p>{blog.num_likes}</p>
                            </div>
                            <div className="dislike">
                                <i class="fa-regular fa-thumbs-down" onClick={()=>dislikeBlog(blog._id)}></i>
                                <p>{blog.num_dislikes}</p>
                            </div>
                        </div>
                        <p id="dateSection">Created on: {blog.created_on}</p>
                    </div>
                </div>
            })}
        </div>

    </div>
}

export default Blogs;