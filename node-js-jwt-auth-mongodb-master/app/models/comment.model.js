module.exports = mongoose => {
  const Comment = mongoose.model(
    "comment",
    mongoose.Schema(
      {
        username: String,
        text: String,
        rate: Number,
        tourId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "tour"
        }
          
      },
      { timestamps: true }
    )
  );

  return Comment;
};