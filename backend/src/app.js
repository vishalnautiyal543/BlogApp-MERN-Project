import express from "express"
import {globalErrorHanlder} from "./middlewares/globalErrorHanlder.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions))


//import routes
import userRoutes from "./routes/user.routes.js"
import blogRoutes from "./routes/blog.routes.js"


//use routes 
app.use("/api/v1",userRoutes)
app.use("/api/v1/blogs",blogRoutes)



// error handler
app.use(globalErrorHanlder)

export {app}

