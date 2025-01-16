import express from 'express'
import router from './routes/auth.js';
import msgRouter from './routes/message.route.js';
import dotenv from "dotenv"
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js';
import {app,server} from './lib/socket.js' 
import cors from 'cors'
import path from 'path';


dotenv.config();
const PORT = process.env.PORT ;
const __dirname = path.resolve();
//to extract json file from the req.body

app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow your frontend's origin
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     if (req.method === "OPTIONS") {
//       res.sendStatus(200); // Handle preflight requests
//     } else {
//       next();
//     }
//   });
  
app.use(
    fileUpload({
      limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
      useTempFiles: true,
      tempFileDir: '/tmp/',
    })
  );
app.use(express.json({ limit: '500mb' })); app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use('/api', router); // get routes
app.use('/api/messages',msgRouter)
// app.get('/',(req,res)=>{
//     res.send("hi");
// })
if(process.env.NODE_ENV == 'production')
{
    app.use(express.static(path.join(__dirname,'../frontend/dist')));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend','dist','index.html'));
    })
}
server.listen(PORT, ()=>{
    console.log(`server listening onn port ${PORT}`);
    //connect to mongo db
    connectDB();
})
