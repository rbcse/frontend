import '../styles/testimonial.css';
function TestCard(props){
    return <div>
        <img src={props.image} alt="" />
        <p>{props.review}</p>
        <button>{props.btn}</button>
    </div>
}

export default TestCard;