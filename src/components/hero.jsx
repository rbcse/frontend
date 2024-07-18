import '../styles/hero.css';
function Hero(){
    return <div className="hero-section">
        <div className="image-section">
            <img src="../../hero.png" alt="" />
        </div>
        <div className="text-section">
            <h1>Welcome to Quic<span>Learn</span></h1>
            <h2>Learn the industrial technologies in Software development.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quam blanditiis nam illum itaque maxime, earum eos. Velit iure numquam delectus illo laborum voluptatibus sint.</p>
        </div>
    </div>
}

export default Hero;