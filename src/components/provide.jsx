import Product from "./product"
import '../styles/provide.css';
function Provide(){
    return <div className="provide-section">
        <h1>What we provide on Quic<span>Learn</span>?</h1>
        <div className="products">
            <Product link="/courses" image="../../course.jpg" heading="Courses" btn="Explore courses" />
            <Product link="/quizhome" image="../../quiz.jpg" heading="Quiz" btn="Give Quiz" />
            <Product link="/blogs" image="../../blogs.jpg" heading="Blogs" btn="Write Blogs" />
            <Product link="/" image="../../create.avif" heading="Create course" btn="Create" />
        </div>
    </div>
}

export default Provide;