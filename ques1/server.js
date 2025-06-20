import dotenv from "dotenv"
dotenv.config()
import express from "express";
const app = express();
import cors from 'cors'
import axios from "axios";  

const token=process.env.TOKEN
console.log(token);

const VALID_IDS = {
    'p': 'primes',
    'f': 'fibo',
    'e': 'even',
    'r': 'rand'
};

const WINDOW_SIZE = 10;
const TIMEOUT = 500;
const numberWindow = [];    




app.use(cors())

app.get("/numbers/:id",async(req,res)=>{
    const id = req.params.id;
   const endpoint = VALID_IDS[id];
   console.log(endpoint);

   
    

    if (!endpoint) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const url = `http://20.244.56.144/evaluation-service/${endpoint}`;
    console.log(url);
    
    const windowPrevState = [...numberWindow];
    try {
    const response = await axios.get(url, {
        timeout: TIMEOUT,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const incomingNumbers = response.data.numbers || [];
    console.log(incomingNumbers);

    // Filter new, unique numbers
    for (let num of incomingNumbers) {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift(); // remove oldest
            }
            numberWindow.push(num); // add newest
        }
    }

    const avg = numberWindow.length
        ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
        : 0;

    res.json({
        windowPrevState,
        windowCurrState: numberWindow,
        avg: parseFloat(avg)
    });

} catch (error) {
    console.error("Error fetching numbers:", error.message);
    return res.status(500).json({
        windowPrevState,
        windowCurrState: numberWindow,
        avg: numberWindow.length
            ? parseFloat((numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2))
            : 0
    });
}


}

)





app.listen(9876, () => {
    console.log("Server is running on port 9876");
    
})




   