import ExternalUrls from './commonType';
import Image from './commonType';
import Restriction from './commonType';
import { Artist } from './artist';
import { ApiResponse } from './apiResponse';

export interface GetNewReleasesResponse {
  albums: {
    data: ApiResponse<SimplyfiedAlbum>;
  };
}

export interface SimplyfiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restriction;
  type: string;
  uri: string;
  artists: Artist[];
}
