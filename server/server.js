const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Connections", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const words = require("./models/words"); // Create the Item model

app.get("/connections/words", async (req, res) => {
  try {
    const items = await words.find();
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

app.get("/test", async (req, res) => {
  res.send("test");
});
