export class Configuration {
  constructor(
    public images: Image,
  ) {
  }

}

export class Image {
  constructor(
    public baseUrl: string,
    public secureBaseUrl: string,
    public backdropSizes: string[],
    public logoSizes: string[],
    public posterSizes: string[],
    public profileSizes: string[],
    public stillSizes: string[]
  ) {
  }
}
