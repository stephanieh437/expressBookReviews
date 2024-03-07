const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
  return res.status(300).json({message: "Yet to be implemented"});
 });

  // Get book details based on author
  public_users.get('/author/:author',function (req, res) {

    var list_of_books = {};
    
    for (let isbn_runner = 1; isbn_runner <= 10; isbn_runner++) {
        if (books[isbn_runner]["author"] == req.params.author) {
            list_of_books[isbn_runner] = books[isbn_runner];
        }
    }
  return res.status(300).json(list_of_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var list_of_titles = {};
    
    for (let isbn_runner = 1; isbn_runner <= 10; isbn_runner++) {
        if (books[isbn_runner]["title"] == req.params.title) {
            list_of_titles[isbn_runner] = books[isbn_runner];
        }
    }
  return res.status(300).json(list_of_titles);
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
