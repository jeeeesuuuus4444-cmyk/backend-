import React, { useState, useEffect } from 'react';

const GameForm = ({ game, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        genre: '',
        releaseDate: '',
        rating: 0,
        status: 'Backlog',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (game) {
            setFormData({
                ...game,
                releaseDate: game.releaseDate ? game.releaseDate.split('T')[0] : ''
            });
        }
    }, [game]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{game ? 'Edit Game' : 'Add New Game'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Platform</label>
                        <input name="platform" value={formData.platform} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input name="genre" value={formData.genre} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Release Date</label>
                            <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Rating (0-10)</label>
                            <input type="number" name="rating" min="0" max="10" value={formData.rating} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Backlog">Backlog</option>
                            <option value="Playing">Playing</option>
                            <option value="Completed">Completed</option>
                            <option value="Dropped">Dropped</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="primary">Save Game</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GameForm;
