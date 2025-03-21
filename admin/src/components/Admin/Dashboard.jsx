// import React from "react";
// import { Grid, Card, Typography, Box, IconButton } from "@mui/material";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
// import GroupsIcon from "@mui/icons-material/Groups";
// import ReviewsIcon from "@mui/icons-material/RateReview";
// import DonationsIcon from "@mui/icons-material/VolunteerActivism";
// import AdminsIcon from "@mui/icons-material/SupervisorAccount";
// import '@fontsource/poppins'

// const dataPie = [
//   { name: "A", value: 400 },
//   { name: "B", value: 300 },
//   { name: "C", value: 200 }
// ];
// const COLORS = ["#b30000", "#ff8000", "#ffcc66"];

// const dataBar = [
//   { name: "Jan", value: 40 },
//   { name: "Feb", value: 60 },
//   { name: "Mar", value: 30 },
//   { name: "Apr", value: 70 }
// ];

// const dataLine = [
//   { name: "Jan", value: 20 },
//   { name: "Feb", value: 50 },
//   { name: "Mar", value: 80 },
//   { name: "Apr", value: 60 }
// ];

// const DashboardCharts = () => {
//   return (
//     <Grid 
//       container 
//       spacing={2} 
//       sx={{ 
//         minHeight: "85vh", 
//         display: "flex", 
//         alignItems: "center", 
//         justifyContent: "left", 
//         width: "120%",
//         pl: 20,
//       }}
//     >
//       <Grid 
//         item 
//         container 
//         spacing={2} 
//         xs={12} 
//         md={9} 
//         justifyContent="center" 
//         alignItems="center"
//       >
//         <Grid 
//           item 
//           xs={12} 
//           sm={6} 
//           md={3}
//         >
//           <Card 
//             sx={{ 
//               p: 2, 
//               textAlign: "center", 
//               borderRadius: '25px', 
//               height: '150px', 
//               boxShadow: 'none', 
//               display: "flex", 
//               alignItems: "center", 
//               justifyContent: "space-between",
//               cursor: "pointer",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0"
//               }
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1" sx={{fontFamily: 'Poppins'}}>Reviews</Typography>
//               <Typography variant="h4" color="green" sx={{fontFamily: 'Poppins'}}>34</Typography>
//             </Box>
//             <ReviewsIcon sx={{ fontSize: 70, color: "green" }} />
//           </Card>
//           <Card 
//             sx={{ 
//               p: 2, 
//               mt: 2, 
//               fontFamily: 'Poppins',
//               textAlign: "center", 
//               borderRadius: '25px', 
//               height: '150px', 
//               boxShadow: 'none', 
//               display: "flex", 
//               alignItems: "center", 
//               justifyContent: "space-between",
//               cursor: "pointer",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0"
                
//               }
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1" sx={{fontFamily: 'Poppins'}}>Donations</Typography>
//               <Typography variant="h4" color="orange" sx={{fontFamily: 'Poppins'}}>5,000</Typography>
//             </Box>
//             <DonationsIcon sx={{ fontSize: 70, color: "orange" }} />
//           </Card>
//           <Card 
//             sx={{ 
//               p: 2, 
//               mt: 2, 
//               fontFamily: 'Poppins',
//               textAlign: "center", 
//               borderRadius: '25px', 
//               height: '150px', 
//               boxShadow: 'none', 
//               display: "flex", 
//               alignItems: "center", 
//               justifyContent: "space-between",
//               cursor: "pointer",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0"
//               }
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1" sx={{fontFamily: 'Poppins'}}>Admins</Typography>
//               <Typography variant="h4" color="green" sx={{fontFamily: 'Poppins'}}>3</Typography>
//             </Box>
//             <AdminsIcon sx={{ fontSize: 70, color: "green" }} />
//           </Card>
//         </Grid>

//         <Grid 
//           item 
//           xs={12} 
//           sm={6} 
//           md={3}
//         >
//           <Card 
//             sx={{ 
//               p: 2, 
//               textAlign: "center", 
//               borderRadius: '25px', 
//               height: '150px', 
//               boxShadow: 'none', 
//               display: "flex", 
//               alignItems: "center", 
//               justifyContent: "space-between",
//               cursor: "pointer",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0"
//               }
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1" sx={{fontFamily: 'Poppins'}}>Users</Typography>
//               <Typography variant="h4" color="orange" sx={{fontFamily: 'Poppins'}}>1,234</Typography>
//             </Box>
//             <GroupsIcon sx={{ fontSize: 70, color: "green" }} />
//           </Card>
//           <Card 
//             sx={{ 
//               p: 2, 
//               mt: 2, 
//               fontFamily: 'Poppins',
//               borderRadius: "25px", 
//               height: "320px", 
//               width: "100%", 
//               boxShadow: 'none', 
//               display: "flex", 
//               alignItems: "center", 
//               justifyContent: "center" 
//             }}
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie data={dataPie} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
//                   {dataPie.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>
//         </Grid>

//         <Grid 
//           item 
//           xs={12} 
//           sm={6} 
//           md={6}
//         >
//           <Card 
//             sx={{ 
//               p: 2, 
//               borderRadius: "25px", 
//               height: "235px", 
//               display: "flex", 
//               boxShadow: 'none', 
//               alignItems: "center", 
//               justifyContent: "center", 
//               width: '400px'
//             }}
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={dataLine}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="value" stroke="#ff8000" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//           <Card 
//             sx={{ 
//               p: 2, 
//               mt: 2, 
//               borderRadius: "25px", 
//               height: "235px", 
//               display: "flex", 
//               boxShadow: 'none', 
//               alignItems: "center", 
//               justifyContent: "center" ,
//               width: '400px'
//             }}
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={dataBar}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#b30000" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardCharts;