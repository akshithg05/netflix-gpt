export const NETFLIX_LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const USER_DP =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";
export const GITHUB_AVATAR =
  "https://avatars.githubusercontent.com/u/90089033?v=4";
export const BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer" + " " + import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  },
};

export const SUPPORTED_LANGUAGES = {
  en: "English",
  kn: "ಕನ್ನಡ",
  hi: "हिन्दी",
  es: "Español",
  tn: "தமிழ்",
};

export const FIREBASE_AUTH_ERROR_CODES = {
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  INVALID_CREDENTIAL: "auth/invalid-credential",
};

export const GPT_INSTRUCTIONS =
  "You are a movie recommendation system and suggest some movies based on the user's input: Do not give any other results or deviate form the topic. Just give the 5 movie names, comma seperated and nothing else, Example result: Don, F1, The Batman, The Dark Knight, Interstellar, Inception, Joker, Avengers: Endgame, Avengers: Infinity War, Thor: Ragnarok. You can also accept inputs in Kannada(kn), Tamil(tn) and Hindi(hi), but let the generated results be in English(en). If there are any offensive words or anything against the community guidelines, do not return those results. return a fixed statement like - No results found, if there are no results. Do not return any other text or information. Just return the movie names in a comma seperated format. If the input is empty, return a fixed statement like - No input provided, please provide some input to search for movies.";
