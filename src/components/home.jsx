import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import '../styles/home.css';
import Hero from "./hero";
import Provide from "./provide";
import FAQ from "./faq";
import Testimonial from "./testimonial";
import Footer from "./footer";
function Home(){


    return <div className="home-section">
        <Navbar/>
        <Hero />
        <Provide />
        <FAQ />
        <Testimonial />
        <Footer />
    </div>
}

export default Home;