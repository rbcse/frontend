import '../styles/contact.css';
function Contact(){
    return <div className="contact-section">
        <div className="image-section">
            <img src="../../contact.jpg" alt="" />
        </div>
        <form action="">
            <h1>Contact Us</h1>
            <input type="text" name="" placeholder="Your name" />
            <input type="email" name="" placeholder="Your email" />
            <textarea name="" placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
        </form>
    </div>
}

export default Contact;