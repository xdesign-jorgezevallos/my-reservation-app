import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, TextField, Button, CardContent, Typography, Stack } from "@mui/material";

import { signin } from "../../store/auth";
import { RootState } from "../../store";
import "./styles.scss";

const initialLoginData = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loginData, setLoginData] = useState(initialLoginData);

  const handleLoginForm = (event: any) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(signin(loginData) as any);
    if (user.userUID && user.userUID.length) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (user.userUID && user.userUID.length) {
      navigate("/");
    }
  }, [user.userUID, navigate]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="login-page">
      <Card sx={{ maxWidth: 450 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" component="div">
              My Restaurant App
            </Typography>
            <TextField id="email" name="email" label="Username" variant="outlined" value={loginData.email} onChange={handleLoginForm} />
            <TextField id="password" name="password" label="password" variant="outlined" value={loginData.password} onChange={handleLoginForm} />
            <Button variant="contained" onClick={handleSubmit}>
              Sign in
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
