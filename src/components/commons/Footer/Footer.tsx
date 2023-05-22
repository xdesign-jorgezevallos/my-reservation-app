import React from 'react';
import { Grid } from '@mui/material';

const styles = {
  root: { backgroundColor: '#1976d2', color: '#FFF', width: '100%', margin: 0 },
  topRow: { padding: '1rem 0', margin: '0' },
  copyRow: {},
  copyrights: { fontSize: '.8rem', color: '#FFF', padding: '0 0 .4rem 0 ' },
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div style={styles.root}>
      <Grid container style={styles.topRow}>
        <Grid item xs={12} md={4} padding={5}>
          Logo
        </Grid>
        <Grid item xs={12} md={4} padding={5}>
          list1
        </Grid>
        <Grid item xs={12} md={4} padding={5}>
          list2
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div style={styles.copyrights}>myPage {currentYear} copyrights</div>
        </Grid>
      </Grid>
    </div>
  );
};
