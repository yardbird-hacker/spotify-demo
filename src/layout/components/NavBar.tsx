import { Box, Typography } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

const NavBar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="120px"
      sx={{ mt: 2, mr: 2 }}
    >
      {userProfile ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          {userProfile.images[0] ? (
            <img
              src={userProfile.images[0]?.url}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <NoPhotographyIcon sx={{ fontSize: 100 }} />
          )}
          <Typography mt={1} fontWeight="bold">
            {userProfile.display_name}
          </Typography>
        </Box>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default NavBar;
