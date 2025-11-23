import React, { useState } from 'react';
import { addReview, deleteReview } from '../services/api';

const GameDetail = ({ game, onEdit, onDelete, onUpdateGame }) => {
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);

    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            const response = await addReview(game._id, { text: reviewText, rating: reviewRating });
            onUpdateGame(response.data);
            setReviewText('');
            setReviewRating(5);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const response = await deleteReview(game._id, reviewId);
            onUpdateGame(response.data);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    if (!game) return <div className="empty-state">Select a game to view details</div>;

    return (
        <div className="game-detail">
            <div className="game-header">
                <div>
                    <h1>{game.title}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{game.platform} • {game.genre}</p>
                </div>
                <div>
                    <button onClick={() => onEdit(game)} style={{ marginRight: '10px' }}>Edit</button>
                    <button className="danger" onClick={() => onDelete(game._id)}>Delete</button>
                </div>
            </div>

            <div className="game-stats">
                <div className="stat-item">
                    <h4>Status</h4>
                    <p>{game.status}</p>
                </div>
                <div className="stat-item">
                    <h4>Rating</h4>
                    <p>{game.rating}/10</p>
                </div>
                <div className="stat-item">
                    <h4>Release Date</h4>
                    <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="description">
                <h3>Description</h3>
                <p>{game.description}</p>
            </div>

            <div className="reviews-section">
                <h3>Reviews & Notes ({game.reviews.length})</h3>

                <form onSubmit={handleAddReview} style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <div className="form-group">
                        <textarea
                            placeholder="Write a review or note..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            style={{ width: 'auto', marginBottom: 0 }}
                        >
                            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
                        </select>
                        <button type="submit" className="primary">Add Review</button>
                    </div>
                </form>

                <div className="reviews-list">
                    {game.reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <button className="delete-btn" onClick={() => handleDeleteReview(review._id)}>×</button>
                            <p>{review.text}</p>
                            <small style={{ color: 'var(--text-secondary)' }}>
                                {review.rating} Stars • {new Date(review.date).toLocaleDateString()}
                            </small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameDetail;
