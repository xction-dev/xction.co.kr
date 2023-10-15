"use client"
import { useState } from "react"
import { Container, Typography, TextField, Button, Snackbar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    //const navigate = useNavigate()

    const handleLogin = () => {
        fetch('../api/mock/user/login/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Login failed')
                }
            })
            .then((data) => {
                if (data.success) {
                    //navigate('/')
                    // Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
                    setError("success")
                    setOpenSnackbar(true)
                } else {
                    setError(data.error_message)
                    setOpenSnackbar(true)
                }
            })
            .catch((error) => {
                console.error('error: ', error)
            })


    }

    return (
        <Container className="container" maxWidth="sm">
            <div className="form">
                <Typography variant="h4" component="h2" gutterBottom>
                    Login
                </Typography>
                <form>
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
                <Snackbar  //close after 5 seconds
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnackbar(false)}
                    message={error}
                />
            </div>
        </Container>
    )
}

export default Login;
