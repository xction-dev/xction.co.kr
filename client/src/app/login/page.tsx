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

import { useIntentInput, useIntentSubmit } from "library/policy-maker/next";
import intentPolicy from "@core/policy/intent";
import { UserRepository } from "@core/repository/user";
import { useRouter } from "next/navigation";

function Login() {
  const { submit, isValid } = useIntentSubmit({
    policy: intentPolicy.user.login(),
    to: UserRepository.postLogin,
  });

  const {
    set,
    values: { email, password },
  } = useIntentInput({
    policy: intentPolicy.user.login(),
    initialValue: () => ({ email: "", password: "" }),
  });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!isValid) alert("이메일 또는 비밀번호를 확인해주세요");

    submit()
      .then(({ token }) => {
        localStorage.setItem("xctoken", token);
        router.push("/");
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
            value={email.value}
            onChange={(e) => set({ email: e.target.value })}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            margin="normal"
            value={password.value}
            onChange={(e) => set({ password: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={!isValid}
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
