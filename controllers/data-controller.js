var Book = require('../models/book');
var ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');


module.exports.getBooks = function (req, res) {
    var creator;
    var token = req.header('token');
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            console.log(err);
        } else {
            creator = decoded._doc._id
            Book.find({creatorid : creator}, function (err,books) {
                if (err){
                    res.status(500);
                }

                res.json({data: books})

            });
        }
    });
};

module.exports.postBook = function (req,res) {
    var book = new Book;
    book.title = req.body.title;
    book.description = req.body.description;
    book.author = req.body.author;
    book.status = req.body.status;
    book.rating = 3;
    book.url = null;
    book.creatorid = req.body.creatorid;
    book.url = req.body.url;

    book.save(function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send('Book added!');
        }
    })
};

module.exports.deleteBook = function (req,res) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    Book.find(details).remove( function(){
        res.send('all ok');
    });
};

module.exports.getBook = function (req, res) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    Book.findOne(details, function(err, item){
        if (err) {
            res.send({'error':'Wrong ID'});
        } else {
            res.send(item);
        }
    });
};

module.exports.updateBook = function (req, res) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const book = req.body;
    Book.update(details, book, function (err, result){
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(result);
        }
    });

};