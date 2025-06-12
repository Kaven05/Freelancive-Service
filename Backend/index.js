const mongoose=require('mongoose');
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const userRoutes=require('./routes/userRoutes')
const activityRoutes=require('./routes/activityRoutes')
const requestRoutes=require('./routes/requestRoutes')
const db=require('./db')
const cors=require('cors')
dotenv.config({path:"./config.env"})

app.use(express.json());
app.get('/',(req,res)=>{
    res.json({msg:"hii"})
})

db();

app.use(cors())
app.use('/api/user',userRoutes);
app.use('/api/activity',activityRoutes);
app.use('/api/request',requestRoutes);


PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server started on port 5000")
})