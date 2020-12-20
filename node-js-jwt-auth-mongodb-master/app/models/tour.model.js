module.exports = mongoose => {
    const Tour = mongoose.model(
        "tour",
        mongoose.Schema({
            name: String,
            destination: String,
            start_date: Date,
            end_date: Date,
            price: Number,
            seats: Number,
            seats_taken: Number,
            description: String,
            pic_link: String,
            gallery1: String,
            gallery2: String,
            gallery3: String,
            gallery4: String,
            comments: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }]
        }, { timestamps: true })
    );

    return Tour;
};