import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import ParentNav from "../../components/ParentNav";
import ProfilePage from "../../components/Parent/Profile";
import Spinner from "../../components/Spinner";
import InstitutionsPage from "../../components/Parent/InstitutionsPage";

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
                    p: 2
                }}
            >
                <ParentNav />
                {loading ? <Spinner /> : <InstitutionsPage />}
            </Box>
        </>
    );
}