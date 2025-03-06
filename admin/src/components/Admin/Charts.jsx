import React, {useEffect, useRef, useState} from "react";
import { Card, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Menu, MenuItem, Box } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import useChartStore from "../../../Store/chartStore"; // Import Zustand store
import { useNavigate } from "react-router-dom";
import PDF from "./Pdf"; // ✅ Import PDF component

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

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
  const { usersPerMonth, fetchUsersPerMonth,  gamesPlayed, fetchGamesPlayed, gameAnalytics, fetchGameAnalytics, fetchGamesPlayedByDifficulty, gamesPlayedByDifficulty, fetchReviewsPerMonth, reviewsPerMonth  } = useChartStore();
  // const navigate = useNavigate();
  const pdfRef = useRef(); // ✅ Create ref for PDF component
  const [pdfVisible, setPdfVisible] = useState(false); // ✅ State to toggle PDF visibility
    const [anchorEl, setAnchorEl] = useState(null); 

  // const pdfRef = useRef();

  useEffect(() => {
    fetchUsersPerMonth();
    fetchGameAnalytics();
    fetchGamesPlayed(); 
    fetchGamesPlayedByDifficulty();
    fetchReviewsPerMonth(); // ✅ Fetch Reviews Data

  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = (option) => {
    setAnchorEl(null);
    if (option === "Enable PDF Export") {
        setPdfVisible(true); // ✅ Show PDF component
    } else if (option === "Disable PDF Export") {
        setPdfVisible(false); // ✅ Hide PDF component
    }
};

  // const exportToPDF = () => {
  //   const input = pdfRef.current;
  //   const pdf = new jsPDF("p", "mm", "a4");
  
  //   // Capture each section separately
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgWidth = 210; // A4 width in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //     let yPosition = 10; // Start position on the first page
  //     let pageHeight = 297; // A4 height in mm
  
  //     if (imgHeight < pageHeight - 20) {
  //       // If content fits in one page
  //       pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
  //     } else {
  //       // Split into multiple pages
  //       let remainingHeight = imgHeight;
  
  //       while (remainingHeight > 0) {
  //         pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, pageHeight - 20);
  //         remainingHeight -= pageHeight - 20;
  //         if (remainingHeight > 0) {
  //           pdf.addPage();
  //           yPosition = 10; // Reset Y position for new page
  //         }
  //       }
  //     }
  
  //     pdf.save("game_analytics_report.pdf");
  //   });
  // };


  return (

   <>
    
   

    <Paper

      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "none"
      }}
    >

{/*       
      <div ref={pdfRef}> */}

      <Typography
    variant="h4"
    sx={{
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "#0457a4",
      textAlign: "center",
      mt: 3, // Adds margin above
      mb: 4  // Adds spacing before charts
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
          data={gamesPlayedByDifficulty} // ✅ Use correct state variable
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
    margin: "20px auto", // Adds spacing around the table
    width: "90%", // Restricts the table width
    maxWidth: "10000px", // Prevents it from being too wide
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


      {/* </div> */}
    

      <Box display="flex" justifyContent={pdfVisible ? "space-between" : "flex-start"} alignItems="center" sx={{ mt: 3 }}>

           <Button variant="contained" sx={{ mt: 3, backgroundColor: "#0457a4", color: "#fff" }} onClick={handleClick}>
                    PDF Options
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
                    <MenuItem onClick={() => handleClose("Enable PDF Export")}>Enable PDF Export</MenuItem>
                    <MenuItem onClick={() => handleClose("Disable PDF Export")}>Disable PDF Export</MenuItem>
                </Menu> 

                {pdfVisible && (
                     <Button
                     variant="contained"
                     sx={{ backgroundColor: "#28a745", color: "#fff", ml: "auto" }} // Moves it to the right
                     onClick={() => pdfRef.current?.exportToPDF()}
                 >
                     Export as PDF
                 </Button>
                 
                    )}

                    </Box>
                 {pdfVisible && <PDF ref={pdfRef} />}
                 
    </Paper>
    </>
  );
  
}