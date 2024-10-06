const express = require("express");
const path = require("path");
const app = express();
const controllers = require("../database/controllers.js");

app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post("api/populate", async (req, res) => {
  try {
    await controllers.removeOld();
    const apiData = req.body;
    await controllers.insertPlanets(apiData);
    res.status(200).send("Successfully Replaced and Populated");
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to populate planets");
  }
});

app.get("/api/planets", async (req, res) => {
  try {
    const planets = await controllers.getPlanets();
    res.status(200).send(planets);
  } catch (error) {
    console.error(error);
    res.status(400).send("Request Failed");
  }
});

app.post("/api/openai", async (req, res) => {
  try {
    const response = await controllers.openAI(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send("Request Failed");
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
