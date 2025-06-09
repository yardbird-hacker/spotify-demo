import { ApiResponse } from './apiResponse';
import { ExternalUrls, Owner } from './commonType';

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse =
  ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}
