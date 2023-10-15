"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Register.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    //const navigate = useNavigate()

    const handleJoin = () => {
        fetch('../api/mock/user/register/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Register fail');
                }
            })
            .then((data) => {
                if (data.success) {
                    //navigate('/login');
                }
            })
            .catch((error) => {
                setError(error.message);
                setOpenSnackbar(true);
                console.error('error is :', error);
            })
    }
    return (
        <Container className="container" maxWidth="sm">
            <div className="form">
                <Typography variant="h4" component="h2" gutterBottom>
                    Register
                </Typography>
                <form>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleJoin}
                    >
                        Register
                    </Button>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={() => setOpenSnackbar(false)}
                        message={error}
                    />
                </form>
            </div>
        </Container>
    );
}

export default Register;
