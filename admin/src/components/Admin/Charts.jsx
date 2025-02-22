import React from "react";
import { Card, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const dataLine = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 600 },
  { name: "Jun", value: 700 }
];

const dataBar = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 800 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 600 },
  { name: "May", value: 1100 },
  { name: "Jun", value: 1200 }
];

const dataPie = [
  { name: "Donations", value: 400 },
  { name: "Expenses", value: 300 },
  { name: "Profit", value: 300 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const tableData = [
  { name: "Game 1", players: 150, averageScore: 85 },
  { name: "Game 2", players: 200, averageScore: 90 },
];

export default function Charts() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "none"
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          mb: 2,
          color: "#0457a4",
          fontWeight: "bold",
          fontSize: '20px'
        }}
      >
        CHARTS
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px",
              height: "300px",
              display: "flex",
              boxShadow: "none",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                mb: 2,
                color: "#0457a4",
                textAlign: "center",
              }}
            >
              Line Chart
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff8000" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px",
              height: "300px",
              display: "flex",
              boxShadow: "none",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                mb: 2,
                color: "#0457a4",
                textAlign: "center",
              }}
            >
              Bar Chart
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#b30000" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px",
              height: "300px",
              display: "flex",
              boxShadow: "none",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                mb: 2,
                color: "#0457a4",
                textAlign: "center",
              }}
            >
              Pie Chart
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Typography
        sx={{
          fontFamily: "Poppins",
          mt: 4,
          mb: 2,
          color: "#0457a4",
          fontWeight: "bold",
          fontSize: '20px'
        }}
      >
        Game Analytics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>Game</TableCell>
              <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold" }} align="right">Players</TableCell>
              <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold" }} align="right">Average Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ fontFamily: "Poppins" }}>{row.name}</TableCell>
                <TableCell sx={{ fontFamily: "Poppins" }} align="right">{row.players}</TableCell>
                <TableCell sx={{ fontFamily: "Poppins" }} align="right">{row.averageScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}