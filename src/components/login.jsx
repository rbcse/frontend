import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css';
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

function Login() {
  const [user_email, set_user_email] = useState("");
  const [user_password, set_user_password] = useState("");
  const [message, set_message] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}/login`, {
      user_email, user_password
    }, { withCredentials: true });
    const data = await response.data;
    if (data.message === 'Login Successful') {
      localStorage.setItem("token",data.token);
      console.log(data.token);
      navigate("/");
    } else {
      set_message(data.message);
    }
  };

  return (
    <div className="login-container">
      <form method="post">
        <h1>Login to <span>QuicLearn</span></h1>
        <input type="email" name="user_email" placeholder="Email" onChange={(e) => set_user_email(e.target.value)} value={user_email} />
        <input type="password" name="user_password" placeholder="Password" onChange={(e) => set_user_password(e.target.value)} value={user_password} />
        <button type="submit" onClick={userLogin}>Login</button>
        <div className="create_account">
          <p>New to <span>QuicLearn?</span></p>
          <a href="/signup">Create account</a>
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Login;
