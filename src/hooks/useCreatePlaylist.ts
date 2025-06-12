import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetCurrentUserProfile from './useGetCurrentUserProfile';
import { CreatePlaylistRequest } from '../models/playlist';
import { createPlaylist } from '../apis/playlistApi';

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePlaylistRequest) => {
      const { data: user } = useGetCurrentUserProfile();

      if (user && user.id) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error('User dis not defined'));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
    },
  });
};

export default useCreatePlaylist;
