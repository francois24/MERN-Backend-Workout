require('dotenv').config()
const express = require ('express')
const workoutRoutes = require('./routes/workout')
const mongoose =require('mongoose')
const cors = require('cors');


//express app
const app = express()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


//middleware
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})


//routes

app.use('/api/workouts',workoutRoutes)

mongoose.set('strictQuery', false);
//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //lsiten for request
        app.listen(process.env.PORT,()=>{

        console.log(`connected to Mongo db & Listening on port`,process.env.PORT)
        })
 
    })

    .catch((error) =>{
        console.log(error)
    }) 

