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
import { useView } from "library/policy-maker-2/react";
import { VPMe } from "@core/policy/user/view/me";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const { view } = useView({
    policy: VPMe(),
    from: () => UserApi.getMe.client({}).catch(() => null),
  });

  const handleLogin = () => {
    UserApi.postSignIn
      .client({ body: { email, password } })
      .then((data) => {
        localStorage.setItem("xctoken", data.token);
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
