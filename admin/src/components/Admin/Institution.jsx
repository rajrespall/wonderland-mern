import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, TextField, Icon } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2,
        backgroundColor: '#0457a4',
        borderColor: '#5da802',
        borderRadius: '30px',
        fontSize: '14px',
        fontFamily: 'Poppins',
        textTransform: 'none',
        height: '40px',
        color: '#fcf230',
        '&:hover': {
          color: '#5da802',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderColor: '#5da802',
          border: '2px solid',
        }, }}>
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

      <TableContainer component={Paper} sx={{ p: 3, bgcolor: "#fff", borderRadius: 3, boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell><b style={{fontFamily: 'Poppins'}}>Name</b></TableCell>
              <TableCell><b style={{fontFamily: 'Poppins'}}>Description</b></TableCell>
              <TableCell><b style={{fontFamily: 'Poppins'}}>Address</b></TableCell>
              <TableCell><b style={{fontFamily: 'Poppins'}}>Map</b></TableCell>
              <TableCell><b style={{fontFamily: 'Poppins'}}>Image</b></TableCell>
              <TableCell><b style={{fontFamily: 'Poppins'}}>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutions.map((institution) => (
              <TableRow key={institution._id}>
                <TableCell  style={{fontFamily: 'Poppins'}}>{institution.name}</TableCell>
                <TableCell style={{fontFamily: 'Poppins'}}>{institution.description}</TableCell>
                <TableCell style={{fontFamily: 'Poppins'}}>{institution.address}</TableCell>
                <TableCell style={{fontFamily: 'Poppins'}}>
                  <iframe src={institution.mapEmbed} width="100" height="100" title={institution.name} />
                </TableCell>
                <TableCell>
                  {institution.institutionImage && (
                    <img src={institution.institutionImage} alt={institution.name} width="100" height="100" />
                  )}
                </TableCell>
                <TableCell>
                    <EditRoundedIcon sx={{color: 'green'}} onClick={() => handleEditOpen(institution)}/>
                    <DeleteRoundedIcon sx={{color: 'red'}} onClick={() => handleDelete(institution._id)}/>
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
