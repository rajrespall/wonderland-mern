import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, CssBaseline, Card, CardContent, Typography, Icon, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import useAdminStore from "../../../Store/adminStore"; // Import Zustand Store
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_red.png";
import background from "../../assets/bg_signin.png";

const Login = () => {
  const login = useAdminStore((state) => state.login);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    await login(values.username, values.password);
    navigate("/"); // Redirect to Dashboard after login
    setSubmitting(false);
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
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="username" placeholder="Username" />
                  <ErrorMessage name="username" component="div" style={{ color: "red" }} />

                  <Field name="password" type="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" style={{ color: "red" }} />

                  <Button type="submit" fullWidth disabled={isSubmitting} sx={{ mt: 4, backgroundColor: "#5da802", borderRadius: "30px", height: "50px", color: "#fcf230" }}>
                    Sign In
                  </Button>
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
