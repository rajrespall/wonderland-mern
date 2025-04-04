import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Box } from '@mui/material';
import axios from 'axios';

const COLORS = ['#0457a4', '#ff8000', '#00C49F'];

const getTotalGames = (data) => {
  if (!data.length) return [];
  
  // Find the most recent month with game data
  for (let i = data.length - 1; i >= 0; i--) {
    const month = data[i];
    const hasData = (month.wonderPuz || 0) + (month.wonderMatch || 0) + (month.wonderCard || 0) > 0;
    
    if (hasData) {
      return [
        { name: 'WonderPuz', value: month.wonderPuz || 0 },
        { name: 'WonderMatch', value: month.wonderMatch || 0 },
        { name: 'WonderCard', value: month.wonderCard || 0 }
      ].filter(item => item.value > 0);
    }
  }
  
  // If no month has data, return empty array
  return [];
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  // Only show labels for segments that are at least 5% of the total
  if (percent < 0.05) return null;
  
  const RADIAN = Math.PI / 180;
  // Position the label further from the center for better spacing
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill={COLORS[index % COLORS.length]}
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Helper function for radar chart data
const getRadarData = (data) => {
  return data.map(month => ({
    month: month.month,
    'Time Management': month.completion,
    'Engagement': month.engagement,
    'Problem Solving': month.accuracy
  }));
};

const ProgressCharts = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/progress', {
          withCredentials: true
        });
        setProgressData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load progress data');
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) return <Typography>Loading charts...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Calculate averages for summary statistics
  const calculateAverages = () => {
    if (!progressData.length) return { completion: 0, engagement: 0, accuracy: 0 };
    
    const sum = progressData.reduce((acc, curr) => ({
      completion: acc.completion + curr.completion,
      engagement: acc.engagement + curr.engagement,
      accuracy: acc.accuracy + curr.accuracy
    }), { completion: 0, engagement: 0, accuracy: 0 });

    return {
      completion: (sum.completion / progressData.length).toFixed(1),
      engagement: (sum.engagement / progressData.length).toFixed(1),
      accuracy: (sum.accuracy / progressData.length).toFixed(1)
    };
  };

  const averages = calculateAverages();

  return (
    <Grid container spacing={3} maxWidth={1000}>
      {/* Line Chart for Trends */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 2, 
          borderRadius: "25px", 
          height: "350px",
          boxShadow: 'none',
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "Poppins", 
              color: "#0457a4", 
              mb: 2,
              textAlign: "center"
            }}
          >
            Game Progress Trends
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#0457a4" 
                strokeWidth={2}
                name="Time Spent"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Bar Chart with 3 bars per month */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 2, 
          borderRadius: "25px", 
          height: "350px",
          boxShadow: 'none',
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "Poppins", 
              color: "#0457a4", 
              mb: 2,
              textAlign: "center"
            }}
          >
            Monthly Game Metrics
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="completion" 
                fill="#0457a4" 
                name="WonderPuz"
                barSize={20}
              />
              <Bar 
                dataKey="engagement" 
                fill="#ff8000" 
                name="WonderMatch"
                barSize={20}
              />
              <Bar 
                dataKey="accuracy" 
                fill="#00C49F" 
                name="WonderCard"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      
       {/* Replace Area Chart with Pie Chart */}
       <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 2, 
          borderRadius: "25px", 
          height: "350px",
          boxShadow: 'none',
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "Poppins", 
              color: "#0457a4", 
              mb: 2,
              textAlign: "center"
            }}
          >
            Game Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getTotalGames(progressData)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                innerRadius={30} // Adding innerRadius makes a donut chart which often looks better
                fill="#8884d8"
                dataKey="value"
                paddingAngle={1} // Add small padding between segments
              >
                {getTotalGames(progressData).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} games`, name]}
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  padding: "8px 12px",
                  fontSize: "12px"
                }}
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                formatter={(value) => <span style={{fontSize: "12px", color: "#333"}}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Replace Stacked Bar Chart with Radar Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 2, 
          borderRadius: "25px", 
          height: "350px",
          boxShadow: 'none',
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "Poppins", 
              color: "#0457a4", 
              mb: 2,
              textAlign: "center"
            }}
          >
            Skill Development Radar
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={getRadarData(progressData)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="month" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Time Management"
                dataKey="Time Management"
                stroke="#0457a4"
                fill="#0457a4"
                fillOpacity={0.6}
              />
              <Radar
                name="Engagement"
                dataKey="Engagement"
                stroke="#ff8000"
                fill="#ff8000"
                fillOpacity={0.6}
              />
              <Radar
                name="Problem Solving"
                dataKey="Problem Solving"
                stroke="#00C49F"
                fill="#00C49F"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Summary Statistics */}
      <Grid item xs={12}>
        <Card sx={{ 
          p: 2, 
          borderRadius: "25px",
          boxShadow: 'none',
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
          <StatBox title="Average Completion" value={`${averages.completion}%`} color="#0457a4" />
          <StatBox title="Avg Engagement" value={`${averages.engagement}%`} color="#ff8000" />
          <StatBox title="Avg Accuracy" value={`${averages.accuracy}%`} color="#00C49F" />
        </Card>
      </Grid>
      
    </Grid>
    
  );
};

// Helper component for statistics
const StatBox = ({ title, value, color }) => (
  <Box sx={{ textAlign: 'center', p: 2 }}>
    <Typography 
      variant="h6" 
      sx={{ 
        fontFamily: "Poppins", 
        color: color,
        fontWeight: "bold"
      }}
    >
      {value}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        fontFamily: "Poppins", 
        color: "#666"
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default ProgressCharts;