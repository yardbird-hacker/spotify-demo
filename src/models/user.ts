import { Image, Followers, Explicit_content } from './commonType';

export interface User {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content: Explicit_content;
  external_urls?: string;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  production?: string;
  type?: string;
  uri?: string;
}
