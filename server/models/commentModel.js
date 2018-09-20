const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../models/articleModel')

const commentSchema = new Schema({
  body:  {
      type : String,
      required : true
  },
  commentator: {
      type : Schema.Types.ObjectId, ref: 'User' ,
      required : true
  },
  articleId : {
    type : Schema.Types.ObjectId, ref: 'Article', 
    required : true
  }
}, {
    timestamps : true
});

commentSchema.post('save', function(doc) {
    Article.updateOne({_id : doc.articleId},{$push: {comments : {_id :doc._id}}}, function(err) {
        if (err) {
            console.log(err);
        }
    })
})


const CommentArticle = mongoose.model('Comment', commentSchema);

module.exports = CommentArticle