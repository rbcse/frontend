import axios from "axios";
import { useState } from "react";
function AddCourse(){

    const [image , setImage] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [rating , setRating] = useState("");
    const [price , setPrice] = useState("");
    const [author , setAuthor] = useState("");

    const handleAddCourse = async(e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/addcourse",{
            image , title , description , rating , price , author
        });
    }

    return <form method="post">
        <input type="text" name="" id="" placeholder="Image" onChange={(e) => setImage(e.target.value)}/>
        <input type="text" name="" id="" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" name="" id="" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
        <input type="text" name="" id="" placeholder="Rating" onChange={(e) => setRating(e.target.value)}/>
        <input type="text" name="" id="" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
        <input type="text" name="" id="" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
        <button onClick={handleAddCourse}>Add Course</button>
    </form>
}

export default AddCourse;