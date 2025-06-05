import { Box } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';

const NavBar = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="65px"
    >
      <LoginButton />
    </Box>
  );
};

export default NavBar;
