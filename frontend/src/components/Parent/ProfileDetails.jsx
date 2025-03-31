import React, { useState, useEffect } from "react";
import { 
  Container, Box, Typography, Avatar, Button, Divider, Link, Tabs, Tab, CircularProgress, 
  Modal, TextField, Grid, IconButton, Paper
} from "@mui/material";
import { LocationOn, Star, Message, Group, Report, Close, AddAPhoto } from "@mui/icons-material";
import { PictureAsPdf } from '@mui/icons-material';
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/profileStore";
import AssessmentHistory from "./AssessmentHistory";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CombinedReport from "./CombinedReport";
import useInfoStore from "../../store/infoStore";

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
  const [childInfo, setChildInfo] = useState(null);

  const { user } = useAuthStore();
  
  // Get profile data from profileStore
  const { profile, loading, error, getProfile, updateProfile } = useProfileStore();
  const { getGeneralInfo, loading: infoLoading } = useInfoStore();

  // Fetch profile data when component mounts
  useEffect(() => {
    getProfile().catch(err => console.error("Failed to fetch profile:", err));
  }, [getProfile]);

  // Fetch child general information
  useEffect(() => {
    const fetchChildInfo = async () => {
      try {
        const info = await getGeneralInfo();
        setChildInfo(info);
      } catch (err) {
        console.error("Failed to fetch child information:", err);
      }
    };

    if (user && user.id) {
      fetchChildInfo();
    }
  }, [user, getGeneralInfo]);

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
      await updateProfile(formData, profileImage);
      handleCloseModal();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
          <Tab label="MY PROFILE" />
          <Tab label="CHILD DETAILS" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        <CustomTabPanel value={value} index={0}>
          <Typography variant="h6" fontWeight="bold" sx={{
              fontFamily: 'Poppins',
              mb: 3
            }}>Profile Details</Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#0457a4', width: 40, height: 40 }}>
                <Group />
              </Avatar>
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  {profile ? `${profile.firstName} ${profile.lastName}` : "Not provided"}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#5da802', width: 40, height: 40 }}>
                <Message />
              </Avatar>
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  {user?.email || "Not provided"}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#b80201', width: 40, height: 40 }}>
                <Star />
              </Avatar>
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  {profile?.phoneNumber || "Not provided"}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#f4900c', width: 40, height: 40 }}>
                <LocationOn />
              </Avatar>
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  {profile?.address || "Not provided"}
                </Typography>
              </Box>
            </Box>
          </Box>
          
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
          
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4, bgcolor: 'rgba(4, 87, 164, 0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#0457a4', mr: 2 }}>
              </Avatar>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: '#0457a4' }}>
                General Information
              </Typography>
            </Box>
            
            {infoLoading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={30} />
              </Box>
            ) : childInfo ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                    Child's Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500, mb: 1 }}>
                    {childInfo.childName || "Not provided"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                    Age
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500, mb: 1 }}>
                    {calculateAge(childInfo.dateOfBirth)} years
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                    Date of Birth
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500, mb: 1 }}>
                    {formatDate(childInfo.dateOfBirth)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                    Gender
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500, mb: 1 }}>
                    {childInfo.gender || "Not specified"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                    Diagnosis Year
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    {childInfo.diagnosisYear || "Not provided"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: 'text.secondary', py: 2 }}>
                No child information available. Please complete the assessment to add child details.
              </Typography>
            )}
          </Paper>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
              View your child's assessment history below. You can see previous assessments and track progress over time.
            </Typography>
          </Box>
    
          {user && user.id && (
            <AssessmentHistory userId={user.id} />
          )}
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            < CombinedReport />
          </Box>
        </CustomTabPanel>
        
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