import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import Spinner from "../../../components/Spinner";
import InstitutionsPage from "../../../components/Parent/Institutions/InstitutionsPage";
import NavigationBar from "../../../components/NavigationBar";
import HeroSection from "../../../components/Parent/Institutions/HeroSection";

export default function Institutions() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400  ); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'rgb(4, 87, 164, .1)',
                }}
            >
                <NavigationBar />   
                {loading ? <Spinner /> : <HeroSection />}
                <InstitutionsPage />
            </Box>
        </>
    );
}