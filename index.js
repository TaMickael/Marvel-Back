require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(formidable());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/comics", async (req, res) => {
  console.log("sur la route !");

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${API_KEY}`
    );
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !");
});

app.listen(process.env.PORT, () => {
  console.log("Server has Started !");
});
