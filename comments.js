// Create web server
// Run the web server
// Create a route
// Create a comment
// Read all comments
// Read a comment
// Update a comment
// Delete a comment
// Run the web server

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.listen(port, function() {
  console.log('Server is running on port ' + port);
});

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      res.send(data);
    }
  });
});

app.get('/comments/:id', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      var comments = JSON.parse(data);
      var comment = comments.find(function(comment) {
        return comment.id === parseInt(req.params.id);
      });
      if (comment) {
        res.send(comment);
      } else {
        res.status(404).send('Comment not found');
      }
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      var comments = JSON.parse(data);
      var newComment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
      };
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          res.status(500).send('An error occurred: ' + err);
        } else {
          res.send(newComment);
        }
      });
    }
  });
});

app.put('/comments/:id', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {