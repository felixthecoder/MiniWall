//importing mongoose schema
const { number } = require("joi");
const mongoose = require("mongoose");

//creating post schema
const PostSchema = mongoose.Schema({
  owner: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Like: {
    type: Number,
    default: 0,
  },

  Comment: [
    {
      CommentInfo: {
        type: String,
      },

      CommentTime: {
        type: Date,
        default: Date.now
      },

      CommentOwner: {
        type: String,
      },
    },
  ],
});

//exporting post schema
module.exports = mongoose.model("posts", PostSchema);
