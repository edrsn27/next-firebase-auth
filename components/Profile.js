import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import { useAuth } from "./../context/AuthContext";
import { useRouter } from "next/router";
const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const { signOutUser, currentUser, changePassword, changeEmail } = useAuth();
  const [email, setEmail] = useState(currentUser && currentUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const updateProfile = async () => {
    setLoading(true);
    let promises = [];
    if (email != currentUser.email) promises.push(changeEmail(email));
    if (password == confirmPassword) promises.push(changePassword(password));

    Promise.all(promises)
      .then(() => {
        setSuccessMessage("Account updated!");
      })
      .catch((e) => setErrorMessage("Failed to update account!"))
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = (event) => {
    event.preventDefault();
    signOutUser();
    router.push("/auth/sign-in");
  };
  if (currentUser)
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile - {currentUser.email}
            </Typography>
            <Box component="form" noValidate onSubmit={logout} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                  )}
                  {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={updateProfile}
                disabled={loading}
              >
                Update Profile
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="warning"
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}
