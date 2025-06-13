import {
  Box,
  ListItemIcon,
  MenuItem,
  Typography,
  styled,
  Menu,
} from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import useUserLogout from '../../hooks/useUserLogout';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: '8px',
  // width: '100%',
});

const ProfileImg = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const NavBar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const logout = useUserLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // null 또는 HTML Element
  const open = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ProfileContainer>
      {userProfile ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <ProfileImg onClick={openMenu}>
            {userProfile.images[0] ? (
              <img
                src={userProfile.images[0]?.url}
                alt="Profile"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <NoPhotographyIcon sx={{ fontSize: 50 }} />
            )}
          </ProfileImg>
          <Typography mt={1} fontWeight="bold">
            {userProfile.display_name}
          </Typography>
          <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
            <MenuItem onClick={logout}>
              <ListItemIcon sx={{ color: 'white' }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <LoginButton />
      )}
    </ProfileContainer>
  );
};

export default NavBar;
