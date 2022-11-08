import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signout } from "../../../store/auth";

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "#FFF",
  },
  link: {
    textDecoration: "none",
    color: "#FFF",
    fontSize: 14,
  },
};

const NavBarMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout() as any);
    navigate("/signin");
  };

  return (
    <div style={styles.root}>
      <AppBar position="static" data-testid="navbar-menu">
        <Toolbar>
          <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.title}>
            <Link to="/home" style={styles.link}>
              Home
            </Link>
          </Typography>
          <Typography>
            <Link to="/reservations" style={styles.link}>
              Reservations
            </Link>
          </Typography>
          {/* <Typography variant="h6" className={classes.title}>
            <Link to="/about" className={classes.link}>
              About
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/menu" className={classes.link}>
              Menu/Carta
            </Link>
          </Typography> */}
          <Button color="inherit" onClick={handleSignout}>
            sign out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarMenu;
