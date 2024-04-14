"use client";

import LogInModule from "@/modules/LogIn";

export default function Login() {
  return <LogInModule />;
}

// import { useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Snackbar,
// } from "@mui/material";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

//   const handleLogin = () => {
//     fetch("/api/mock/user/login/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Login failed");
//         }
//       })
//       .then((data) => {
//         if (data.success) {
//           setError("success");
//           setOpenSnackbar(true);
//         } else {
//           switch (data.error_type) {
//             case 2:
//               setError(data.error_fields[0].error_message);
//             default:
//               setError(data.error_message);
//           }
//           setOpenSnackbar(true);
//         }
//       })
//       .catch((error) => {
//         console.error("error: ", error);
//       });
//   };

//   return (
//     <Container className="container" maxWidth="sm">
//       <div className="form">
//         <Typography variant="h4" component="h2" gutterBottom>
//           Login
//         </Typography>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleLogin();
//           }}
//         >
//           <TextField
//             label="Email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             variant="outlined"
//             type="password"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//         </form>
//         <Snackbar //close after 5 seconds
//           open={openSnackbar}
//           autoHideDuration={5000}
//           onClose={() => setOpenSnackbar(false)}
//           message={error}
//         />
//       </div>
//     </Container>
//   );
// }

// export default Login;
