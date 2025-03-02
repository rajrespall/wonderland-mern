import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Grid, Button } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import DownloadIcon from '@mui/icons-material/Download';
import useGameDataStore from '../../store/gameStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


// Reusable stat card component
const StatCard = ({ title, stats, color }) => (
  <Card sx={{ 
    boxShadow: 3, 
    bgcolor: '#f8f9fa', 
    borderLeft: `4px solid ${color}`,
    height: '100%'
  }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Poppins' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Total Games:</strong> {stats.gamesPlayed || 0}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Avg. Time:</strong> {Math.round(stats.averageTimeSpent || stats.averageTimeTaken || 0)} sec
      </Typography>
      {stats.completedGames !== undefined && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Completed:</strong> {stats.completedGames || 0} games
        </Typography>
      )}
      {stats.bestTime !== undefined && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Best Time:</strong> {stats.bestTime} sec
        </Typography>
      )}
      {stats.highestScore !== undefined && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Best Score:</strong> {stats.highestScore}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const ProgressCharts = () => {
    const gameStore = useGameDataStore();
    const [selectedDataType, setSelectedDataType] = useState("puzzle");
    const COLORS = ["#d32f2f", "#f57c00", "#fbc02d"];
    const chartsRef = useRef(null);
  
    // Map game types to their API endpoints
    const gameTypeMap = {
      puzzle: "puz",
      card: "card",
      match: "match"
    };
  
    useEffect(() => {
      const fetchAllData = async () => {
        // Fetch both game data and statistics for all game types
        try {
          await Promise.all([
            gameStore.fetchPuzzleData(),
            gameStore.fetchCardData(),
            gameStore.fetchMatchData(),
            gameStore.fetchPuzzleStats(),
            gameStore.fetchCardStats(),
            gameStore.fetchMatchStats()
          ]);
        } catch (error) {
          console.error("Error fetching game data:", error);
        }
      };
      
      fetchAllData();
    }, []);
    
    const exportToPDF = async () => {
      const input = chartsRef.current;
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      
      // Add title to PDF
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(4, 87, 164); // #0457a4
      pdf.text('Progress Report', 105, 15, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Game Type: ${selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)}`, 20, 25);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
      
      try {
          // Generate canvas from charts
          const canvas = await html2canvas(input, {
              scale: 2,
              useCORS: true,
              logging: false
          });
          
          // Convert canvas to image
          const imgData = canvas.toDataURL('image/png');
          
          // Calculate aspect ratio to fit on page
          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgWidth = pageWidth - 40; // Margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add image to PDF
          pdf.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);
          
          // Add summary text
          const summaryY = 40 + imgHeight + 10;
          pdf.setFontSize(14);
          pdf.setTextColor(4, 87, 164); // #0457a4
          pdf.text('Summary', 20, summaryY);
          
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          
          const stats = gameStore[`${selectedDataType}Stats`] || {};
          const summary = [
              `Total Games Played: ${stats.gamesPlayed || 0}`,
              `Average Score: ${stats.averageScore || 0}`,
              `Best Score: ${stats.highestScore || 0}`,
              `Average Time: ${stats.averageTimeTaken || 0} seconds`
          ];
          
          summary.forEach((line, i) => {
              pdf.text(line, 20, summaryY + 10 + (i * 5));
          });
          
          // Save the PDF
          pdf.save(`wonderland-progress-${selectedDataType}-${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
      } catch (error) {
          console.error('Error generating PDF:', error);
      }
  };

    if (gameStore.loading) return <Typography>Loading...</Typography>;
    if (gameStore.error) return <Typography color="error">{gameStore.error}</Typography>;

    const handleChange = (event) => {
      setSelectedDataType(event.target.value);
    };

    // Get the current game data based on selection
    const getCurrentGameData = () => {
      const gameData = gameStore[`${selectedDataType}Data`];
      return Array.isArray(gameData) ? gameData : [];
    };
    
    // Get stats for a specific difficulty
    const getStatsForDifficulty = (difficulty) => {
      const apiType = gameTypeMap[selectedDataType];
      return gameStore.getStatsForDifficulty(apiType, difficulty);
    };
    
    const data = getCurrentGameData();
    
    // Prepare pie chart data
    const dataPie = [
      { name: "Easy", value: data.filter(game => game.difficulty?.toLowerCase() === 'easy').length },
      { name: "Medium", value: data.filter(game => game.difficulty?.toLowerCase() === 'medium' || game.difficulty?.toLowerCase() === 'normal').length },
      { name: "Hard", value: data.filter(game => game.difficulty?.toLowerCase() === 'hard').length }
    ];

    // Prepare bar chart data
    const formatDate = (dateString) => {
      if (!dateString) return 'Unknown';
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Unknown';
      }
    };
    
    const dataBar = data.slice().reverse().map(game => ({
      name: formatDate(game.playedAt || game.gameDate),
      score: gameStore.getGameTime(game)
    }));

    // Prepare line chart data
    const dataLine = data.slice().reverse().map(game => ({
      name: formatDate(game.playedAt || game.gameDate),
      timeSpent: gameStore.getGameTime(game)
    }));

    return (
      <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins" }}>
          ACHIEVEMENTS/ PROGRESS
        </Typography>
        <Button 
             variant="contained" 
             startIcon={<DownloadIcon />}
             onClick={exportToPDF}
             sx={{
                 left: '82%',
                 bgcolor: "#0457a4",
                 borderRadius: '20px',
                 fontFamily: 'Poppins',
                 textTransform: 'none',
                 '&:hover': { bgcolor: "#033f7a" }
             }}
         >
             Export as PDF
         </Button>       

        <FormControl sx={{ right: '15%', mt: 2, mb: 4, minWidth: 120 }}>
          <InputLabel>Game Type</InputLabel>
          <Select value={selectedDataType} onChange={handleChange}>
            <MenuItem value="puzzle">Puzzle</MenuItem>
            <MenuItem value="card">Card</MenuItem>
            <MenuItem value="match">Match</MenuItem>
          </Select>
        </FormControl>
        
        {/* Game Stats Info Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <StatCard 
              title={`Easy ${selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games`}
              stats={getStatsForDifficulty('easy')}
              color={COLORS[0]}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <StatCard 
              title={`Medium ${selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games`}
              stats={getStatsForDifficulty('medium')}
              color={COLORS[1]}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <StatCard 
              title={`Hard ${selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)} Games`}
              stats={getStatsForDifficulty('hard')}
              color={COLORS[2]}
            />
          </Grid>
        </Grid>

        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ mb: 4, color: "rgb(4, 87, 164, .6)", fontFamily: "Poppins" }}>
          Summary of player performance and progress through various game challenges.
        </Typography>

        <Box ref={chartsRef} sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "left", mt: '100px' }}>
          {/* Pie Chart */}
          <PieChart width={250} height={250}>
            <Pie data={dataPie} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          
          {/* Bar Chart */}
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
          
          {/* Line Chart */}
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