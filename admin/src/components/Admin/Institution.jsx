import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, TextField } from "@mui/material";
import axios from "axios";

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newInstitution, setNewInstitution] = useState({
    name: "",
    description: "",
    address: "",
    mapEmbed: "",
    institutionImage: null,
  });

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/institutions");
      setInstitutions(response.data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  };

  const handleOpen = () => {
    setEditMode(false);
    setNewInstitution({ name: "", description: "", address: "", mapEmbed: "", institutionImage: null });
    setOpen(true);
  };

  const handleEditOpen = (institution) => {
    setEditMode(true);
    setSelectedId(institution._id);
    setNewInstitution({
      name: institution.name,
      description: institution.description,
      address: institution.address,
      mapEmbed: institution.mapEmbed,
      institutionImage: institution.institutionImage, 
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewInstitution((prev) => ({ ...prev, institutionImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", newInstitution.name);
    formData.append("description", newInstitution.description);
    formData.append("address", newInstitution.address);
    formData.append("mapEmbed", newInstitution.mapEmbed);
  
    if (newInstitution.institutionImage instanceof File) {
      formData.append("image", newInstitution.institutionImage);
    }
  
    console.log("Submitting form with data:", Object.fromEntries(formData)); 
  
    try {
      if (editMode) {
        const response = await axios.put(`http://localhost:5000/api/institutions/${selectedId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setInstitutions((prev) =>
          prev.map((inst) => (inst._id === selectedId ? response.data : inst))
        );
      } else {
        const response = await axios.post("http://localhost:5000/api/institutions", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setInstitutions((prev) => [...prev, response.data.newInstitution]);
      }
  
      handleClose();
    } catch (error) {
      console.error("Error saving institution:", error.response ? error.response.data : error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/institutions/${id}`);
      setInstitutions((prev) => prev.filter((inst) => inst._id !== id)); 
    } catch (error) {
      console.error("Error deleting institution:", error);
    }
  };
  

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: "20px" }}>
        Add Institution
      </Button>

    {/* modal for edit and add na to */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}> 
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={newInstitution.name} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Description" name="description" value={newInstitution.description} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Address" name="address" value={newInstitution.address} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Map Embed URL" name="mapEmbed" value={newInstitution.mapEmbed} onChange={handleChange} fullWidth margin="normal" required />
            <input type="file" name="image" onChange={handleImageChange} />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
              {editMode ? "Update" : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Map</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutions.map((institution) => (
              <TableRow key={institution._id}>
                <TableCell>{institution.name}</TableCell>
                <TableCell>{institution.description}</TableCell>
                <TableCell>{institution.address}</TableCell>
                <TableCell>
                  <a href={institution.mapEmbed} target="_blank" rel="noopener noreferrer">View Map</a>
                </TableCell>
                <TableCell>
                  {institution.institutionImage && (
                    <img src={institution.institutionImage} alt={institution.name} width="50" height="50" />
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" style={{ marginRight: "5px" }} onClick={() => handleEditOpen(institution)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(institution._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Institution;
