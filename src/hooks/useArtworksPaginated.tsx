import { useEffect, useRef, useState } from 'react'
import { artworksApi, baseApiUrl, fieldsForSimpleArtwork, limit } from '../api/artworksApi';
import { SimpleArtwork, ArtworkPaginatedResponse, Config } from '../interfaces/artworkInterfaces';

export const useArtworksPaginated = () => {
    const URL = `${baseApiUrl}/artworks?fields=${fieldsForSimpleArtwork}&limit=${limit}`;
    const nextPageUrl = useRef(URL);
    const [simpleArtworksList, setSimpleArtworksList] = useState<SimpleArtwork[]>([]);
    const [apiConfigResp, setApiConfigResp] = useState<Config>();
    const [isLoading, setIsLoading] = useState(true);


    const loadArtworks = async () => {
        try {
            setIsLoading(true);
            const resp = await artworksApi.get<ArtworkPaginatedResponse>(nextPageUrl.current);
            nextPageUrl.current = resp?.data?.pagination?.next_url;
            setSimpleArtworksList([...simpleArtworksList, ...resp?.data?.data]);
            setApiConfigResp(resp?.data?.config);
            setIsLoading(false);
        } catch (error) {
            console.error(`An error ocurred while trying to fetch the artworks data `, error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadArtworks();
    }, []);

    return {
        isLoading,
        loadArtworks,
        simpleArtworksList,
        apiConfigResp,
    }

}