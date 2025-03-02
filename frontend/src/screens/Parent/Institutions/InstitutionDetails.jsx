import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import ParentNav from "../../../components/ParentNav";
import InstitutionCard from "../../../components/Parent/Institutions/InsDetails";

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
      <ParentNav />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <InstitutionCard
          title={institution.name}
          description="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed."
          address={institution.address}
        />
        {institution.mapEmbed && (
          <Container sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Location of {institution.name}
            </Typography>
            <iframe
              src={institution.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </Container>
        )}
      </Container>
    </>
  );
}
