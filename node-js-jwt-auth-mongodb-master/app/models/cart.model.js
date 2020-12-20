module.exports = mongoose => {
  const Cart = mongoose.model(
    "cart",
    mongoose.Schema(
      {
        tourId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "tour"
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
          
      },
      { timestamps: true }
    )
  );

  return Cart;
};