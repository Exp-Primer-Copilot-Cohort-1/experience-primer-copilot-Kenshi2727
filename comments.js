// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Post = require('../models/Post');

// Index
router.get('/', function(req, res){
  // Find all comments and return
  Comment.find({})
  .populate('author')
  .exec(function(err, comments){
    if(err) return res.json(err);
    res.render('comments/index', {comments:comments});
  });
});

// New
router.get('/new', function(req, res){
  // Find all posts and return
  Post.find({}, function(err, posts){
    if(err) return res.json(err);
    res.render('comments/new', {posts:posts});
  });
});

// create
router.post('/', function(req, res){
  Comment.create(req.body, function(err, comment){
    if(err) return res.json(err);
    res.redirect('/comments');
  });
});

// show
router.get('/:id', function(req, res){
  Comment.findOne({_id:req.params.id})
  .populate('author')
  .exec(function(err, comment){
    if(err) return res.json(err);
    res.render('comments/show', {comment:comment});
  });
});

// edit
router.get('/:id/edit', function(req, res){
  // Find all posts and return
  Post.find({}, function(err, posts){
    if(err) return res.json(err);

    // Find comment and return
    Comment.findOne({_id:req.params.id}, function(err, comment){
      if(err) return res.json(err);
      res.render('comments/edit', {comment:comment, posts:posts});
    });
  });
});

// update
router.put('/:id', function(req, res){
  req.body.updatedAt = Date.now();
  Comment.findOneAndUpdate({_id:req.params.id}, req.body, function(err, comment){
    if(err) return res.json(err);
    res.redirect("/comments/"+req.params.id);
  });
});

// destroy
router.delete('/:id', function(req, res){
  Comment.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/comments');
  });
});

module.exports = router;