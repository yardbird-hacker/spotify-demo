import { Box, Typography, styled, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { getSpotifyAuthUrl } from '../../utils/auth';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const Head = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',

  justifyContent: 'space-between',
});

const LibraryHead = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: 'My Playlist' });
    } else {
      getSpotifyAuthUrl();
    }
  };

  const { mutate: createPlaylist } = useCreatePlaylist();

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: '20px' }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  );
};

export default LibraryHead;
