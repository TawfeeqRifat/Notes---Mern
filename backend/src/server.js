import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js"
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json()); //json parser
app.use(rateLimiter);


//example middleware
app.use((req,res,next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
})

app.use("/api/notes",noteRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ",PORT);
    });
});



