import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import useUserStore from "../../../Store/userStore";
import { Box, Typography, Paper, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";

const Users = () => {
    const { users, fetchUsers, updateUserStatus, loading, error } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { name: "username", label: "Username", options: { filter: true, sort: true } },
        { name: "email", label: "Email", options: { filter: true, sort: true } },
        {
            name: "isVerified",
            label: "Verified",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />)
            }
        },
        {
            name: "hasCompletedAssessment",
            label: "Completed Assessment",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />)
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    switch (value) {
                        case "enabled":
                            return <CheckIcon sx={{ color: "green" }} />;
                        case "inactive":
                            return <BlockIcon sx={{ color: "orange" }} />;
                        case "disabled":
                            return <CloseIcon sx={{ color: "red" }} />;
                        default:
                            return <CloseIcon sx={{ color: "gray" }} />;
                    }
                }
            }
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const user = users[tableMeta.rowIndex];

                    let buttonColor = "default";
                    let buttonText = "";

                    switch (user.isDisabled) {
                        case "enabled":
                            buttonColor = "error"; 
                            buttonText = "Disable";
                            break;
                        case "disabled":
                            buttonColor = "success"; 
                            buttonText = "Enable";
                            break;
                        case "inactive":
                            buttonColor = "warning"; 
                            buttonText = "Activate";
                            break;
                        default:
                            buttonColor = "default";
                            buttonText = "Unknown";
                    }

                    return (
                        <Button
                            variant="contained"
                            color={buttonColor}
                            onClick={() => updateUserStatus(user._id, user.isDisabled)}
                        >
                            {buttonText}
                        </Button>
                    );
                }
            }
        }
    ];

    
    const formattedUsers = users.map((user) => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        hasCompletedAssessment: user.hasCompletedAssessment,
        status: user.isDisabled
    }));

    
    const options = {
        filterType: "dropdown",
        responsive: "standard",
        selectableRows: "none",
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 50]
    };

    return (
        <Box sx={{ width: "95%", margin: "20px auto", textAlign: "center" }}>
            {loading && <Typography sx={{ color: "gray" }}>Loading users...</Typography>}
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

            <Paper elevation={5} sx={{ borderRadius: 3 }}>
                <MUIDataTable title="Registered Users" data={formattedUsers} columns={columns} options={options} />
            </Paper>
        </Box>
    );
};

export default Users;
