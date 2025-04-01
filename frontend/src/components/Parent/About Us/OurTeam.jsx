import React from "react";
import { Grid, Container, Typography, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import popsImage from "../../../assets/OurTeam/MaamPops.jpg";
import rajeshImage from "../../../assets/OurTeam/Rajesh.jpg";
import dianaImage from "../../../assets/OurTeam/Diana.jpg";
import ernestoImage from "../../../assets/OurTeam/Ernesto.jpg";
import jeanImage from "../../../assets/OurTeam/Jean.jpg";

const teamMembers = [
  { 
    name: "Pops Madriaga", 
    role: "Project Adviser",
    image: popsImage,
    github: "https://github.com/popsmadriaga"
  },
  { 
    name: "Rajesh Respall", 
    role: "Developer",
    image: rajeshImage,
    github: "https://github.com/rajrespall"
  },
  { 
    name: "Diana Carreon", 
    role: "Developer",
    image: dianaImage,
    github: "https://github.com/dayaannaa"
  },
  { 
    name: "Ernesto Balignasay", 
    role: "Developer",
    image: ernestoImage,
    github: "https://github.com/ernestogarcia"
  },
  { 
    name: "Jean Etoc", 
    role: "Developer",
    image: jeanImage,
    github: "https://github.com/jeantorres"
  },
];



const TeamSection = () => {
  return (
    <Box sx={{
      background: '#fff',
      minHeight: '100vh',
      pb: 10,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 70%)',
        opacity: 0.7,
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      <Box sx={{ textAlign: 'center', pt: 8, pb: 6 }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ 
              color: "#0457a4", 
              fontFamily: 'Poppins',
              mb: 3,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 3,
                backgroundColor: '#0457a4'
              }
            }}>
            Meet Our Team
          </Typography>
          <Typography variant="body1" maxWidth="md" mx="auto" mb={6} sx={{color: 'black', fontFamily: 'Poppins'}}>
            A dedicated team of developers and researchers working on an innovative system for young children with autism.
          </Typography>
        </Box>
        <Grid 
          container 
          spacing={2} 
          justifyContent="center"
          sx={{ 
            flexWrap: 'nowrap',
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#0457a4',
              borderRadius: 4,
            }
          }}
        >
          {teamMembers.map((member, index) => (
            <Grid item key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    width: 220,  
                    minHeight: 350, 
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      '& img': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 220,  
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(4,87,164,0.8), transparent)',
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#0457a4',
                        mb: 0.5,
                        fontFamily: 'Poppins',
                        fontSize: '1rem'
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        mb: 1.5,
                        fontFamily: 'Poppins',
                        fontWeight: 500
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton 
                        href={member.email}
                        size="small"
                        sx={{ 
                          bgcolor: '#0457a4',
                          color: 'white',
                          '&:hover': { 
                            bgcolor: '#034584',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                      <IconButton 
                        href={member.github}
                        size="small"
                        sx={{ 
                          bgcolor: '#0457a4',
                          color: 'white',
                          '&:hover': { 
                            bgcolor: '#034584',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;