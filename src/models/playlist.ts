import { SimplyfiedAlbum } from './album';
import { ApiResponse } from './apiResponse';
import {
  ExternalUrls,
  Owner,
  Image,
  Followers,
  Restriction,
} from './commonType';

import { Track, Episode } from './track';

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse =
  ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href: string;
  id: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: 'playlist';
  uri?: string;
}

export interface SimplifiedPlaylistObject extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  traks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additionalTypes?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at: string;
  added_by?: {
    external_urls?: string;
    href: string;
    id: string;
    type: string;
    uri: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}
