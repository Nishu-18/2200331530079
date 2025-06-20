async function getAvg() {
    const id = req.params.numberid;
    const endpoint = VALID_IDS[id];

    if (!endpoint) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const url = `http://20.244.56.144/numbers/${endpoint}`;
    const windowPrevState = [...numberWindow];

    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        const incomingNumbers = response.data.numbers || [];

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
        return res.status(500).json({
            windowPrevState,
            windowCurrState: numberWindow,
            avg: numberWindow.length
                ? parseFloat((numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2))
                : 0
        })
}
}

module.exports={getAvg}