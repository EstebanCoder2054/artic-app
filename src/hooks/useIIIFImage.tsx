import { useArtworksPaginated } from "./useArtworksPaginated";

export const useIIIFImage = () => {

  const getImage = (iiif_url: string, image_id: string, size: number = 200) => {
    // The API Docs (https://api.artic.edu/docs/#iiif-image-api) recommend not to hardcode the endpoint because it may change, it's better to have it dinamically
    // Here we call the  IIIF Image API 2.0 to get the image Url
    // 200 is the lowest image size so it's ideal here to show a thumbnail: smaller image -> more performance
    if (!image_id || !iiif_url) return;
    const URL = `${iiif_url}/${image_id}/full/${size},/0/default.jpg`;
    if (!URL) return;
    return URL;
  };

  return {
    getImage,
  };
};
