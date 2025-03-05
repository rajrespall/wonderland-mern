import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Backdrop } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ProgressCharts from "./ProgressCharts";
import Predictive from "./Predictive";
import usePredictiveStore from "../../store/predictiveStore";
import tupLogo from '../../assets/tup.png';
import wonderlandLogo from '../../assets/logo.png';

const CombinedReport = () => {
    const [loading, setLoading] = useState(false);
    const [tempRender, setTempRender] = useState(false);
    
    const {
        fetchLogicalAbilityScore,
        fetchMotorSkillsScore,
        fetchSocialCommunicationScore,
        fetchCreativityScore
    } = usePredictiveStore();

    const exportToPDF = async () => {
        setLoading(true);
        setTempRender(true);

        try {
            // First, ensure all predictive data is loaded
            await Promise.all([
                fetchLogicalAbilityScore(),
                fetchMotorSkillsScore(),
                fetchSocialCommunicationScore(),
                fetchCreativityScore()
            ]);
            
            // Wait for components to render completely
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            
            // **Header Section - Fixed positioning**
            pdf.addImage(tupLogo, "PNG", 15, 10, 15, 15);
            pdf.addImage(wonderlandLogo, "PNG", pageWidth - 30, 10, 15, 15);
            
            // Title and subtitle
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES-TAGUIG", pageWidth / 2, 15, { align: "center" });
            
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text("BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY", pageWidth / 2, 20, { align: "center" });
            
            pdf.setFontSize(8);
            pdf.text("Km. 14 East Service Road, Western Bicutan, Taguig City 1630, Metro Manila, Philippines", pageWidth / 2, 25, { align: "center" });
            
            // Red line separator
            pdf.setDrawColor(150, 0, 0);
            pdf.setLineWidth(1);
            pdf.line(15, 30, pageWidth - 15, 30);
            
            // Report title
            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(4, 87, 164); // #0457a4
            pdf.text("Child Development Report", pageWidth / 2, 40, { align: "center" });
            
            // Capture ProgressCharts
            const progressElement = document.getElementById('progress-charts-container');
            if (progressElement) {
                const progressCanvas = await html2canvas(progressElement, { 
                    scale: 2, 
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff"
                });
                
                const progressImgData = progressCanvas.toDataURL('image/png');
                
                const imgWidth = 180;
                const imgHeight = (progressCanvas.height * imgWidth) / progressCanvas.width;
                
                // Section title
                pdf.setFontSize(14);
                pdf.setTextColor(0, 0, 0);
                pdf.text("Game Progress Analytics", pageWidth / 2, 50, { align: "center" });
                
                // Add chart image
                pdf.addImage(progressImgData, 'PNG', 15, 55, imgWidth, imgHeight);
                
                // Add a new page for predictive content
                pdf.addPage();
                
                // Add header to second page too
                pdf.addImage(tupLogo, "PNG", 15, 10, 15, 15);
                pdf.addImage(wonderlandLogo, "PNG", pageWidth - 30, 10, 15, 15);
                
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text("TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES-TAGUIG", pageWidth / 2, 15, { align: "center" });
                
                pdf.setFontSize(10);
                pdf.setFont("helvetica", "normal");
                pdf.text("BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY", pageWidth / 2, 20, { align: "center" });
                
                pdf.setFontSize(8);
                pdf.text("Km. 14 East Service Road, Western Bicutan, Taguig City 1630, Metro Manila, Philippines", pageWidth / 2, 25, { align: "center" });
                
                pdf.setDrawColor(150, 0, 0);
                pdf.setLineWidth(1);
                pdf.line(15, 30, pageWidth - 15, 30);
            }
            
            // Capture Predictive component
            const predictiveElement = document.getElementById('predictive-container');
            if (predictiveElement) {
                const predictiveCanvas = await html2canvas(predictiveElement, { 
                    scale: 2, 
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff"
                });
                
                const predictiveImgData = predictiveCanvas.toDataURL('image/png');
                
                const imgWidth = 180;
                const imgHeight = (predictiveCanvas.height * imgWidth) / predictiveCanvas.width;
                
                // Section title for second page
                pdf.setFontSize(16);
                pdf.setFont("helvetica", "bold");
                pdf.setTextColor(4, 87, 164); // #0457a4
                pdf.text("Skills Assessment", pageWidth / 2, 40, { align: "center" });
                
                // Add chart image
                pdf.addImage(predictiveImgData, 'PNG', 15, 45, imgWidth, imgHeight);
            }
            
            pdf.save("child_development_report.pdf");
            
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF. Please try again.");
        } finally {
            setTempRender(false);
            setLoading(false);
        }
    };

    return (
        <Box position="relative">
            <Button 
                variant="contained" 
                startIcon={<PictureAsPdf />}
                onClick={exportToPDF}
                disabled={loading}
                sx={{ 
                    bgcolor: '#0457a4',
                    '&:hover': {
                        bgcolor: '#034584',
                    }
                }}
            >
                {loading ? 'Generating PDF...' : 'Export Development Report'}
            </Button>
            
            <Backdrop
                sx={{ color: '#fff', zIndex: 1000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            {tempRender && (
                <Box sx={{ 
                    position: 'fixed',
                    left: '9999px',
                    top: 0,
                    width: '800px',
                    backgroundColor: 'white',
                    padding: '20px',
                    zIndex: -1
                }}>
                    <Box 
                        id="progress-charts-container" 
                        sx={{ 
                            marginBottom: '20px',
                            padding: '20px',
                            backgroundColor: 'white',
                            width: '100%'
                        }}
                    >
                        <ProgressCharts />
                    </Box>
                    
                    <Box 
                        id="predictive-container" 
                        sx={{ 
                            padding: '20px',
                            backgroundColor: 'white',
                            width: '100%'
                        }}
                    >
                        <Predictive />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CombinedReport;