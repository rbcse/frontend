import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../styles/cart.css';
import {useNavigate} from "react-router-dom";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

function Cart() {

    const [courseArray, setCourseArray] = useState([]);
    const [no_of_items , setNoOfItems] = useState(0);
    const [responseId , setResponseId] = useState("");
    const [responseState , setresponseState] = useState([]);
    const navigate = useNavigate();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = ()=>{
                resolve(true);
            }
            script.onerror = ()=>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }

    const createRazorpayOrder = async(amount) => {

        const response = await axios.post(`${BASE_URL}/orders`,{
            amount
        },{
            headers : {
                'Content-Type' : "application/json"
            }
        });
        handleRazorpayScreen(response.data.amount);
    }

    const handleRazorpayScreen = async(amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            alert("Something went wrong at razorpay screen");
            return;
        }

        const options = {
            key : 'rzp_test_3iOCKgVRiHQapy',
            amount : amount,
            currency : "INR",
            name :"QuicLearn",
            description : "Payment to QuicLearn",
            handler :async function(response) {
                setResponseId(response.razorpay_payment_id);
                try{
                    const courseDetails = courseArray.map(course => {
                        return course._id;
                    });

                    const payment_id = response.razorpay_payment_id;
                    const token = localStorage.getItem("token");

                    const saveDetails = await axios.post(`${BASE_URL}/savepaymentdetails`,{
                        courseDetails , payment_id
                    } , {
                        headers:{
                            Authorization:token
                        }
                    } , {
                        withCredentials:true
                    });

                    if(saveDetails.data.status == 200){
                        navigate("/");
                    }
                }
                catch(err){
                    console.log(err);
                }
            },
            prefill:{
                name : "QuicLearn",
                email : "quiclearn123@gmail.com"
            },
            theme : {
                color:"#5352ed"
            }
        }

        const paymentObject = new Razorpay(options);
        paymentObject.open();
    }

    const paymentFetch = (e) => {
        e.preventDefault();
        const paymentId = e.target.paymentId.value;
        axios.get(`${BASE_URL}/payment/${paymentId}`)
        .then((response) => {
            console.log(response.data);
            setresponseState(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const getCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/getcart`,{
                headers:{
                    Authorization:token
                }
            }, { 
                withCredentials: true
            });
            if(response.data.message == 'Unauthorized user'){
                navigate("/login");
            }
            setCourseArray(response.data.course_array);
            setNoOfItems(response.data.course_array.length);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    const makeCapital = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const findTotalPrice = (courseArray) => {
        let sum = 0;
        for(let i=0;i<courseArray.length;i++){
            sum += courseArray[i].price;
        }
        return sum;
    }

    const removefromCart = async(course_id) => {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/removefromcart`,{
            course_id
        } ,{
            headers:{
                Authorization:token
            }
        }, {
            withCredentials : true
        });
        setCourseArray(response.data.course_array);
        setNoOfItems(response.data.course_array.length);
    }

    const discount = () => {
        const total = findTotalPrice(courseArray);
        let ans = 0.05 * total;
        return ans.toPrecision(2);
    }

    return <div className="cart-big-container">
        <div className="cart-container">
            <h1>Your <span>Cart</span></h1>
            {courseArray.map((course) => {
                return <div className="cart-course" key={course._id}>
                    <div className="img-section">
                        <img src={course.image} alt="" />
                    </div>
                    <div className="text-section">
                        <h2>{makeCapital(course.title)} by <span>{course.author}</span></h2>
                        <p>{course.description}</p>
                        <p>Rating : {course.rating}<i class="fa-solid fa-star" style={{ color: "#5352ed" }}></i></p>
                        <div className="box">
                            <p>Price : <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{course.price}</p>
                            <button onClick={() => removefromCart((course._id).toString())}>Remove</button>

                        </div>
                    </div>
                </div>
            })}
        </div>

        <div className="checkout-section">
            <h1>Price Details</h1>
            <div className="border"></div>
            <h2>Price ({courseArray.length} items)</h2>
            <div className="discount">
                <h2>Discount</h2>
                <p> <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{discount()}</p>
            </div>
            <div className="border"></div>
            <div className="total_amount">
                <h2>Total Amount</h2>
                <p> <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{findTotalPrice(courseArray)}</p>
            </div>
            <div style={{color:"green"}}>You will save <i class="fa-solid fa-indian-rupee-sign" style={{ color: "#5352ed" }}></i>{discount()} on this order</div>

            <div className="btns">
                <button onClick={()=>createRazorpayOrder(findTotalPrice(courseArray))}>Pay Now</button>
                <a href="/courses">Back to courses</a>
            </div>
        </div>
    </div>


}

export default Cart;