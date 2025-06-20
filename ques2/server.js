import dotenv from "dotenv"
dotenv.config()
import express from "express";
const app = express();
import cors from 'cors'
import axios from "axios";
const token=process.env.TOKEN
console.log(token);


app.use(cors())

app.get('/stocks/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    console.log(minutes);
    console.log(aggregation);
    
    

    if (!minutes || aggregation !== 'average') {
        return res.status(400).json({ error: 'Invalid query. Use ?minutes={m}&aggregation=average' });
    }

    const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`;

    try {
        const response = await axios.get(url,{headers:{
            Authorization:`Bearer ${process.env.TOKEN}`
        }});
        const priceHistory = response.data;

        if (!Array.isArray(priceHistory) || priceHistory.length === 0) {
            return res.status(404).json({ error: 'No price data found' });
        }

        const averageStockPrice = parseFloat(
            (priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length).toFixed(6)
        );

        return res.json({
            averageStockPrice,
            priceHistory
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});



app.listen(9876,()=>{
    console.log("Server is running on port 9876");
    
})