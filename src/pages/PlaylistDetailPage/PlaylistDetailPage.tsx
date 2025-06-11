import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import DefaultImage from '../../common/components/DefaultImage';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import useGetPlaylistItems from '../../hooks/useGetPlaylistitems';
import ErrorMessage from '../../common/components/ErrorMessage';
import { loadingMessage } from '../../common/components/message';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { useInView } from 'react-intersection-observer';

const Head = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',

  justifyContent: 'space-between',
});

const PlaylistHeader = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  background: ' linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
  padding: '16px',
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));
const AlbumImage = styled('img')(({ theme }) => ({
  borderRadius: '8px',
  height: 'auto',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  textAlign: 'left',

  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: 'calc(100% - 64px)',
  borderRadius: '8px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { ref, inView } = useInView();

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id });

  const {
    data: PlaylistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 10, offset: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPlaylistLoading) {
    return <div style={{ fontSize: '24px' }}>{loadingMessage}</div>;
  }
  if (playlistError) {
    return <ErrorMessage errorMessage={playlistError.message} />;
  }
  return (
    <StyledTableContainer>
      <div>
        <PlaylistHeader container spacing={7}>
          <ImageGrid item sm={12} md={2}>
            {playlist?.images ? (
              <AlbumImage
                src={playlist?.images[0].url}
                alt="playlist_cover.jpg"
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto',
                  maxHeight: '200px',
                }}
              />
            ) : (
              <DefaultImage>
                <MusicNoteIcon fontSize="large" />
              </DefaultImage>
            )}
          </ImageGrid>
          <Grid item sm={12} md={10}>
            <Box>
              <ResponsiveTypography variant="h1" color="white">
                {playlist?.name}
              </ResponsiveTypography>

              <Box display="flex" alignItems="center">
                <img
                  src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                  width="20px"
                />
                <Typography
                  variant="subtitle1"
                  color="white"
                  ml={1}
                  fontWeight={700}
                >
                  {playlist?.owner?.display_name
                    ? playlist?.owner.display_name
                    : 'unknown'}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  • {playlist?.tracks?.total} songs
                </Typography>
              </Box>
            </Box>
          </Grid>
        </PlaylistHeader>
        {playlist?.tracks?.total === 0 ? (
          <Typography>Search</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Data added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PlaylistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <DesktopPlaylistItem
                      item={item}
                      key={itemIndex}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  );
                })
              )}
              <TableRow sx={{ height: '5px' }} ref={ref} />
              {isFetchingNextPage ? (
                <div style={{ fontSize: '24px' }}>{loadingMessage}</div>
              ) : !hasNextPage ? (
                <div style={{ fontSize: '16px', color: 'lightgreen' }}>
                  No More!!
                </div>
              ) : null}
            </TableBody>
          </Table>
        )}
      </div>
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
