const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
console.log('URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Game = require('../models/Game');

const sampleGames = [
    {
        title: 'The Legend of Zelda: Breath of the Wild',
        platform: 'Nintendo Switch',
        genre: 'Adventure',
        releaseDate: '2017-03-03',
        rating: 10,
        status: 'Completed',
        description: 'An open-air adventure.',
        reviews: [{ text: 'Masterpiece!', rating: 5 }]
    },
    {
        title: 'Hollow Knight',
        platform: 'PC',
        genre: 'Metroidvania',
        releaseDate: '2017-02-24',
        rating: 9,
        status: 'Playing',
        description: 'A challenging 2D action-adventure.',
        reviews: []
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding');
        await Game.deleteMany({});
        console.log('Cleared existing games');
        await Game.insertMany(sampleGames);
        console.log('Added sample games');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
