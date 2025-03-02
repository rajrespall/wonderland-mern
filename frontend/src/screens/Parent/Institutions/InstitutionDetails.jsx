import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, CssBaseline, CardMedia } from "@mui/material";
import ParentNav from "../../../components/ParentNav";
import InstitutionCard from "../../../components/Parent/Institutions/InsDetails";
import institutionimage from "../../../assets/institutions1.jpg";

const institutions = [
  { 
    id: 1, 
    name: "TUP - TAGUIG", 
    address: "Taguig, Metro Manila, Philippines", 
    mapEmbed: "https://www.google.com/maps/embed/v1/place?q=Technological+University+of+the+Philippines+-+Taguig+Campus,+Taguig,+Metro+Manila,+Philippines&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
  },
  { id: 2, name: "INSTITUTION 2", address: "Makati, Metro Manila, Philippines" },
  { id: 3, name: "INSTITUTION 3", address: "Quezon City, Metro Manila, Philippines" },
  { id: 4, name: "INSTITUTION 4", address: "Pasig, Metro Manila, Philippines" },
  { id: 5, name: "INSTITUTION 5", address: "Mandaluyong, Metro Manila, Philippines" },
  { id: 6, name: "INSTITUTION 6", address: "Caloocan, Metro Manila, Philippines" },
];

export default function InstitutionsDetails() {
  const { id } = useParams();
  const institution = institutions.find((inst) => inst.id === parseInt(id));

  if (!institution) {
    return (
      <>
        <ParentNav />
        <Container sx={{ mt: 4 }}>
          <h2>Institution not found</h2>
        </Container>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{backgroundColor: 'rgb(4, 87, 164, .1)', minHeight: '100vh', p: 2}}>
        <ParentNav/>
        <CardMedia sx={{mt: 4}}>
          <img
            src={institutionimage}
            alt="institution"
            style={{ width: "100%", height: "400px", objectFit: "cover", }}
          />
        </CardMedia>
        <Container maxWidth="100%" sx={{ mt: 4 }}>
          <InstitutionCard
            title={institution.name}
            description="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed."
            address={institution.address}
            mapEmbed={institution.mapEmbed} 
            />
        </Container>
      </Box>
    </>
  );
}
