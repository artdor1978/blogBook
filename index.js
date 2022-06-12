const express = require("express");
//const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const BlogPost = require("./models/BlogPost.js");
const fileUpload = require("express-fileupload");
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validationMiddleware");
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

mongoose.connect("mongodb://127.0.0.1:27017/my_database", {
  useNewUrlParser: true,
});

const app = new express();
const ejs = require("ejs");
/* const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.title == null) {
    return res.redirect('/posts/new')
  }
  next()
} */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware)
/* app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
  console.log(blogposts);
}); */
/* app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/index.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
}); */
/* app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", {
    blogpost,
  });
}); */
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.get('/posts/new', newPostController)
app.get('/auth/login', loginController);
app.post('/users/login',loginUserController)
app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "public/assets/img", image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: "/assets/img/" + image.name,
      });
      res.redirect("/");
    }
  );
});
app.post('/users/register', storeUserController)
app.listen(4000, () => {
  console.log("App listening on port 4000");
});
