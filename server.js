const express = require("express");
const mongo = require("mongoose");
const app = express();
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");

const db = require("./config/database");

app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

//DB connection
mongo
  .connect(db.mongoURI)
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000);
