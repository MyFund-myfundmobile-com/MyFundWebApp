import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { notificationsOutline } from 'ionicons/icons'; // Import the notification icon from Ionicons

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="textPrimary" align="center" sx={{ flexGrow: 1, letterSpacing: '0.5rem', fontWeight: 'bold' }}>
          SAVE   .   BUY PROPERTIES  .  EARN RENT
        </Typography>
        <ion-icon icon={notificationsOutline} className="text-gray-500 text-2xl"></ion-icon>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
