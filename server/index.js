const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo')
const port = 3000;
const app = express();


mongoose.connect('mongodb+srv://farmer:Farm%40123@farmer.zzgbxos.mongodb.net/test')
app.use(cors());
app.use(express.json()); 

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req,res)=>{
    const task = req.body.task;
    const date =req.body.date;
    const time = req.body.time;
   
    TodoModel.create({
        task: task,
        date: date,
        time: time,
    }).then(result => res.json(result))
    .catch(err => res.json(err))
    
}) 

app.put('/get/update/:id', (req,res)=>{
    const {id} = req.params;
    
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id : id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(port,() =>{
console.log(`sever is running on port ${port}`);
});