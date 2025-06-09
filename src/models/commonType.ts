export default interface ExternalUrls {
  spotify: string;
}

export default interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export default interface Restriction {
  reason?: string;
}
export default interface Followers {
  href: string;
  total: string;
}

export default interface Explicit_content {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export default interface Owner {
  display_name?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}
