const express = require('express');
const jwt = require('jsonwebtoken');
//const session = require('express-session');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
    }

const authenticatedUser = (username,password)=>{ 
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
    }

//only registered users can login
regd_users.post("/login", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
      
        if (!username || !password) {
            return res.status(404).json({message: "Error logging in"});
        }
      
        if (authenticatedUser(username,password)) {
          let accessToken = jwt.sign({
            data: password
          }, 'access', { expiresIn: 600 * 600 });
      
          req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
        } else {
          return res.status(208).json({message: "Invalid Login because why not. Check username and password"});
        };
 return res.status(300).json({message: "Yet to be implemented"});
});

//register user
regd_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { //changed doesExist to isValid for Task 6 on March 11, removed ! from !isValid for Task 6 on March 15
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let reviews = req.body.reviews

        //if DOB the DOB has been changed, update the DOB 
        if(reviews) {
            book["reviews"] = reviews
        }
        
        books[isbn]=book;
        res.send(`Book with the isbn  ${isbn} updated.`);
    }
    else{
        res.send("Unable to find book!");
    }
  });
 // return res.status(300).json({message: "Yet to be implemented"});

 // DELETE request: Delete a review by isbn
 regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let reviews = req.body.reviews;
    if (isbn){
        delete books[reviews]
    }
    res.send(`Review of the book with the isbn  ${isbn} deleted.`);
  });
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

