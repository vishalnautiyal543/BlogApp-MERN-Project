import dotenv from "dotenv"
dotenv.config()

import {app} from "./app.js"
import {connectDB} from "./config/db.js"


app.get('/',(req,res)=>{
    res.json({
        status:"ok"
    })
})


// server + db connection
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection Error:",error);
})

