import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add(){

    const navigate = useNavigate();

    const [subject , setSubject] = useState("");
    const [subject_id , setId] = useState("");
    const [level , setLevel] = useState("");
    const [question , setQuestion] = useState("");
    const [op1 , setOp1] = useState("");
    const [op2 , setOp2] = useState("");
    const [op3 , setOp3] = useState("");
    const [op4 , setOp4] = useState("");
    const [answer , setAnswer] = useState("");

    const add_question = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/addQuestion" , {
            subject , subject_id , level , question , op1 , op2 , op3 , op4 , answer
        });
        navigate("/add");
    }

    return <form method="post">
        <input type="text" name="subject" placeholder="Subject"  onChange={(e)=>setSubject(e.target.value)}/>
        <input type="text" name="subject_id" placeholder="Subject id"  onChange={(e)=>setId(e.target.value)}/>
        <input type="text" name="" placeholder="Level"  onChange={(e)=>setLevel(e.target.value)}/>
        <input type="text" name="" placeholder="question"  onChange={(e)=>setQuestion(e.target.value)}/>
        <input type="text" name="" placeholder="op1"  onChange={(e)=>setOp1(e.target.value)}/>
        <input type="text" name="" placeholder="op2"  onChange={(e)=>setOp2(e.target.value)}/>
        <input type="text" name="" placeholder="op3"  onChange={(e)=>setOp3(e.target.value)}/>
        <input type="text" name="" placeholder="op4"  onChange={(e)=>setOp4(e.target.value)}/>
        <input type="text" name="" placeholder="answer" onChange={(e)=>setAnswer(e.target.value)}/>
        <button onClick={add_question}>Add</button>
    </form>
}

export default Add;