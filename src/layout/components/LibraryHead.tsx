import { Box, Typography, styled, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

const Head = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',

  justifyContent: 'space-between',
});

const LibraryHead = () => {
  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: '20px' }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button>
        <AddIcon />
      </Button>
    </Head>
  );
};

export default LibraryHead;
