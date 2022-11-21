import axios from "axios";

export const artworksApi = axios.create();

export const baseApiUrl = `https://api.artic.edu/api/v1`;

export const limit = 40;

// This can be sent as an array of strings but the API Docs recommend have it as simple as possible with a string
export const fieldsForSimpleArtwork = `id,title,thumbnail,artist_display,date_display,artwork_type_title,artist_titles,date_start,dimensions,medium_display,image_id,has_not_been_viewed_much`;