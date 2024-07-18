import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

function Signup(){

    const [user_name , set_user_name] = useState("");
    const [user_email , set_user_email] = useState("");
    const [user_password , set_user_password] = useState("");
    const [message , set_message] = useState("");
    const navigate = useNavigate();

    const userSignup = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${BASE_URL}/signup`,{user_name , user_email , user_password});

            console.log(response);
            const data = response.data;
            if(data.message === 'User signed up successfully'){
                navigate("/login");
                console.log("Success");
            }
            else{
                set_message(data.message);
            }
        }
        catch(err){
            console.log("Error 404");
        }

    }

    return <div className="signup-container">
        <form method="post">
            <h1>Signup for <span>QuicLearn</span></h1>
            <input type="text" name="user_name" placeholder="Your name" onChange={(e)=>set_user_name(e.target.value)} value={user_name} />
            <input type="email" name="user_email" placeholder="Email" onChange={(e)=>set_user_email(e.target.value)} value={user_email} />
            <input type="password" name="user_password" placeholder="Password" onChange={(e)=>set_user_password(e.target.value)} value={user_password}/>
            <button type="submit" onClick={userSignup}>Signup</button>
            <div className="already_signed_up">
                <p>Already have an account?</p>
                <a href="/login">Login</a>
            </div>
            <p>{message}</p>
        </form>
    </div>
}

export default Signup;