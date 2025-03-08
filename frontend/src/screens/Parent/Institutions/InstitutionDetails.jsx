import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, CssBaseline, CardMedia } from "@mui/material";
import ParentNav from "../../../components/ParentNav";
import InstitutionCard from "../../../components/Parent/Institutions/InsDetails";

export default function InstitutionDetails() {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/institutions/${id}`);
        setInstitution(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching institution");
      }
    };

    fetchInstitution();
  }, [id]);

  if (error) {
    return (
      <>
        <ParentNav />
        <Container sx={{ mt: 4 }}>
          <h2>{error}</h2>
        </Container>
      </>
    );
  }

  if (!institution) {
    return (
      <>
        <ParentNav />
        <Container sx={{ mt: 4 }}>
          <h2>Loading...</h2>
        </Container>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'rgb(4, 87, 164, .1)', minHeight: '100vh', p: 2 }}>
        <ParentNav />
        <CardMedia sx={{ mt: 4 }}>
          <img
            src={institution.institutionImage}
            alt="institution"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </CardMedia>
        <Container maxWidth="100%" sx={{ mt: 4 }}>
          <InstitutionCard
            title={institution.name}
            description={institution.description}
            address={institution.address}
            mapEmbed={institution.mapEmbed}
          />
        </Container>
      </Box>
    </>
  );
}