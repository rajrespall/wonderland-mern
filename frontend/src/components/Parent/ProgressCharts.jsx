import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

const dataPie = [
  { name: "Completed", value: 60 },
  { name: "In Progress", value: 30 },
  { name: "Not Started", value: 10 },
];

const dataBar = [
  { name: "Game 1", score: 40 },
  { name: "Game 2", score: 60 },
  { name: "Game 3", score: 30 },
  { name: "Game 4", score: 80 },
  { name: "Game 5", score: 50 },
];

const dataLine = [
  { name: "Day 1", value: 10 },
  { name: "Day 2", value: 40 },
  { name: "Day 3", value: 30 },
  { name: "Day 4", value: 70 },
  { name: "Day 5", value: 50 },
];

const COLORS = ["#d32f2f", "#f57c00", "#fbc02d"];

export default function ProgressCharts() {
  return (
    <Box sx={{ 
        flexGrow: 1, 
        pl: 4, 
        pt: 2 }}>

      <Typography variant="h6" 
      sx={{
        fontWeight:"bold",
        color: "#0457a4",
        fontFamily: "Poppins",
        }}>
        ACHIEVEMENTS/ PROGRESS
      </Typography>

      <Typography variant="body2" color="textSecondary"
      sx={{ 
        mb: 4, 
        color: "rgb(4, 87, 164, .6)",
        fontFamily: "Poppins",
        }}>
        Summary of player performance and progress through various game challenges.
      </Typography>

      <Box 
      sx={{ 
        display: "flex", 
        gap: 5, 
        flexWrap: "wrap", 
        justifyContent: "left",
        mt: '100px' }}>

        <LineChart width={350} height={250} data={dataLine}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#d32f2f" strokeWidth={2} />
        </LineChart>

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

        <PieChart width={250} height={250}>
          <Pie data={dataPie} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </Box>
  );
}
