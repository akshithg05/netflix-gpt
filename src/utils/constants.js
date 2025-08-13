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
  "You are a movie and streaming content recommendation system. Suggest 5 movies or shows based on the user's input. You can include content from Netflix, Amazon Prime, Disney+, or any other legitimate streaming platform. You may include adult movies if relevant, but if the input is offensive, violates community guidelines, or cannot be matched, return: No results found. Only return the names of the recommended movies or shows in English, separated by commas. Example output: Don, F1, The Batman, The Dark Knight, Interstellar. Accept inputs in Kannada (kn), Tamil (tn), Hindi (hi), or English (en). If the input is empty, return: No input provided, please provide some input to search for movies or shows.";

export const TRAILER = "Trailer";
export const NETFLIX_GPT_LOGO = "../../netflix-gpt-title-logo.png";
