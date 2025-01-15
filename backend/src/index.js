import express from 'express'
import router from './routes/auth.js';
import msgRouter from './routes/message.route.js';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js';
import {app,server} from './lib/socket.js' 
import cors from 'cors'
import path from 'path';


dotenv.config();
const PORT = process.env.PORT ;
const __dirname = path.resolve();
//to extract json file from the req.body
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json({ limit: '500mb' })); app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use('/api', router); // get routes
app.use('/api/messages',msgRouter)
// app.get('/',(req,res)=>{
//     res.send("hi");
// })
if(process.env.NODE_ENV == 'production')
{
    app.use(express.static(path.join(__dirname,'../frontend')));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frotend','index.html'));
    })
}
server.listen(PORT, ()=>{
    console.log(`server listening onn port ${PORT}`);
    //connect to mongo db
    connectDB();
})
