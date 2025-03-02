import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import ParentNav from "../../../components/ParentNav";
import InstitutionCard from "../../../components/Parent/Institutions/InsDetails";

const institutions = [
  { id: 1, name: "TUP - TAGUIG", address: "Taguig, Metro Manila, Philippines", mapQuery: "Technological+University+of+the+Philippines+Taguig" },
  { id: 2, name: "INSTITUTION 2", address: "Makati, Metro Manila, Philippines", mapQuery: "Makati+City+Hall" },
  { id: 3, name: "INSTITUTION 3", address: "Quezon City, Metro Manila, Philippines", mapQuery: "Quezon+City+Hall" },
  { id: 4, name: "INSTITUTION 4", address: "Pasig, Metro Manila, Philippines", mapQuery: "Pasig+City+Hall" },
  { id: 5, name: "INSTITUTION 5", address: "Mandaluyong, Metro Manila, Philippines", mapQuery: "Mandaluyong+City+Hall" },
  { id: 6, name: "INSTITUTION 6", address: "Caloocan, Metro Manila, Philippines", mapQuery: "Caloocan+City+Hall" },
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
          description={`Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.`}
          imageUrl={`https://maps.googleapis.com/maps/api/staticmap?center=${institution.mapQuery}&zoom=15&size=400x300&maptype=roadmap&markers=color:red%7Clabel:T%7C${institution.mapQuery}`}
          address={institution.address}
        />
      </Container>
    </>
  );
}
