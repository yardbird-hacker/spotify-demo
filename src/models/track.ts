import { SimplyfiedAlbum } from './album';
import { ApiResponse } from './apiResponse';
import {
  ExternalUrls,
  Owner,
  Image,
  Followers,
  Restriction,
} from './commonType';

export interface Track {
  album?: SimplyfiedAlbum;
  artists: { name: string }[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_id?: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls?: ExternalUrls;
  href?: string;

  id: string;
  is_playable?: boolean;
  linked_from?: Track;

  name?: string;
  popularity?: number;
  track_number?: number;
  preview_url: string | null;

  type?: 'track';
  uri?: string;
  is_local?: boolean;
  restrictions?: Restriction;
}

export interface Episode {
  id: string;
  name: string;
  description: string;
  duration_ms: number;
  release_date: string;
  explicit: boolean;
  images: { url: string; height?: number; width?: number }[];
  external_urls: { spotify: string };
  audio_preview_url: string | null;
  type: 'episode';
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, 'show'>;

export interface Show {
  id: string;
  name: string;
  description: string;
  publisher: string;
  languages: string[];
  media_type: string;
  total_episodes: number;
  explicit: boolean;
  images: Image[];
  external_urls: ExternalUrls;
  type: 'show';
  uri: string;
  is_externally_hosted: boolean;
  href: string;
  html_description: string;
}

export interface SimplifiedAudioBook {
  authors: {
    name: string;
  }[];
  available_markets: string[];
  copyright_holder: string;
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrator: string;
  publisher: string;
  release_date: string;
  total_chapters: number;
  type: 'audiobook';
  uri: string;
}
