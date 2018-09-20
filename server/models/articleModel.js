const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title:  {
      type : String,
      required : true
  },
  author: {
      type : Schema.Types.ObjectId, ref: 'User' ,
      required : true
  },
  body: {
      type : String,
      required : true
  },
  comments: [{type:Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps : true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
