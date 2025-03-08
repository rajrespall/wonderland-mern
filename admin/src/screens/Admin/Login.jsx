import { useState } from "react";
import { Box, CssBaseline, Card, CardContent, Typography, Icon, Button, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import useAdminStore from "../../../Store/adminStore"; // Import Zustand Store
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_red.png";
import background from "../../assets/bg_signin.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAdminStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate("/"); // Redirect to Dashboard after login
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundImage: `url(${background})`, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ mt: -5, mb: 2 }}>
          <img src={logo} alt="Wonderland Logo" style={{ width: "300px" }} />
        </Box>
        <Card sx={{ width: "400px", borderRadius: "30px", backgroundColor: "white", textAlign: "center", boxShadow: 4, padding: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mt: 1, color: "#5da802", fontWeight: 750 }}>
              <Icon sx={{ mr: 1 }}>
                <LockIcon sx={{ fontSize: "30px", color: "#0457a4" }} />
              </Icon>
              SIGN IN
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <TextField fullWidth name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} />
              <TextField fullWidth name="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} />
              <Button type="submit" fullWidth sx={{ mt: 4, backgroundColor: "#5da802", borderRadius: "30px", height: "50px", color: "#fcf230" }}>Sign In</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
