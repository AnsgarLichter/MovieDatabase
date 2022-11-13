export interface Configuration{
    images: Image,
    change_keys: String[]
}

export interface Image{
    base_url: String,
    secure_base_url: String,
    backdrop_sizes: String[],
    logo_sizes: String[],
    poster_size: String[],
    profile_sizes: String[],
    still_sizes: String[]
}