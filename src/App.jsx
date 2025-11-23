import React, { useState, useEffect } from 'react';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import GameForm from './components/GameForm';
import { getGames, createGame, updateGame, deleteGame } from './services/api';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await getGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setIsFormOpen(false);
  };

  const handleAddGame = () => {
    setEditingGame(null);
    setIsFormOpen(true);
  };

  const handleEditGame = (game) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };

  const handleDeleteGame = async (id) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return;
    try {
      await deleteGame(id);
      await fetchGames();
      setSelectedGame(null);
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingGame) {
        await updateGame(editingGame._id, formData);
      } else {
        await createGame(formData);
      }
      await fetchGames();
      setIsFormOpen(false);
      setEditingGame(null);
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleUpdateGame = (updatedGame) => {
    setGames(games.map(g => g._id === updatedGame._id ? updatedGame : g));
    setSelectedGame(updatedGame);
  };

  return (
    <div className="app-container">
      <GameList
        games={games}
        selectedGame={selectedGame}
        onSelectGame={handleSelectGame}
        onAddGame={handleAddGame}
      />
      <div className="main-content">
        <GameDetail
          game={selectedGame}
          onEdit={handleEditGame}
          onDelete={handleDeleteGame}
          onUpdateGame={handleUpdateGame}
        />
      </div>
      {isFormOpen && (
        <GameForm
          game={editingGame}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
