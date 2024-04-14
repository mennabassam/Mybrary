const express = require("express");
const router = express.Router();
const author = require("../models/author");

//show all users
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//ahow new user
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new author() });
});

// create new user
router.post("/", async (req, res) => {
  try {
    const newAuthor = new author({
      name: req.body.name,
    });
    const createdAuthor = await newAuthor.save();
    res.redirect(`/authors`);
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error",
    });
  }
});

module.exports = router;
