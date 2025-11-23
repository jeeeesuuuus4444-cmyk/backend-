import React from 'react';

const GameList = ({ games, selectedGame, onSelectGame, onAddGame }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>My Library</h2>
                <button className="primary" onClick={onAddGame} style={{ marginTop: '10px', width: '100%' }}>
                    + Add Game
                </button>
            </div>
            <div className="game-list">
                {games.map((game) => (
                    <div
                        key={game._id}
                        className={`game-list-item ${selectedGame?._id === game._id ? 'active' : ''}`}
                        onClick={() => onSelectGame(game)}
                    >
                        <h3>{game.title}</h3>
                        <small>{game.platform}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameList;
