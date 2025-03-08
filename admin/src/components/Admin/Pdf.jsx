import React, {useEffect, useRef,  forwardRef, useImperativeHandle } from "react";
import { Card, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Divider } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import useChartStore from "../../../Store/chartStore"; 
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


import tupLogo from "../../assets/tup.png"; 
import wonderlandLogo from "../../assets/logo.png"; 


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


const PDF = forwardRef((props, ref) => {
    const { usersPerMonth, fetchUsersPerMonth,  gamesPlayed, fetchGamesPlayed, gameAnalytics, fetchGameAnalytics, fetchGamesPlayedByDifficulty, gamesPlayedByDifficulty, fetchReviewsPerMonth, reviewsPerMonth  } = useChartStore();
  const navigate = useNavigate();

  const pdfRef = useRef();

  useEffect(() => {
    fetchUsersPerMonth();
    fetchGameAnalytics();
    fetchGamesPlayed(); 
    fetchGamesPlayedByDifficulty();
    fetchReviewsPerMonth(); 

  }, []);

  const exportToPDF = () => {
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4"); 
    const pageWidth = pdf.internal.pageSize.getWidth(); 
    const pageHeight = pdf.internal.pageSize.getHeight(); 
    let currentPage = 1;

    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let yPosition = 60; 
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
            if (currentPage > 1) {
                pdf.addPage();
                yPosition = 20; 
            }

          
            pdf.addImage(tupLogo, "PNG", 12, 10, 15, 15); 
            pdf.addImage(wonderlandLogo, "PNG", pageWidth - 27, 10, 15, 15); 

            pdf.setFontSize(14);
            pdf.setFont("times", "bold");
            pdf.text("TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES-TAGUIG", pageWidth / 2, 18, { align: "center" });

            pdf.setFontSize(12);
            pdf.text("BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY", pageWidth / 2, 24, { align: "center" });

            pdf.setFontSize(10);
            pdf.text("Km. 14 East Service Road, Western Bicutan, Taguig City 1630, Metro Manila, Philippines", pageWidth / 2, 30, { align: "center" });

          
            pdf.setDrawColor(150, 0, 0);
            pdf.setLineWidth(1.5);
            pdf.line(12, 34, pageWidth - 12, 34); 

          
            pdf.addImage(imgData, "PNG", 12, yPosition, imgWidth, pageHeight - 90);

           
            pdf.setDrawColor(150, 0, 0);
            pdf.setLineWidth(1.5);
            pdf.line(12, pageHeight - 15, pageWidth - 12, pageHeight - 15); 

            pdf.setFontSize(10);
            pdf.text(`Page ${currentPage}`, pageWidth / 2, pageHeight - 8, { align: "center" });

            remainingHeight -= pageHeight - 90;
            currentPage++;
        }

        pdf.save("game_analytics_report.pdf");
    });
    };

useImperativeHandle(ref, () => ({
    exportToPDF
}));


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


<Box display="flex" justifyContent="space-between" alignItems="center">
        <img src={tupLogo} alt="TUP Logo" style={{ width: "80px", height: "80px", marginLeft: "20px" }} />
        <Box textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES-TAGUIG
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
          </Typography>
          <Typography variant="body2">
            Km. 14 East Service Road, Western Bicutan, Taguig City 1630, Metro Manila, Philippines
          </Typography>
        </Box>
        <img src={wonderlandLogo} alt="Wonderland Logo" style={{ width: "80px", height: "80px", marginRight: "20px" }} />
      </Box>
      <Divider sx={{ my: 1, borderBottom: "3px solid red" }} />

      
      <div ref={pdfRef}>

      <Typography
    variant="h4"
    sx={{
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "#0457a4",
      textAlign: "center",
      mt: 3, 
      mb: 4  
    }}
  >
    WonderCharts
  </Typography>
      <Typography sx={{ fontFamily: "Poppins", mb: 2, color: "#0457a4", fontWeight: "bold", fontSize: "22px", ml: 4 }}>
          CHARTS
        </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
              Users Created Per Month
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usersPerMonth}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff8000" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: "25px", height: "300px", display: "flex", boxShadow: "none",
            alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontFamily: "Poppins", mb: 2, color: "#0457a4", textAlign: "center" }}>
              Games Played
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gamesPlayed}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#b30000" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        

        <Grid item xs={12} md={6}>
  <Card
    sx={{
      p: 2,
      borderRadius: "25px",
      height: "350px",
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
      Games Played by Difficulty (Pie Chart)
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={gamesPlayedByDifficulty} 
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          nameKey="name"
          label
        >
          {gamesPlayedByDifficulty.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
          payload={[
            { value: "Easy", type: "square", color: COLORS[0] },
            { value: "Medium", type: "square", color: COLORS[1] },
            { value: "Hard", type: "square", color: COLORS[2] },
          ]}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Card>
</Grid>

<Grid item xs={12} md={6}>
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
            Reviews Per Month
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reviewsPerMonth}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#28A745" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </Card>
</Grid>




  </Grid>

      <Typography sx={{ fontFamily: "Poppins", mt: 4, mb: 2, color: "#0457a4", fontWeight: "bold", fontSize: "22px", ml: 4 }}>
          Game Analytics
        </Typography>
        <TableContainer
  component={Paper}
  sx={{
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: 3,
    margin: "20px auto", 
    width: "90%", 
    maxWidth: "10000px", 
  }}
>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#0457a4" }}>
        <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "white", textAlign: "center" }}>Game</TableCell>
        <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "white", textAlign: "center" }}>Players</TableCell>
        <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "white", textAlign: "center" }}>Avg Games per Player</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {gameAnalytics.map((row, index) => (
        <TableRow key={row.name} sx={{ backgroundColor: index % 2 === 0 ? "#f4f4f4" : "white" }}>
          <TableCell sx={{ fontFamily: "Poppins", padding: "12px", textAlign: "center", borderBottom: "1px solid #ddd" }}>{row.name}</TableCell>
          <TableCell sx={{ fontFamily: "Poppins", padding: "12px", textAlign: "center", borderBottom: "1px solid #ddd" }}>{row.players}</TableCell>
          <TableCell sx={{ fontFamily: "Poppins", padding: "12px", textAlign: "center", borderBottom: "1px solid #ddd" }}>{row.totalGames}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      </div>
      {/* <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}> */}
      {/* Back Button */}
       {/* <Button
        variant="contained"
        sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
        onClick={() => navigate("/")}
      >
        Back
      </Button> */}

      {/* Export Button (Aligned Right) */}
      {/* <Button
        variant="contained"
        sx={{ backgroundColor: "#0457a4", color: "#fff" }}
        onClick={exportToPDF}
      >
        Export as PDF
      </Button>
    </Box>  */}
    </Paper>
  );
  
});
export default PDF;
  
