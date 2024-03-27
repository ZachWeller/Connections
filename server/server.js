const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Connections", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const words = require("./models/words"); // Create the Item model

app.get("/Connections/words", async (req, res) => {
  try {
    const items = await words.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
