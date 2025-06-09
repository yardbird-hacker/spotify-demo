import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from '../models/playlist';
import { User } from '../models/user';
import { getCurrentUserPlaylists } from '../apis/playlistApi';

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): UseInfiniteQueryResult<
  InfiniteData<GetCurrentUserPlaylistResponse, Error>,
  Error
> => {
  return useInfiniteQuery({
    queryKey: ['current-user-playlists'],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
