const express = require("express");
const mongoose = require("mongoose");
const url = require("./models/url");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const fetch = require("node-fetch");
const { renderFile } = require("ejs");

const app = express();

/*app.use(express.json());

This line adds middleware to parse JSON data from incoming requests.
It is used to handle JSON data submissions with the application/json content type.
This middleware parses the JSON data and attaches it to the req.body object of the request.
*/

//add below 3 lines compulsory in any project
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/urlShortner");

app.set("view engine", "ejs");
app.use("/api", urlRoutes);

app.get("/", async (req, res) => {
  const page = parseInt(req.params.num) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const urls = await fetch(
    "http://127.0.0.1:5000/api/getAll?page=" + page + "&limit=" + limit
  );
  const parsedUrls = await urls.json();
  const totalDocs = await url.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  // console.log(parsedUrls);
  res.render("index", { parsedUrls, totalPages });
});

app.get("/page/:num", async (req, res) => {
  const page = parseInt(req.params.num) || 1;
  // console.log(page);
  const limit = 6;
  const urls = await fetch(
    "http://127.0.0.1:5000/api/getAll?page=" + page + "&limit=" + limit
  );
  // console.log(page);
  const parsedUrls = await urls.json();
  const totalDocs = await url.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  // console.log(parsedUrls);
  // res.redirect("/")
  res.render("index", { parsedUrls, totalPages });
});

app.get("/:shorturl", async (req, res) => {
  const shorturl = req.params.shorturl;
  const obj = await url.findOne({ short: shorturl });
  if (obj) {
    res.redirect(obj.long);
    obj.clicks++;
    obj.created_at = Date.now();
    await obj.save();
  }
});

app.listen(5000);
