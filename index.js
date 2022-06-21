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
  // console.log("sur la route !");

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  // console.log("sur la route !");

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
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
