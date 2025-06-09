import { styled } from '@mui/material';
import ErrorMessage from '../../common/components/ErrorMessage';
import { loadingMessage } from '../../common/components/message';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import EmptyPlaylist from './EmptyPlaylist';
import Playlist from './Playlist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const PlaylistContainer = styled('div')(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 240px)',
  height: '100%',
  '&::-webkit-scrollbar': {
    display: 'none',
    msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'none', // Firefox
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: 'calc(100vh - 65px - 119px)',
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) return <EmptyPlaylist />;

  if (isLoading) {
    return <div style={{ fontSize: '24px' }}>{loadingMessage}</div>;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist key={index} playlists={page.items} />
          ))}
          <div ref={ref}>
            {isFetchingNextPage ? (
              <div style={{ fontSize: '24px' }}>{loadingMessage}</div>
            ) : null}
          </div>
        </PlaylistContainer>
      }
    </div>
  );
};

export default Library;
