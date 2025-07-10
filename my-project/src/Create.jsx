import React, { useState } from "react";
import axios from 'axios'

function Create(){
    const [task, setTask]= useState();
     const handleAdd =()=>{
        if(!task || task.trim()==="") return alert("task cannot be empty");


        axios.post('http://localhost:3000/add',{
            task: task,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            
        })
        //.then(result => console.log(result))
        
        .then(result =>{
            location.reload();
        })  
        .catch(err => console.err(err))
        
     }
     
    return(
      
        <div className="p-4">
            <input 
            className="rounded-lg p-2 shadow-md border-2"
            type="text" placeholder="enter task"  onChange={(e)=> setTask(e.target.value)}/>
            <button type="button" 
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg text-white px4 border-2 p-2 shadow-md"
            >Add Task</button>
        </div>
    )
}
export default Create;