"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import "./Login.css";
import { UserApi } from "@core/api/user";
import { UserDto } from "@core/dto/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleLogin = () => {
    fetch("http://localhost:8080/users/login", {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) alert(`로그인 되었습니다`);
        else alert(`로그인 실패`);
      })
      .catch((e) => {
        setError(e.message);
        setOpenSnackbar(true);
      });
  };

  return (
    <Container className="container" maxWidth="sm">
      <div className="form">
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <Snackbar //close after 5 seconds
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          message={error}
        />
      </div>
    </Container>
  );
}

export default Login;
