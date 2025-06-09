import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from '../models/playlist';
import api from '../utils/api';

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    console.log(`hit ${limit}, ${offset}`);
    const response = await api.get(`/v1/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error('failed to fetch current user playlists');
  }
};
