import { Typography, styled } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router';
import theme from '../theme';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LibraryHead from './components/LibraryHead';
import EmptyPlaylist from './components/EmptyPlaylist';
import Library from './components/Library';
import NavBar from './components/NavBar';

const Layout = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px',
});

const Sidebar = styled('div')(({ theme }) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
}));

const NavList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const StyledNaviLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNaviLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNaviLink>

            <StyledNaviLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNaviLink>
          </NavList>
        </ContentBox>
        <ContentBox>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <ContentBox>
        <NavBar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
