const Category = require('../models/onetomany/Category');
const Post = require('../models/onetomany/Post');
const Comment = require('../models/onetomany/Comment');
const asyncHandler = require('../middleware/async');

const oneToMany = asyncHandler(async (req, res, next) => {
  const createPost = function (title, author) {
    const post = new Post({
      title,
      author,
    });

    return post.save();
  };

  const createCategory = function (category, post) {
    const categories = new Category({
      category,
      post,
    });
    return categories.save();
  };

  const createComment = function (comment, post) {
    const comments = new Comment({
      comment,
      post,
    });
    return comments.save();
  };

  createPost('Important Announcement', 'asad')
    .then((post) => {
      console.log(post);
      const postId = post._id.toString();
      createCategory(postId.substring(0, 10).toUpperCase(), postId);
      return createComment(postId.substring(0, 10).toUpperCase(), postId);
    })
    .then((result) => {
      console.log();
      console.log(result);
      res.status(200).json({
        result: result,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = { oneToMany };
