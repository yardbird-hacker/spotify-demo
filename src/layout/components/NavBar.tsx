import { Box } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const NavBar = () => {
  const { userProfile, error } = useGetCurrentUserProfile();
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="65px"
    >
      {userProfile ? (
        //<img src={userProfile.images[0]?.url}></img>
        'Dongju'
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default NavBar;
