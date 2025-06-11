import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  GetPlaylistResponse,
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

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<GetPlaylistResponse> => {
  try {
    const response = await api.get(`/v1/playlists/${params.playlist_id}`, {
      params: params,
    });
    return response.data;
  } catch (error) {}
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(
      `/v1/playlists/${params.playlist_id}/tracks`,
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch playlist items');
  }
};
