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
