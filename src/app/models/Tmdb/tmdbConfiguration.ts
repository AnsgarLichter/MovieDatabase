export interface TmdbConfiguration{
  images: TmdbImage,
  change_keys: string[]
}

export interface TmdbImage{
  base_url: string,
  secure_base_url: string,
  backdrop_sizes: string[],
  logo_sizes: string[],
  poster_size: string[],
  profile_sizes: string[],
  still_sizes: string[]
}
