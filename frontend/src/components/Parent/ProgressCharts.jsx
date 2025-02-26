import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Grid } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import useGameDataStore from '../../store/gameStore'; 

const ProgressCharts = () => {
    const { 
      puzzleData, fetchPuzzleData, 
      cardData, fetchCardData, 
      matchData, fetchMatchData,
      puzzleStats, fetchPuzzleStats,
      cardStats, fetchCardStats,
      matchStats, fetchMatchStats,
      loading, error 
    } = useGameDataStore();
    const [selectedDataType, setSelectedDataType] = useState("puzzle");
  
    useEffect(() => {
      // Fetch both game data and statistics
      fetchPuzzleData();
      fetchCardData();
      fetchMatchData();
      fetchPuzzleStats();
      fetchCardStats();
      fetchMatchStats();
    }, [fetchPuzzleData, fetchCardData, fetchMatchData, fetchPuzzleStats, fetchCardStats, fetchMatchStats]);
  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  const getData = () => {
    switch (selectedDataType) {
      case "puzzle":
        return puzzleData;
      case "card":
        return cardData;
      case "match":
        return matchData;
      default:
        return [];
    }
  };

  const data = getData();

  const getStatsForDifficulty = (difficulty) => {
    let stats = [];
    
    switch (selectedDataType) {
      case "puzzle":
        stats = puzzleStats || [];
        break;
      case "card":
        stats = cardStats || [];
        break;
      case "match":
        stats = matchStats || [];
        break;
      default:
        stats = [];
    }
     // Find the stats object for the specified difficulty
    const difficultyStats = stats.find(s => 
      s._id === difficulty || 
      s._id === difficulty.toLowerCase() || 
      s._id === difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    );
    
    return difficultyStats || {};
  };

  const dataPie = [
    { name: "Easy", value: data.filter(game => game.difficulty === 'easy' || game.difficulty === 'Easy').length },
    { name: "Medium", value: data.filter(game => game.difficulty === 'medium' || game.difficulty === 'Medium').length },
    { name: "Hard", value: data.filter(game => game.difficulty === 'hard' || game.difficulty === 'Hard').length },
  ];

  const dataBar = data.slice().reverse().map((game, index) => {
    // Format the date to be more readable
    const dateString = game.playedAt || game.gameDate;
    let formattedDate = 'Unknown';
    
    if (dateString) {
      try {
        formattedDate = new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }
    
    return {
      name: `${formattedDate}`,
      score: game.timeSpent || game.timeTaken,
    };
  });

  const dataLine = data.slice().reverse().map((game, index) => {
    const dateString = game.playedAt || game.gameDate;
    let formattedDate = 'Unknown';
    
    if (dateString) {
      try {
        formattedDate = new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }

    return{
      name: `${formattedDate}`,
      timeSpent: game.timeSpent || game.timeTaken,
    }
    
  });

  const COLORS = ["#d32f2f", "#f57c00", "#fbc02d"];

  return (
    <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins" }}>
        ACHIEVEMENTS/ PROGRESS
      </Typography>
      <FormControl sx={{ mt: 2, mb: 4, minWidth: 120 }}>
        <InputLabel>Data Type</InputLabel>
        <Select value={selectedDataType} onChange={handleChange}>
          <MenuItem value="puzzle">Puzzle</MenuItem>
          <MenuItem value="card">Card</MenuItem>
          <MenuItem value="match">Match</MenuItem>
        </Select>
      </FormControl>
      
      {/* Game Stats Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            boxShadow: 3, 
            bgcolor: '#f8f9fa', 
            borderLeft: '4px solid #d32f2f',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Poppins' }}>
                Easy {selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Total Games:</strong> {getStatsForDifficulty('easy').gamesPlayed || 0}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Avg. Time:</strong> {Math.round(getStatsForDifficulty('easy').averageTimeSpent || getStatsForDifficulty('easy').averageTimeTaken || 0)} sec
              </Typography>
              {getStatsForDifficulty('easy').completedGames && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Completed:</strong> {getStatsForDifficulty('easy').completedGames || 0} games
              </Typography>
              )}
              {getStatsForDifficulty('easy').bestTime && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Time:</strong> {getStatsForDifficulty('easy').bestTime } sec
                </Typography>
              )}
              {getStatsForDifficulty('easy').highestScore && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Score:</strong> { getStatsForDifficulty('easy').highestScore} 
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            boxShadow: 3, 
            bgcolor: '#f8f9fa', 
            borderLeft: '4px solid #f57c00',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Poppins' }}>
                Medium {selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Total Games:</strong> {getStatsForDifficulty('medium').gamesPlayed || getStatsForDifficulty('normal').gamesPlayed || 0}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Avg. Time:</strong> {Math.round(getStatsForDifficulty('medium').averageTimeSpent || getStatsForDifficulty('normal').averageTimeTaken || 0)} sec
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Completed:</strong> {getStatsForDifficulty('medium').completedGames || getStatsForDifficulty('normal').completedGames || 0} games
              </Typography>
              
              {getStatsForDifficulty('medium').bestTime && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Time:</strong> {getStatsForDifficulty('medium').bestTime} sec
                </Typography>
              )}
              {getStatsForDifficulty('medium').highestScore && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Score:</strong> { getStatsForDifficulty('medium').highestScore} 
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            boxShadow: 3, 
            bgcolor: '#f8f9fa', 
            borderLeft: '4px solid #fbc02d',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Poppins' }}>
                Hard {selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Total Games:</strong> {getStatsForDifficulty('hard').gamesPlayed || 0}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Avg. Time:</strong> {Math.round(getStatsForDifficulty('hard').averageTimeSpent || getStatsForDifficulty('hard').averageTimeTaken || 0)} sec
              </Typography>
              {getStatsForDifficulty('hard').completedGames && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Completed:</strong> {getStatsForDifficulty('hard').completedGames || 0} games
              </Typography>
              )}
              {getStatsForDifficulty('hard').bestTime && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Time:</strong> {getStatsForDifficulty('hard').bestTime} sec
                </Typography>
              )}
              {getStatsForDifficulty('hard').highestScore && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Best Score:</strong> { getStatsForDifficulty('hard').highestScore} 
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ 
          mb: 4, 
          color: "rgb(4, 87, 164, .6)", 
          fontFamily: "Poppins" 
        }}>
        Summary of player performance and progress through various game challenges.
      </Typography>

      <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "left", mt: '100px' }}>
        <PieChart width={250} height={250}>
          <Pie data={dataPie} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <BarChart width={350} height={250} data={dataBar}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score">
            {dataBar.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
        <LineChart width={700} height={250} data={dataLine}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="timeSpent" stroke="#d32f2f" strokeWidth={2} />
        </LineChart>
      </Box>
    </Box>
  );
};

export default ProgressCharts;