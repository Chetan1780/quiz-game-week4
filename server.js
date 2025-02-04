const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const app = express();

app.use(cors());
async function fetchQuestion() {
    const data = await fs.readFile("questions.json", "utf-8");
    return JSON.parse(data);
}

app.get("/questions", async (req, res) => {
    try {
        const data = await fetchQuestion();
        res.json(data);
    } catch (err) {
        res.status(500).send("Error reading questions");
    }
});

app.listen(3000, () => {
    console.log("server is running at port 3000");
});