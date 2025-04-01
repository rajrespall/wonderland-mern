import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import useUserStore from "../../../Store/userStore";
import {
  Box,
  Typography,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";

const Users = () => {
  const { users, fetchUsers, updateUserStatus, loading, error } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      name: "username",
      label: "Username",
      options: {
        customBodyRender: (value) => value || "Anonymous"
      }
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "isVerified",
      label: "Verified",
      options: {
        customBodyRender: (value) => (
          value ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />
        )
      }
    },
    {
      name: "hasCompletedAssessment",
      label: "Completed Assessment",
      options: {
        customBodyRender: (value) => (
          value ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />
        )
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          switch (value) {
            case "enabled":
              return <CheckIcon sx={{ color: "green" }} />;
            case "disabled":
              return <CloseIcon sx={{ color: "red" }} />;
            case "inactive":
              return <BlockIcon sx={{ color: "orange" }} />;
            default:
              return <CloseIcon sx={{ color: "gray" }} />;
          }
        }
      }
    },
    {
      name: "actions",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const status = user.isDisabled;

          let buttonColor = "default";
          let buttonText = "";

          if (status === "enabled") {
            buttonColor = "error";
            buttonText = "DISABLE";
          } else if (status === "disabled") {
            buttonColor = "success";
            buttonText = "ENABLE";
          } else if (status === "inactive") {
            buttonColor = "warning";
            buttonText = "ACTIVATE";
          }

          return (
            <Tooltip title={`${buttonText} this user`}>
              <Button
                variant="contained"
                color={buttonColor}
                size="small"
                sx={{ fontWeight: 600 }}
                onClick={() => updateUserStatus(user._id, status)}
              >
                {buttonText}
              </Button>
            </Tooltip>
          );
        }
      }
    }
  ];

  const formattedUsers = users.map((user) => ({
    _id: user._id,
    username: user.username || "Anonymous",
    email: user.email,
    isVerified: user.isVerified,
    hasCompletedAssessment: user.hasCompletedAssessment,
    status: user.isDisabled
  }));

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    responsive: "standard",
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", boxShadow: "none" }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          mb: 2,
          color: "#0457a4",
        }}
      >
        Registered Users
      </Typography>

      <MUIDataTable
        data={formattedUsers}
        columns={columns}
        options={options}
      />
    </Paper>
  );
};

export default Users;
