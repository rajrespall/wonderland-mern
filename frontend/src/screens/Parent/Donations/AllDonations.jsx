import {React, useState, useEffect} from 'react'
import { CssBaseline, Box } from '@mui/material'
import ParentNav from '../../../components/ParentNav'
import Spinner from '../../../components/Spinner'
import MyDonations from '../../../components/Donations/MyDonations'

const AllDonations = () => {

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
                {loading ? <Spinner /> : <MyDonations />}
            </Box>
        </>
  )
}

export default AllDonations