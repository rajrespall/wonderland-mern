import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Institution = () => {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      name: "ABC University",
      address: "123 Main St, Manila",
      mapEmbed: "https://maps.google.com/?q=123+Main+St",
      institutionImage: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "XYZ College",
      address: "456 Elm St, Cebu",
      mapEmbed: "https://maps.google.com/?q=456+Elm+St",
      institutionImage: "https://via.placeholder.com/100",
    },
  ]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell><b>Map</b></TableCell>
            <TableCell><b>Image</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {institutions.map((institution) => (
            <TableRow key={institution.id}>
              <TableCell>{institution.name}</TableCell>
              <TableCell>{institution.address}</TableCell>
              <TableCell>
                <a href={institution.mapEmbed} target="_blank" rel="noopener noreferrer">View Map</a>
              </TableCell>
              <TableCell>
                <img src={institution.institutionImage} alt={institution.name} width="50" height="50" />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small" style={{ marginRight: "5px" }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Institution;
