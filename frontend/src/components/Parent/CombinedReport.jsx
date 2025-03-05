import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Backdrop } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ProgressCharts from "./ProgressCharts";
import Predictive from "./Predictive";
import usePredictiveStore from "../../store/predictiveStore";

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
            
            // Add title
            pdf.setFontSize(18);
            pdf.setTextColor(4, 87, 164); // #0457a4
            pdf.text("Child Development Report", 105, 20, { align: "center" });
            
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
                
                const imgWidth = 190;
                const imgHeight = (progressCanvas.height * imgWidth) / progressCanvas.width;
                
                pdf.setFontSize(14);
                pdf.text("Game Progress Analytics", 105, 35, { align: "center" });
                pdf.addImage(progressImgData, 'PNG', 10, 40, imgWidth, imgHeight);
                
                // Add a new page for predictive content
                pdf.addPage();
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
                
                const imgWidth = 190;
                const imgHeight = (predictiveCanvas.height * imgWidth) / predictiveCanvas.width;
                
                pdf.setFontSize(14);
                pdf.text("Skills Assessment", 105, 20, { align: "center" });
                pdf.addImage(predictiveImgData, 'PNG', 10, 25, imgWidth, imgHeight);
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