import '../styles/product.css';
function Product(props){
    return <div className="product-card">
        <img src={props.image} alt="" />
        <h2>{props.heading}</h2>
        <a href={props.link}>{props.btn}</a>
    </div>
}

export default Product;