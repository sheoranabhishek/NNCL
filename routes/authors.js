const express = require("express");
const router = express.Router();
const Author = require("../models/authors"); //getting the Author table from database.
//All authors Route

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.queryname !== " ") {
    searchOptions.name = new RegExp(req.query.name, "i"); //regular expressuon i means case insensitive
  }
  try {
    const authors = await Author.find(searchOptions); //we dont want to check anything so we want to get all the authors.
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Author Route

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  //handling input errors.

  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error Creating Author",
    });
  }
});

module.exports = router;
