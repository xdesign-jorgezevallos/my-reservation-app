import React from "react";
// import Grid from "@mui/material/Grid";

const styles = {
  root: { backgroundColor: "#3f51b5", color: "#FFF" },
  topRow: { padding: "1rem 0", margin: "0" },
  copyRow: {},
  copyrights: { fontSize: ".8rem", color: "#FFF", padding: "0 0 .4rem 0 " },
};

export const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();
  return (
    <div style={styles.root}>
      {/* <Grid container spacing={3} style={styles.topRow}>
        <Grid item xs={12} md={4}>
          Logo
        </Grid>
        <Grid item xs={12} md={4}>
          list1
        </Grid>
        <Grid item xs={12} md={4}>
          list2
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div style={styles.copyrights}>
            myPage {currentYear} copyrights
          </div>
        </Grid>
      </Grid> */}
    </div>
  );
};
