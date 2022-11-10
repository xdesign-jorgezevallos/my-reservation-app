import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, TextField, Button, CardContent, Typography, Stack } from "@mui/material";

import { signup } from "../../store/authSlice";
import { RootState } from "../../store";
import "./styles.scss";

const initialNewUserData = {
    email: "",
    password: "",
    rePassword: ""
};

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const [newUserData, setNewUserData] = useState(initialNewUserData);

    const handleLoginForm = (event: any) => {
        setNewUserData({
            ...newUserData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignUp = () => {
        const {email, password, rePassword} = newUserData;
        if(password === rePassword){
            dispatch(signup({ email,password}));
            navigate('/');
        }else{
            alert('Insert same password!')
        }
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className="signup-page">
            <Card sx={{ maxWidth: 450 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                           New Account
                        </Typography>
                        <TextField id="email" name="email" label="Username" variant="outlined" value={newUserData.email} onChange={handleLoginForm} />
                        <TextField id="password" name="password" label="password" variant="outlined" value={newUserData.password} onChange={handleLoginForm} />
                        <TextField id="re-password" name="rePassword" label="confirm password" variant="outlined" value={newUserData.rePassword} onChange={handleLoginForm} />
                        <Button variant="contained" onClick={handleSignUp}>
                            Sign up
                        </Button>
                        <Typography onClick={() => navigate("/signin")} variant="inherit">go back</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};