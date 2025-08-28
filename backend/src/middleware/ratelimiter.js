import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{

        //when we have the user authentication, we can use userid instead of "my-limit-key"
        const { success } = await ratelimit.limit("my-limit-key");

        if(!success){
            return res.status(429).json({message: "Too many requests. Try again later."});
        }

        next();

    }catch(error){
        console.log("Ratelimiter error: ",error);
        next(error);
    }
}

export default rateLimiter;