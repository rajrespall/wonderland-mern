import React, { useState, useEffect } from "react";
import { 
  Container, Box, Typography, Avatar, Button, Divider, Link, Tabs, Tab, CircularProgress, 
  Modal, TextField, Grid, IconButton
} from "@mui/material";
import { LocationOn, Star, Message, Group, Report, Close, AddAPhoto } from "@mui/icons-material";
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/profileStore";
import AssessmentHistory from "./AssessmentHistory";  // Add this import

function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserProfileCard() {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Get auth data from authStore
  const { user } = useAuthStore();
  
  // Get profile data from profileStore
  const { profile, loading, error, getProfile, updateProfile } = useProfileStore();

  // Fetch profile data when component mounts
  useEffect(() => {
    getProfile().catch(err => console.error("Failed to fetch profile:", err));
  }, [getProfile]);

  // Initialize form data when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phoneNumber: profile.phoneNumber || '',
        address: profile.address || ''
      });
      if (profile.profilePicture) {
        setPreviewUrl(profile.profilePicture);
      }
    }
  }, [profile]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Instead of creating FormData in the component, pass the data separately to updateProfile
      await updateProfile(formData, profileImage);
      handleCloseModal();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
      <Box sx={{ borderRadius: 3, bgcolor: "white", boxShadow: "none" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
              src={profile?.profilePicture} 
              sx={{ width: 70, height: 70 }} 
              alt={profile?.name || user?.username || "User"}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold"
              sx={{
                fontFamily: 'Poppins',
              }}>{profile ? `${profile.firstName} ${profile.lastName}` : "User"}</Typography>
              <Typography variant="body2" color="primary"
              sx={{
                fontFamily: 'Poppins',
              }}>{user?.email || "No email available"}</Typography>
              <Typography variant="body2" color="textSecondary" display="flex" alignItems="center"
              sx={{
                fontFamily: 'Poppins',
              }}>
                <LocationOn fontSize="small" sx={{ mr: 0.5 }} /> {profile?.address || "Location not set"}
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label="MY ABOUT" />
          <Tab label="CHILD DETAILS" />
          <Tab label="SETTINGS" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        <CustomTabPanel value={value} index={0}>
          <Typography variant="h6" fontWeight="bold" sx={{
              fontFamily: 'Poppins',
            }}>Profile Details</Typography>
          <Typography variant="body2"
          sx={{
            fontFamily: 'Poppins',
          }}>{profile?.lastName || "No profile details available."}</Typography>

          <Button 
            variant="contained" 
            startIcon={<Message />}
            onClick={handleOpenModal}
            sx={{
              bgcolor: "#0457a4",
              borderRadius: '25px',
              fontFamily: 'Poppins',
              mt: 2
            }}
          >
            Edit Profile
          </Button>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Typography variant="h6" fontWeight="bold" sx={{
            fontFamily: 'Poppins',
            mb: 2
          }}>Child Details</Typography>
          
          {/* General info section - you can expand this later */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
              View your child's assessment history below. You can see previous assessments and track progress over time.
            </Typography>
          </Box>
          
          {/* Add the AssessmentHistory component */}
          {user && user.id && (
            <AssessmentHistory userId={user.id} />
          )}
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<Message />}
              sx={{
                bgcolor: "#0457a4",
                borderRadius: '25px',
                fontFamily: 'Poppins',
              }}
            >
              Edit Child Details
            </Button>
            
            {/* Add Reassessment Button */}
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#5da802',
                '&:hover': { backgroundColor: '#4c8a00' },
                borderRadius: '25px',
                fontFamily: 'Poppins',
                padding: '6px 16px',
              }}
              onClick={() => window.location.href = '/assessment'}  // Simple navigation
            >
              Start Reassessment
            </Button>
          </Box>
        </CustomTabPanel>
        
        {/* Edit Profile Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="edit-profile-modal"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '500px' },
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              p: 4
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Poppins' }}>
                Edit Profile
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Box position="relative">
                  <Avatar
                    src={previewUrl}
                    sx={{ width: 100, height: 100, mb: 1 }}
                    alt="Profile Picture"
                  />
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-picture-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-picture-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        right: 0,
                        backgroundColor: '#0457a4',
                        color: 'white',
                        '&:hover': { backgroundColor: '#033f7a' }
                      }}
                    >
                      <AddAPhoto fontSize="small" />
                    </IconButton>
                  </label>
                </Box>
                <Typography variant="caption" sx={{ fontFamily: 'Poppins', mt: 1 }}>
                  Click the icon to change profile picture
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mb: 2 }}
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={2}
                sx={{ mb: 3 }}
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              />

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{
                    fontFamily: 'Poppins',
                    borderRadius: '20px',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#0457a4",
                    borderRadius: '20px',
                    fontFamily: 'Poppins',
                    '&:hover': { bgcolor: "#033f7a" }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>
  );
}