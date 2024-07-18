import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import About from './components/about';
import Quiz from './components/Quiz';
import Add from './components/add';
import DisplayQuizzes from './components/displayQuizzes';
import Score from './components/score';
import Courses from './components/courses';
import AddCourse from './components/addcourse';
import Cart from './components/cart';
import Blogs from './components/blogs';
import UserProfile from './components/userprofile';
import CourseDetails from './components/courseDetails';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/quizhome" element={<Quiz/>} />
        <Route path="/add" element={<Add />} />
        <Route path="/displayQuizzes" element={<DisplayQuizzes />} />
        <Route path="/showScore" element={<Score/>} />
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/addcourse" element={<AddCourse/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path='/coursedetail' element={<CourseDetails/>}/>
      </Routes>
    </Router>
  )

}

export default App;