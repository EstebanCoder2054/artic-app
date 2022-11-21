import { useEffect, useState } from 'react';
import { ArtworkFull } from '../interfaces/artworkInterfaces';
import { artworksApi, baseApiUrl } from '../api/artworksApi';

export const useArtworkFull = (id: string) => {
    const [isloading, setIsloading] = useState(true);
    const [artworkFull, setArtworkFull] = useState<ArtworkFull>({} as ArtworkFull);

    const loadFullArtwork = async () => {
      try {
        const resp = await artworksApi.get<ArtworkFull>(`${baseApiUrl}/artworks/${id}`);
        console.log(resp);
        setArtworkFull(resp?.data);
      } catch (error) {
        console.error(`An error ocurred while trying to fetch an artwork's data `, error);
      } finally {
        setIsloading(false);
      }
    };

    useEffect(() => {
      loadFullArtwork();
    }, []);

  return {
    isloading,
    artworkFull,
  }
}
