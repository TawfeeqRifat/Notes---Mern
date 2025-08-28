import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware 
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); //json parser
app.use(rateLimiter);


//example middleware
app.use((req,res,next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
})

app.use("/api/notes",noteRoutes)


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ",PORT);
    });
});



