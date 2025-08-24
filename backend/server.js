import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from './routes/auth.js';
import { configDotenv } from 'dotenv';
import db from './lib/db.js';
import adminrouter from './routes/authadmin.js';
import threadrouter from './routes/threads.js';



const app = express();
app.use(cors(
    {
        origin:"http://localhost:8080",
      credentials:true,
    }
))
app.use(cookieParser());
app.use(express.json());
configDotenv()





app.use("/api/auth",router)
app.use("/api/admin",adminrouter)
app.use("/api/thread",threadrouter)



app.listen(process.env.PORT, () =>{ console.log(`Server running on port ${process.env.PORT}`)
db()});
