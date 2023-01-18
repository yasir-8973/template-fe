import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import { theme }  from './muiStyles';

export default function SignInSide() {
    const history = useHistory();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = () => {
        if (userName == "yaseer" || password == "0000") {
            history.push("/dashboard");
        }
    };

    return (
        <Grid  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:"30%", bgcolor:theme.palette.card.color1,
            margin:"5rem auto",border:`1px solid ${theme.palette.light.main}`, padding: '3%', borderRadius: "10px" }}>
                <Avatar sx={{ m: 1, bgcolor: 'card.color2' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{color:theme.palette.light.main}} >
                    Login
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal"  color='light' fullWidth id="email" label="Username" focused
                        value={userName} onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <TextField margin="normal"  fullWidth id="password" label="Password " color='light' type="password" 
                    focused value={password} onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button type="button" fullWidth variant="outlined" color='light' sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >Login</Button>
                </Box>
        </Grid>
    );
}