export interface UserModel {
  id: number;
  username: string;
  name: string;
  iso_639_1: string; // preferred language
  iso_3166_1: string; // country code
  include_adult: boolean; //allow adult-rated movies
  avatar?: {
    gravatar?: {
      hash: string; //MD5 hash of your Gravatar email, if you use Gravatar.
    };
    tmdb?: {
      avatar_path: string
    };
  };
}
