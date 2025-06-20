import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, Delete, Add, Edit, Close } from "@mui/icons-material";
import useAdminResourceStore from "../../../Store/resourceStore";

const Resources = () => {
  const {
    resources,
    loading,
    error,
    totalResources,
    fetchResources,
    deleteResource,
    createResource,
    updateResource,
    clearError,
  } = useAdminResourceStore();

  const [open, setOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [addResourceOpen, setAddResourceOpen] = useState(false);
  const [editResourceOpen, setEditResourceOpen] = useState(false);

  // Add Resource Form State
  const [formData, setFormData] = useState({
    resourceType: "",
    title: "",
    author: "",
    content: "",
    link: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Edit Resource Form State
  const [editFormData, setEditFormData] = useState({
    resourceType: "",
    title: "",
    author: "",
    content: "",
    link: "",
  });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [editSubmitError, setEditSubmitError] = useState("");
  const [editSubmitSuccess, setEditSubmitSuccess] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);

  const resourceTypes = [
    "Communication",
    "Sensory", 
    "Emotional",
    "Routines",
    "Social",
    "Educational"
  ];

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleViewDetails = (resource) => {
    setSelectedResource(resource);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedResource(null);
  };

  const handleDeleteClick = (resource) => {
    setResourceToDelete(resource);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (resourceToDelete) {
      const result = await deleteResource(resourceToDelete._id);
      if (result.success) {
        setDeleteDialogOpen(false);
        setResourceToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setResourceToDelete(null);
  };

  const handleAddResource = () => {
    setAddResourceOpen(true);
  };

  const handleAddResourceClose = () => {
    if (!loading) {
      setFormData({
        resourceType: "",
        title: "",
        author: "",
        content: "",
        link: "",
      });
      setFormErrors({});
      setSubmitError("");
      setSubmitSuccess(false);
      setAddResourceOpen(false);
    }
  };

  const handleEditResource = (resource) => {
    setResourceToEdit(resource);
    setEditFormData({
      resourceType: resource.resourceType,
      title: resource.title,
      author: resource.author,
      content: resource.content,
      link: resource.link,
    });
    setEditResourceOpen(true);
  };

  const handleEditResourceClose = () => {
    if (!loading) {
      setEditFormData({
        resourceType: "",
        title: "",
        author: "",
        content: "",
        link: "",
      });
      setEditFormErrors({});
      setEditSubmitError("");
      setEditSubmitSuccess(false);
      setResourceToEdit(null);
      setEditResourceOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (editFormErrors[name]) {
      setEditFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.resourceType.trim()) {
      errors.resourceType = "Resource type is required";
    }
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.author.trim()) {
      errors.author = "Author is required";
    }
    
    if (!formData.content.trim()) {
      errors.content = "Content is required";
    }
    
    if (!formData.link.trim()) {
      errors.link = "Link is required";
    } else {
      // Basic URL validation
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.link)) {
        errors.link = "Please enter a valid URL";
      }
    }
    
    return errors;
  };

  const validateEditForm = () => {
    const errors = {};
    
    if (!editFormData.resourceType.trim()) {
      errors.resourceType = "Resource type is required";
    }
    
    if (!editFormData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!editFormData.author.trim()) {
      errors.author = "Author is required";
    }
    
    if (!editFormData.content.trim()) {
      errors.content = "Content is required";
    }
    
    if (!editFormData.link.trim()) {
      errors.link = "Link is required";
    } else {
      // Basic URL validation
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(editFormData.link)) {
        errors.link = "Please enter a valid URL";
      }
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const result = await createResource(formData);
      
      if (result.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          resourceType: "",
          title: "",
          author: "",
          content: "",
          link: "",
        });
        
        // Close dialog after a short delay to show success message
        setTimeout(() => {
          setSubmitSuccess(false);
          setAddResourceOpen(false);
        }, 1500);
      } else {
        setSubmitError(result.error || "Failed to create resource");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditSubmitError("");
    setEditSubmitSuccess(false);
    
    const errors = validateEditForm();
    setEditFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const result = await updateResource(resourceToEdit._id, editFormData);
      
      if (result.success) {
        setEditSubmitSuccess(true);
        
        // Close dialog after a short delay to show success message
        setTimeout(() => {
          setEditSubmitSuccess(false);
          setEditResourceOpen(false);
          setResourceToEdit(null);
          setEditFormData({
            resourceType: "",
            title: "",
            author: "",
            content: "",
            link: "",
          });
        }, 1500);
      } else {
        setEditSubmitError(result.error || "Failed to update resource");
      }
    } catch (error) {
      setEditSubmitError("An unexpected error occurred");
    }
  };

  const getResourceTypeColor = (type) => {
    const colors = {
      Communication: "#1976d2",
      Sensory: "#f57c00",
      Emotional: "#388e3c",
      Routines: "#7b1fa2",
      Social: "#d32f2f",
      Educational: "#0288d1",
    };
    return colors[type] || "#757575";
  };

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "resourceType",
      label: "Type",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Chip
            label={value}
            sx={{
              backgroundColor: getResourceTypeColor(value),
              color: "white",
              fontWeight: "bold",
              fontSize: "0.75rem",
              minWidth: "100px",
            }}
          />
        ),
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "500",
              maxWidth: "250px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: "author",
      label: "Author",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography 
            sx={{ 
              fontFamily: "Poppins", 
              fontSize: "0.875rem",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Typography>
        ),
      },
    },
    {
      name: "createdAt",
      label: "Created Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Typography sx={{ fontFamily: "Poppins", fontSize: "0.875rem" }}>
            {new Date(value).toLocaleDateString()}
          </Typography>
        ),
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const resource = resources[tableMeta.rowIndex];
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                onClick={() => handleViewDetails(resource)}
                sx={{
                  color: "#0457a4",
                  borderColor: "#0457a4",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: "#0457a4",
                    color: "white",
                  },
                }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={() => handleEditResource(resource)}
                sx={{
                  color: "#f57c00",
                  borderColor: "#f57c00",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: "#f57c00",
                    color: "white",
                  },
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Delete />}
                onClick={() => handleDeleteClick(resource)}
                sx={{
                  color: "#d32f2f",
                  borderColor: "#d32f2f",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    color: "white",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    responsive: "standard",
    search: true,
    filter: true,
    print: false,
    download: true,
    viewColumns: true,
    tableBodyMaxHeight: "600px",
    fixedHeader: true,
    customToolbar: () => (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAddResource}
        sx={{
          backgroundColor: "#0457a4",
          fontFamily: "Poppins",
          "&:hover": {
            backgroundColor: "#034a94",
          },
        }}
      >
        Add Resource
      </Button>
    ),
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", boxShadow: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2, fontFamily: "Poppins" }}>Loading resources...</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", boxShadow: "none" }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          mb: 2,
          color: "#0457a4",
          fontWeight: "bold",
        }}
      >
        Resources Database ({totalResources} total)
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={clearError}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ width: "100%", maxWidth: "1000px" }}>
        <MUIDataTable
          data={resources}
          columns={columns}
          options={options}
        />
      </Box>

      {/* Resource Details Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#0457a4",
            }}
          >
            Resource Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedResource && (
            <Box sx={{ pt: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedResource.resourceType}
                  sx={{
                    backgroundColor: getResourceTypeColor(selectedResource.resourceType),
                    color: "white",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                />
              </Box>
              
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#0457a4",
                  mb: 1,
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                }}
              >
                {selectedResource.title}
              </Typography>
              
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                  color: "#666",
                  mb: 2,
                }}
              >
                By: {selectedResource.author}
              </Typography>
              
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  lineHeight: 1.6,
                  mb: 2,
                  textAlign: "justify",
                }}
              >
                {selectedResource.content}
              </Typography>
              
              {selectedResource.link && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    Resource Link:
                  </Typography>
                  <Button
                    variant="contained"
                    href={selectedResource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: "#0457a4",
                      "&:hover": {
                        backgroundColor: "#034a94",
                      },
                    }}
                  >
                    Visit Resource
                  </Button>
                </Box>
              )}
              
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "0.8rem",
                  color: "#999",
                  mt: 2,
                }}
              >
                Created: {new Date(selectedResource.createdAt).toLocaleDateString()}
                {selectedResource.updatedAt && selectedResource.updatedAt !== selectedResource.createdAt && (
                  <span> | Updated: {new Date(selectedResource.updatedAt).toLocaleDateString()}</span>
                )}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#0457a4" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#d32f2f",
            }}
          >
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: "Poppins" }}>
            Are you sure you want to delete the resource "{resourceToDelete?.title}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel} 
            sx={{ color: "#666" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Resource Dialog */}
      <Dialog 
        open={addResourceOpen} 
        onClose={handleAddResourceClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Add sx={{ color: "#0457a4" }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#0457a4",
                fontSize: "1.2rem",
              }}
            >
              Add New Resource
            </Typography>
          </Box>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Resource created successfully!
              </Alert>
            )}
            
            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Resource Type */}
              <FormControl fullWidth error={!!formErrors.resourceType}>
                <InputLabel sx={{ fontFamily: "Poppins" }}>Resource Type</InputLabel>
                <Select
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  label="Resource Type"
                  sx={{ fontFamily: "Poppins" }}
                >
                  {resourceTypes.map((type) => (
                    <MenuItem 
                      key={type} 
                      value={type}
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.resourceType && (
                  <Typography 
                    variant="caption" 
                    color="error"
                    sx={{ fontFamily: "Poppins", mt: 0.5 }}
                  >
                    {formErrors.resourceType}
                  </Typography>
                )}
              </FormControl>

              {/* Title */}
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.title}
                helperText={formErrors.title}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Author */}
              <TextField
                name="author"
                label="Author"
                value={formData.author}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.author}
                helperText={formErrors.author}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Content */}
              <TextField
                name="content"
                label="Content"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                error={!!formErrors.content}
                helperText={formErrors.content}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Link */}
              <TextField
                name="link"
                label="Resource Link"
                value={formData.link}
                onChange={handleChange}
                fullWidth
                placeholder="https://example.com"
                error={!!formErrors.link}
                helperText={formErrors.link || "Enter the full URL including http:// or https://"}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleAddResourceClose} 
              disabled={loading}
              sx={{ 
                color: "#666",
                fontFamily: "Poppins"
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#0457a4",
                fontFamily: "Poppins",
                "&:hover": {
                  backgroundColor: "#034a94",
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creating...
                </>
              ) : (
                <>
                  <Add sx={{ mr: 1 }} />
                  Create Resource
                </>
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Resource Dialog */}
      <Dialog 
        open={editResourceOpen} 
        onClose={handleEditResourceClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Edit sx={{ color: "#f57c00" }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#f57c00",
                fontSize: "1.2rem",
              }}
            >
              Edit Resource
            </Typography>
          </Box>
        </DialogTitle>
        
        <form onSubmit={handleEditSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            {editSubmitSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Resource updated successfully!
              </Alert>
            )}
            
            {editSubmitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {editSubmitError}
              </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Resource Type */}
              <FormControl fullWidth error={!!editFormErrors.resourceType}>
                <InputLabel sx={{ fontFamily: "Poppins" }}>Resource Type</InputLabel>
                <Select
                  name="resourceType"
                  value={editFormData.resourceType}
                  onChange={handleEditChange}
                  label="Resource Type"
                  sx={{ fontFamily: "Poppins" }}
                >
                  {resourceTypes.map((type) => (
                    <MenuItem 
                      key={type} 
                      value={type}
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {editFormErrors.resourceType && (
                  <Typography 
                    variant="caption" 
                    color="error"
                    sx={{ fontFamily: "Poppins", mt: 0.5 }}
                  >
                    {editFormErrors.resourceType}
                  </Typography>
                )}
              </FormControl>

              {/* Title */}
              <TextField
                name="title"
                label="Title"
                value={editFormData.title}
                onChange={handleEditChange}
                fullWidth
                error={!!editFormErrors.title}
                helperText={editFormErrors.title}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Author */}
              <TextField
                name="author"
                label="Author"
                value={editFormData.author}
                onChange={handleEditChange}
                fullWidth
                error={!!editFormErrors.author}
                helperText={editFormErrors.author}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Content */}
              <TextField
                name="content"
                label="Content"
                value={editFormData.content}
                onChange={handleEditChange}
                fullWidth
                multiline
                rows={4}
                error={!!editFormErrors.content}
                helperText={editFormErrors.content}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />

              {/* Link */}
              <TextField
                name="link"
                label="Resource Link"
                value={editFormData.link}
                onChange={handleEditChange}
                fullWidth
                placeholder="https://example.com"
                error={!!editFormErrors.link}
                helperText={editFormErrors.link || "Enter the full URL including http:// or https://"}
                InputLabelProps={{
                  sx: { fontFamily: "Poppins" }
                }}
                InputProps={{
                  sx: { fontFamily: "Poppins" }
                }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleEditResourceClose} 
              disabled={loading}
              sx={{ 
                color: "#666",
                fontFamily: "Poppins"
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#f57c00",
                fontFamily: "Poppins",
                "&:hover": {
                  backgroundColor: "#e65100",
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Updating...
                </>
              ) : (
                <>
                  <Edit sx={{ mr: 1 }} />
                  Update Resource
                </>
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default Resources;