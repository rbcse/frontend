import '../styles/footer.css';
function Footer(){
    return <footer>
        <h1><span>Quic</span>Learn</h1>
        <div className="footer-icons">
            <a href="/about">About | </a>
            <a href="">Courses | </a>
            <a href="">Quiz | </a>
            <a href="">Blogs | </a>
            <a href="">FAQ's</a>
        </div>
        <h2>Follow us on:</h2>
        <div className="social-media">
            <i class="fa-brands fa-linkedin" style={ {color : 'white'} }></i>
            <i class="fa-brands fa-twitter" style={ {color : 'white'} }></i>
            <i class="fa-brands fa-facebook" style={ {color : 'white'} }></i>
        </div>
    </footer>
}

export default Footer;