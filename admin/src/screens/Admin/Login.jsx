import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, CssBaseline, Card, CardContent, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import useAdminStore from "../../../Store/adminStore"; // Import Zustand Store
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_red.png";
import background from "../../assets/bg_signin.png";
import { styled } from "@mui/material/styles";
import { useState } from "react";

// ✅ Styled Components for Input Fields & Button
const StyledField = styled(Field)(({ error }) => ({
  width: "90%",
  height: "55px",
  marginBottom: "10px",
  padding: "12px",
  borderRadius: "30px",
  border: `3px solid ${error ? "red" : "#fcf230"}`, // ✅ Turns red when error occurs
  outline: "none",
  fontSize: "18px",
  fontFamily: "Poppins",
  color: "#0457a4",
  backgroundColor: error ? "#ffe6e6" : "white", // ✅ Light red background when error occurs
  "&::placeholder": {
    color: "#0457a4",
    fontWeight: "600",
    textTransform: "capitalize",
  },
}));

const StyledButton = styled(Button)({
  width: "90%",
  height: "55px",
  marginTop: "20px",
  backgroundColor: "#5da802",
  borderRadius: "30px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#fcf230",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#4c9200",
  },
});

const Login = () => {
  const login = useAdminStore((state) => state.login);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false); // ✅ Track login errors

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    const result = await login(values.username, values.password);
  
    if (!result.success) {
      setLoginError(true); // ✅ Show red border & error message
    } else {
      setLoginError(false);
      navigate("/"); // ✅ Redirect only if login is successful
    }
    setSubmitting(false);
  };
  

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ✅ Bigger Wonderland Logo */}
        <Box sx={{ mb: 3 }}>
          <img src={logo} alt="Wonderland Logo" style={{ width: "350px" }} />
        </Box>

        {/* ✅ Bigger Login Card */}
        <Card
          sx={{
            width: "500px",
            borderRadius: "40px",
            backgroundColor: "white",
            textAlign: "center",
            boxShadow: 6,
            padding: "40px 30px",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ color: "#5da802", fontWeight: 750 }}>
              <LockIcon sx={{ fontSize: "35px", color: "#0457a4", marginRight: "8px" }} />
              SIGN IN
            </Typography>

            {/* ✅ Formik Form */}
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  {/* ✅ Username Field with Red Glow on Error */}
                  <StyledField
                    name="username"
                    placeholder="Username"
                    error={loginError || (errors.username && touched.username)}
                  />
                  <ErrorMessage name="username" component="div" style={{ color: "red", fontSize: "14px" }} />

                  {/* ✅ Password Field with Red Glow on Error */}
                  <StyledField
                    name="password"
                    type="password"
                    placeholder="Password"
                    error={loginError || (errors.password && touched.password)}
                  />
                  <ErrorMessage name="password" component="div" style={{ color: "red", fontSize: "14px" }} />

                  {/* ✅ Error message for wrong credentials */}
                  {loginError && (
                    <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
                      ❌ Wrong Username or Password
                    </div>
                  )}

                  {/* ✅ Submit Button */}
                  <StyledButton type="submit" disabled={isSubmitting}>
                    Sign In
                  </StyledButton>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
