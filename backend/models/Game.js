const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    platform: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 10 }, // Global rating or user's score
    status: {
        type: String,
        enum: ['Backlog', 'Playing', 'Completed', 'Dropped'],
        default: 'Backlog'
    },
    imageUrl: { type: String },
    description: { type: String },
    reviews: [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
