var express = require('express');
var path = require('path');
var Book = require(path.join(__dirname, '..', 'models/Book.js'))
var router = express.Router();

let SoS = new Book('Storm of Swords', 'George R.R. Martin', 933, true);
let WaP = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
let DQ = new Book('Don Quixote', 'Miguel Cervantes', 863, true);
let MD = new Book('Moby Dick', 'Herman Melville', 585, false);

let myLibrary = [SoS, WaP, DQ, MD];



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library', myLibrary: myLibrary });
});

/* POST to add book to home page. */
router.post('/add', function(req, res, next) {
  let obj = req.body;
  let read = (obj.read === "read")? true: false;
  let book = new Book(obj.title, obj.author, obj.pages, read)
  myLibrary.push(book);
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  // console.log(req.body.id);
  let id = req.body.id;
  myLibrary.splice(id, 1);
  console.log(myLibrary);
  res.redirect('/');
});

router.post('/read', function(req, res, next) {
  let id = req.body.id;
  // console.log(req.body);
  let obj = myLibrary[id];
  console.log(obj)
  obj.changeReadStatus();
  myLibrary.splice(id, 1, obj)
  console.log(obj)
  res.redirect('/');
})



module.exports = router;
