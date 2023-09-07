import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import './header.component.scss';

export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                fontFamily: 'fantasy',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Microservice Integration Kickstarter
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
