const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find().sort({ createdAt: -1 });
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single game
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create game
router.post('/', async (req, res) => {
    const game = new Game({
        title: req.body.title,
        platform: req.body.platform,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        status: req.body.status,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update game
router.put('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        Object.assign(game, req.body);
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE game
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        await game.deleteOne();
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST add review
router.post('/:id/reviews', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        const review = {
            text: req.body.text,
            rating: req.body.rating,
            date: new Date()
        };

        game.reviews.push(review);
        const updatedGame = await game.save();
        res.status(201).json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE review
router.delete('/:id/reviews/:reviewId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        game.reviews = game.reviews.filter(r => r._id.toString() !== req.params.reviewId);
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
