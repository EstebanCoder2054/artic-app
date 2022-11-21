import { useRef, useState } from 'react'
import { artworksApi, baseApiUrl, fieldsForSimpleArtwork } from '../api/artworksApi';
import { ArtworkSearch, ArtworkSearchData } from '../interfaces/artworkInterfaces';

export const useArtworkSearch = () => {

    const [artworkList, setArtworkList] = useState<ArtworkSearchData[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const nextPageUrl = useRef(URL);

    const loadResults = async (term: string) => {
        if (!term) return;
        try {
            setIsFetching(true);
            const URL = `${baseApiUrl}/artworks/search?q=${term}&fields=${fieldsForSimpleArtwork}&limit=100`;
            const resp = await artworksApi.get<ArtworkSearch>(URL);
            // @ts-ignore
            nextPageUrl.current = resp?.data?.pagination?.next_url;
            setArtworkList(resp?.data?.data);
        } catch (error) {
            console.error(`An error ocurred while trying to search this term -> ${term}`);
        } finally {
            setIsFetching(false);
        }
    };

    const removeResults = () => {
        try {
            setArtworkList([]);
        } catch (error) {
            console.log(`An error ocurred trying to remove the search results`);
        }
    };

    return {
        isFetching,
        artworkList,
        loadResults,
        removeResults
    }

}
