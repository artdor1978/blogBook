const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");

mongoose.connect("mongodb://127.0.0.1:27017/my_database", {
  useNewUrlParser: true,
});

const app = new express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
  console.log(blogposts);
});
app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/index.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});
app.get("/post", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/post.html"));
  res.render("post");
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post("/posts/store", async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
